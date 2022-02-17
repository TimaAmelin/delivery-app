import React, { useContext, useState } from 'react';
import { screenContext } from '../context/screen/screenContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { db } from '../firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import crc32 from 'crc-32';

export const ChangeScreen = () => {
    let { setScreen, setError, userKey } = useContext(screenContext);

    const [ password, setPassword ] = useState('');

    const updatePassword = async (key, password) => {
        await updateDoc(doc(db, 'users', key), { password: String(-1 * crc32.str(password)) });
    };

    return (
        <div className="shadow">
            <div className="change-password">
                <div>
                    <h1 className="login-title">Смена пароля</h1>
                </div>
                <div>
                    <Form.Control type="password" className="login-password" placeholder="Новый пароль" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div>
                    <Button variant="dark" onClick={() => {
                        if (password.length >= 5) {
                            updatePassword(userKey, password);
                            setScreen('dots');
                            setError('');
                        } else {
                            setError('Пароль должен содержать минимум пять символов');
                        };
                    }} className="login-button">Сохранить</Button>
                </div>
                <div>
                    <Button variant="danger" onClick={() => {
                        setScreen('dots');
                        setError('');
                    }} className="close-edit-button">X</Button>
                </div>
            </div>
        </div>
    );
};