import React, { useContext } from 'react';
import Scrollbar from 'react-scrollbars-custom';
import { dotsContext } from '../context/dots/dotsContext';
import { screenContext } from '../context/screen/screenContext';
import { Dot } from './Dot.jsx';
import { Loader } from './Loader';

export const LeftHalf = () => {
    let { dots, filterFunc, loading } = useContext(dotsContext);
    let { screen } = useContext(screenContext);

    const sortFunction = (prev, next) => Date.parse(prev.date) === Date.parse(next.date) ? prev.name > next.name : Date.parse(prev.date) - Date.parse(next.date);

    return (
        <div className="left">
            <div className="dot-scrollbar">
                <Scrollbar>
                    {
                        screen !== 'login' ? loading === false ? dots.length ? filterFunc(dots.sort(sortFunction)).map(dot => <Dot key={dot.key.toString()} title={dot.adress} date={dot.date} id={dot.id} name={dot.name} coords={dot.coords} dotKey={dot.key} time={dot.time} manual={dot.manual} />) : 
                        <h1>Здесь ничего нет, воспользуйся кнопкой снизу</h1> : <Loader /> : null
                    }
                </Scrollbar>
            </div>
        </div>
    );
};