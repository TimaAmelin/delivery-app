import React, { useContext, useState } from 'react';
import { dotsContext } from '../context/dots/dotsContext';
import { screenContext } from '../context/screen/screenContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { db } from '../firebase/firebase';
import { doc, updateDoc, deleteDoc, collection } from 'firebase/firestore';

export const Edit = () => {
    let { dots, editDot, deleteDot, showLoader } = useContext(dotsContext);
    let { setScreen, editDotKey, setError, setDot, suggestions, setSuggestions } = useContext(screenContext);

    const updateOrder = async (key, dot) => {
        await updateDoc(doc(db, 'orders', key), dot);
    };

    const deleteOrder = async (key) => {
        await deleteDoc(doc(db, 'orders', key));
    };

    const updateChangeTime = async (time) => {
        await updateDoc(doc(db, 'ChangeTime', '1'), time);
    };

    const ordersCollectionRef = collection(db, 'orders');

    const editingDot = dots.find(dot => dot.key === editDotKey);

    const [ adress, setAdress ] = useState(editingDot.adress);
    const [ comment, setComment ] = useState(editingDot.comment);
    const deliveryDate = new Date(editingDot.date);
    const day = deliveryDate.getDate() < 10 ? '0' + deliveryDate.getDate() : deliveryDate.getDate();
    const month = deliveryDate.getMonth() + 1 < 10 ? '0' + (deliveryDate.getMonth() + 1) : deliveryDate.getMonth() + 1;
    const [ date, setDate ] = useState(deliveryDate.getFullYear() === 1899 ? '' : deliveryDate.getFullYear() + '-' + month + '-' + day);
    const [ name, setName ] = useState(editingDot.name);
    const [ id, setId ] = useState(editingDot.id);
    const [ time, setTime ] = useState(editingDot.time);
    const [ lng, setLng ] = useState(editingDot.coords.lng);
    const [ lat, setLat ] = useState(editingDot.coords.lat);

    const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
    const token = "a34c95fdfa89494cbda4e19fc075ea432d1b90aa";

    return (
        <div className="shadow" onClick={() => setSuggestions(['', '', '', '', '', '', '', '', '', ''])}>
            <div className="edit">
                <div>
                    <h1 className="edit-title">Редактирование</h1>
                </div>
                <div>
                    <Form.Control type="text" className="edit-field" placeholder="Номер заказа" value={id} onChange={e => setId(e.target.value)} />
                    <Form.Control type="text" className="edit-field-last" placeholder="Имя покупателя" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <Form.Control type="text" className="edit-field" placeholder="Адрес доставки" value={adress} onChange={e => {
                        setAdress(e.target.value)
                        let options = {
                            method: "POST",
                            mode: "cors",
                            headers: {
                                "Content-Type": "application/json",
                                "Accept": "application/json",
                                "Authorization": "Token " + token
                            },
                            body: JSON.stringify({query: e.target.value})
                        }

                        fetch(url, options)
                        .then(response => response.text())
                        .then(result => {
                            let sugs = [];
                            sugs.push(eval(result.slice(result.indexOf('"value"') + 8, result.indexOf('"unrestricted_value"') - 1)));
                            result = result.slice(result.indexOf('"unrestricted_value"') + 20);
                            sugs.push(eval(result.slice(result.indexOf('"value"') + 8, result.indexOf('"unrestricted_value"') - 1)));
                            result = result.slice(result.indexOf('"unrestricted_value"') + 20);
                            sugs.push(eval(result.slice(result.indexOf('"value"') + 8, result.indexOf('"unrestricted_value"') - 1)));
                            result = result.slice(result.indexOf('"unrestricted_value"') + 20);
                            sugs.push(eval(result.slice(result.indexOf('"value"') + 8, result.indexOf('"unrestricted_value"') - 1)));
                            result = result.slice(result.indexOf('"unrestricted_value"') + 20);
                            sugs.push(eval(result.slice(result.indexOf('"value"') + 8, result.indexOf('"unrestricted_value"') - 1)));
                            result = result.slice(result.indexOf('"unrestricted_value"') + 20);
                            sugs.push(eval(result.slice(result.indexOf('"value"') + 8, result.indexOf('"unrestricted_value"') - 1)));
                            result = result.slice(result.indexOf('"unrestricted_value"') + 20);
                            sugs.push(eval(result.slice(result.indexOf('"value"') + 8, result.indexOf('"unrestricted_value"') - 1)));
                            result = result.slice(result.indexOf('"unrestricted_value"') + 20);
                            sugs.push(eval(result.slice(result.indexOf('"value"') + 8, result.indexOf('"unrestricted_value"') - 1)));
                            result = result.slice(result.indexOf('"unrestricted_value"') + 20);
                            sugs.push(eval(result.slice(result.indexOf('"value"') + 8, result.indexOf('"unrestricted_value"') - 1)));
                            result = result.slice(result.indexOf('"unrestricted_value"') + 20);
                            sugs.push(eval(result.slice(result.indexOf('"value"') + 8, result.indexOf('"unrestricted_value"') - 1)));

                            setSuggestions(sugs);
                        })
                        .catch(error => setSuggestions(['', '', '', '', '', '', '', '', '', '']));
                    }} 
                    onClick={() => {
                        let options = {
                            method: "POST",
                            mode: "cors",
                            headers: {
                                "Content-Type": "application/json",
                                "Accept": "application/json",
                                "Authorization": "Token " + token
                            },
                            body: JSON.stringify({query: adress})
                        }

                        fetch(url, options)
                        .then(response => response.text())
                        .then(result => {
                            let sugs = [];
                            sugs.push(eval(result.slice(result.indexOf('"value"') + 8, result.indexOf('"unrestricted_value"') - 1)));
                            result = result.slice(result.indexOf('"unrestricted_value"') + 20);
                            sugs.push(eval(result.slice(result.indexOf('"value"') + 8, result.indexOf('"unrestricted_value"') - 1)));
                            result = result.slice(result.indexOf('"unrestricted_value"') + 20);
                            sugs.push(eval(result.slice(result.indexOf('"value"') + 8, result.indexOf('"unrestricted_value"') - 1)));
                            result = result.slice(result.indexOf('"unrestricted_value"') + 20);
                            sugs.push(eval(result.slice(result.indexOf('"value"') + 8, result.indexOf('"unrestricted_value"') - 1)));
                            result = result.slice(result.indexOf('"unrestricted_value"') + 20);
                            sugs.push(eval(result.slice(result.indexOf('"value"') + 8, result.indexOf('"unrestricted_value"') - 1)));
                            result = result.slice(result.indexOf('"unrestricted_value"') + 20);
                            sugs.push(eval(result.slice(result.indexOf('"value"') + 8, result.indexOf('"unrestricted_value"') - 1)));
                            result = result.slice(result.indexOf('"unrestricted_value"') + 20);
                            sugs.push(eval(result.slice(result.indexOf('"value"') + 8, result.indexOf('"unrestricted_value"') - 1)));
                            result = result.slice(result.indexOf('"unrestricted_value"') + 20);
                            sugs.push(eval(result.slice(result.indexOf('"value"') + 8, result.indexOf('"unrestricted_value"') - 1)));
                            result = result.slice(result.indexOf('"unrestricted_value"') + 20);
                            sugs.push(eval(result.slice(result.indexOf('"value"') + 8, result.indexOf('"unrestricted_value"') - 1)));
                            result = result.slice(result.indexOf('"unrestricted_value"') + 20);
                            sugs.push(eval(result.slice(result.indexOf('"value"') + 8, result.indexOf('"unrestricted_value"') - 1)));

                            setSuggestions(sugs);
                        })
                        .catch(error => setSuggestions(['', '', '', '', '', '', '', '', '', '']));
                    }} />
                    {
                        suggestions[0] !== '' ? (
                            <div className="suggestions">
                                {suggestions.map(suggestion => (
                                    <p className="suggestion" onClick={() => setAdress(suggestion)}>{suggestion}</p>
                                ))}
                            </div>
                        ) : null
                    }
                    <Form.Control type="text" className="edit-field-last" placeholder="Комментарий" value={comment} onChange={e => setComment(e.target.value)} />
                </div>
                <div>
                    <Form.Control type="date" className="edit-field" placeholder="Дата доставки" value={date} onChange={e => setDate(e.target.value)} />
                    <Form.Control type="text" className="edit-field-last" placeholder="Время доставки" value={time} onChange={e => setTime(e.target.value)} />
                </div>
                <div>
                    <Form.Control type="text" className="edit-field" placeholder="Широта" value={lat} onChange={e => setLat(e.target.value)} />
                    <Form.Control type="text" className="edit-field-last" placeholder="Долгота" value={lng} onChange={e => setLng(editingDot.coords.lng)} />
                </div>
                <div>
                    <Button variant="dark" onClick={() => {
                        if (lat !== editingDot.lat || lng !== editingDot.lng) {
                            if (id && adress) {
                                const newDate = new Date(date.slice(0, 4), Number(date.slice(5, 7)) - 1, date.slice(8, 10), time.slice(0, 2), time.slice(3, 5), 0, 0);
                                const editedDot = {
                                    id,
                                    adress,
                                    coords: {lat, lng},
                                    date: newDate.toString(),
                                    name,
                                    comment,
                                    time,
                                    key: editingDot.key
                                };
                                setDot(editingDot.key);
                                editDot(editedDot, editingDot.key);
                                setScreen('dots');
                                setError('');

                                updateOrder(editingDot.key, {
                                    id,
                                    adress,
                                    coords: [lat, lng],
                                    date: newDate.toString(),
                                    name,
                                    time,
                                    comment
                                });
                                const now = new Date();
                                updateChangeTime({date: now.toString()});
                            } else {
                                setError('Заполните поля адреса и номера заказа');
                            };
                        } else {
                            let data = new FormData();
        
                            data.append('adress', adress);

                            let xhr = new XMLHttpRequest();
                            xhr.open('POST', 'getDadata.php');
                            xhr.onload = (res) => {
                                const dotCoords = res.target.response;
                                if (dotCoords !== ',,' && dotCoords.slice(dotCoords.length-1) === '0' && dotCoords !== '') {
                                    if (id && adress) {
                                        const newDate = new Date(date.slice(0, 4), Number(date.slice(5, 7)) - 1, date.slice(8, 10), time.slice(0, 2), time.slice(3, 5), 0, 0);
                                        const editedDot = {
                                            id,
                                            adress,
                                            coords: {lat: Number(dotCoords.slice(0,dotCoords.indexOf(',') - 1)), lng: Number(dotCoords.slice(dotCoords.indexOf(',') + 1, dotCoords.length))},
                                            date: newDate.toString(),
                                            name,
                                            comment,
                                            time,
                                            key: editingDot.key
                                        };
                                        setDot(editingDot.key);
                                        editDot(editedDot, editingDot.key);
                                        setScreen('dots');
                                        setError('');

                                        updateOrder(editingDot.key, {
                                            id,
                                            adress,
                                            coords: [Number(dotCoords.slice(0,dotCoords.indexOf(',') - 1)), Number(dotCoords.slice(dotCoords.indexOf(',') + 1, dotCoords.length))],
                                            date: newDate.toString(),
                                            name,
                                            time,
                                            comment
                                        });
                                        const now = new Date();
                                        updateChangeTime({date: now.toString()});
                                    } else {
                                        setError('Заполните поля адреса и номера заказа');
                                    };
                                } else {
                                    setError('Адрес не найден');
                                };
                            };
                            xhr.send(data);
                        };
                    }} className="edit-button">Сохранить</Button>
                    <Button variant="danger" onClick={() => {
                        editDot('-1');
                        setDot('-1');
                        setScreen('dots');
                        showLoader();
                        deleteDot(editingDot.key);
                        deleteOrder(editingDot.key);
                        const now = new Date();
                        updateChangeTime({date: now.toString()});
                    }} className="edit-button">Удалить</Button>
                </div>
                <Button variant="danger" onClick={() => {
                    setScreen('dots');
                    setError('');
                }} className="close-edit-button">X</Button>
            </div>
        </div>
    );
};