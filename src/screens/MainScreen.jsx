import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { screenContext } from '../context/screen/screenContext.js';
import { Header } from '../components/Header.jsx';
import { LeftHalf } from '../components/LeftHalf.jsx';
import { RightHalf } from '../components/RightHalf.jsx';
import { Login } from '../components/Login.jsx';
import { Edit } from '../components/Edit.jsx';
import { Add } from '../components/Add.jsx';
import { Settings } from '../components/Settings.jsx';
import { Error } from '../components/Error.jsx';
import { Footer } from '../components/Footer.jsx';
import { ChangeScreen } from '../components/ChangeScreen.jsx';
import { dotsContext } from '../context/dots/dotsContext.js';
import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';

export const MainScreen = () => {
    let { setDots } = useContext(dotsContext);
    let { screen, settings, error } = useContext(screenContext);

    const [changeTime, setChangeTime] = useState('Wed Dec 22 2021 12:50:07 GMT+0300 (Москва, стандартное время)');

    const ordersCollectionRef = collection(db, 'orders');
    const changeCollectionRef = collection(db, 'ChangeTime');
    
    const getOrders = async () => {
        const date = await getDocs(changeCollectionRef).then(data => {
            if (data.docs[0]._document.data.value.mapValue.fields.date.stringValue != changeTime) {
                getDocs(ordersCollectionRef).then(data => {
                    setDots(data.docs.map(el => ({
                        id: el._document.data.value.mapValue.fields.id.stringValue,
                        adress: el._document.data.value.mapValue.fields.adress.stringValue,
                        name: el._document.data.value.mapValue.fields.name.stringValue,
                        date: el._document.data.value.mapValue.fields.date.stringValue,
                        coords: { 
                            lat: el._document.data.value.mapValue.fields.coords.arrayValue.values[0].doubleValue,
                            lng: el._document.data.value.mapValue.fields.coords.arrayValue.values[1].doubleValue,
                        },
                        time: el._document.data.value.mapValue.fields.time.stringValue,
                        comment: el._document.data.value.mapValue.fields.comment.stringValue,
                        manual: el._document.data.value.mapValue.fields.manual.stringValue,
                        key: el._document.key.path.segments[6]
                    })));
                });
                setChangeTime(time => data.docs[0]._document.data.value.mapValue.fields.date.stringValue);
                return changeTime;
            };
        });
    };
    const [started, setStarted] = useState(true);
  
    useEffect(() => {
      let intervalID;
      if (started) {
        intervalID = setInterval(() => {
          getOrders(changeTime, setChangeTime);
        }, 120000);
      } else {
        clearInterval(intervalID);
      }
      return () => clearInterval(intervalID);
    }, [started, changeTime]);

    return (
        <div>
            <Header />
            <div>
                <LeftHalf />
                <RightHalf />
            </div>
            <Footer />
            {
                screen === 'login' ? <Login /> : screen === 'edit' ? <Edit /> : screen === 'add' ? <Add /> : screen === 'changePassword' ? <ChangeScreen /> : null
            }
            {
                settings === true ? <Settings /> : null
            }
            {
                error !== '' ? <Error text={error} /> : null
            }
        </div>
    );
};