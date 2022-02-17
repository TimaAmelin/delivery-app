import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { screenContext } from '../context/screen/screenContext';

export const Footer = () => {
    let { setScreen, setDot } = useContext(screenContext);

    return (
        <div className="bottom-menu">
            <div className="bottom-menu-button">
                <Button variant="dark" className="bottom-menu-btn1" onClick={() => {
                    setScreen('add');
                    setDot('-1');
                }}>Добавить доставку</Button>
                <Button variant="warning" className="bottom-menu-btn2" onClick={() => {
                    setScreen('changePassword');
                }}>Сменить пароль</Button>
            </div>
        </div>
    );
};