import React, { useContext, useState } from 'react';
import { dotsContext } from '../context/dots/dotsContext';
import { screenContext } from '../context/screen/screenContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { db } from '../firebase/firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import crc32 from 'crc-32';

export const Login = () => {
    let { setDots, showLoader } = useContext(dotsContext);
    let { setScreen, setError, setUserKey, userKey } = useContext(screenContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const ordersCollectionRef = collection(db, 'orders');

    const usersCollectionRef = collection(db, 'users');

    const deleteOrder = async (key) => {
        await deleteDoc(doc(db, 'orders', key));
    };

    const checkPassword = async () => {
        let okay = false;
        const hash = await getDocs(usersCollectionRef).then(data => data.docs.map(el => ({
            email: el._document.data.value.mapValue.fields.login.stringValue,
            password: el._document.data.value.mapValue.fields.password.stringValue,
            key: el._document.key.path.segments[6]
        }))).then(hash => hash.map(el => {
            if (el.email === email && el.password === String(-1 * crc32.str(password))) {
                showLoader();
                getOrders();
                setScreen('dots');
                setUserKey(el.key);
                okay = true;
            };
        })).then(() => okay ? setError('') : setError('Проверьте правильность написание логина и пароля'));
    };
    
    const getOrders = async () => {
        const data = await getDocs(ordersCollectionRef).then(data => {
            const dots = data.docs.map(el => ({
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
            }));
            const filteredDots = dots.filter(el => {
                const now = new Date();
                const date = new Date(el.date);
                if (Math.floor(Date.parse(date) / 1000 / 60 / 60 / 24) - Math.floor((Date.parse(now) / 1000 / 60 / 60 + 3) / 24) >= 0 || date.getFullYear() === 1899) {
                    return true;
                } else {
                    deleteOrder(el.key);
                    return false;
                }
            }) 
            
            setDots(filteredDots);
        });
    };

    return (
        <div className="shadow">
            <div className="login">
                <div>
                    <h1 className="login-title">Вход</h1>
                </div>
                <div>
                    <Form.Control type="email" className="login-email shadowed" placeholder="Адрес электронной почты" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <Form.Control type="password" className="login-password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div>
                    <Button variant="dark" onClick={() => {
                        checkPassword('sdfssdf')
                    }} className="login-button">Войти</Button>
                </div>
            </div>
        </div>
    );
};