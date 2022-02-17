import React, { useContext, useState } from 'react';
import { dotsContext } from '../context/dots/dotsContext';
import { screenContext } from '../context/screen/screenContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { db } from '../firebase/firebase';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

export const Add = () => {
    let { addDot } = useContext(dotsContext);
    let { setScreen, setDot, setError, setSuggestions, suggestions } = useContext(screenContext);

    const ordersCollectionRef = collection(db, 'orders');

    const updateChangeTime = async (time) => {
        await updateDoc(doc(db, 'ChangeTime', '1'), time);
    };

    const [ adress, setAdress ] = useState('');
    
    const [ comment, setComment ] = useState('');
    const [ date, setDate ] = useState('');
    const [ time, setTime ] = useState('');
    const [ id, setId ] = useState('');
    const [ name, setName ] = useState('');
    const [ lng, setLng ] = useState('');
    const [ lat, setLat ] = useState('');

    const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
    const token = "a34c95fdfa89494cbda4e19fc075ea432d1b90aa";

    const createOrder = async (order, dotCoords, manual) => {
        await addDoc(ordersCollectionRef, order).then(data => {
            if (date) {
                if (time) {
                    const newDate = new Date(date.slice(0, 4), Number(date.slice(5, 7)) - 1, date.slice(8, 10), 12, 0, 0, 0);
                    const dot = {
                        id,
                        adress,
                        coords: {lat: Number(dotCoords.slice(0,dotCoords.indexOf(',') - 1)), lng: Number(dotCoords.slice(dotCoords.indexOf(',') + 1, dotCoords.length - 2))},
                        date: newDate.toString(),
                        name,
                        comment,
                        time,
                        manual,
                        key: data._key.path.segments[1]
                    };

                    addDot(dot);
                    setDot(dot.key);
                } else {
                    const newDate = new Date(date.slice(0, 4), Number(date.slice(5, 7)) - 1, date.slice(8, 10), 12, 0, 0, 0);
                    const dot = {
                        id,
                        adress,
                        coords: {lat: Number(dotCoords.slice(0,dotCoords.indexOf(',') - 1)), lng: Number(dotCoords.slice(dotCoords.indexOf(',') + 1, dotCoords.length - 2))},
                        date: newDate.toString(),
                        name,
                        comment,
                        time,
                        manual,
                        key: data._key.path.segments[1]
                    };

                    addDot(dot);
                    setDot(dot.key);
                };
            } else {
                const newDate = new Date(0, 0, 0, 0, 0, 0, 0);
                const dot = {
                    id,
                    adress,
                    coords: {lat: Number(dotCoords.slice(0,dotCoords.indexOf(',') - 1)), lng: Number(dotCoords.slice(dotCoords.indexOf(',') + 1, dotCoords.length - 2))},
                    date: newDate.toString(),
                    name,
                    comment,
                    time,
                    manual,
                    key: data._key.path.segments[1]
                };

                addDot(dot);
                setDot(dot.key);
            };
        });
    };

    return (
        <div className="shadow" onClick={() => setSuggestions(['', '', '', '', '', '', '', '', '', ''])}>
            <div className="edit">
                <div>
                    <h1 className="edit-title">Добавление доставки</h1>
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
                    <Form.Control type="text" className="edit-field-last" placeholder="Комментарий" value={comment} onChange={e => setComment(e.target.value)} onClick={() => setSuggestions(['', '', '', '', '', '', '', '', '', ''])} />
                </div>
                <div>
                    <Form.Control type="date" className="edit-field" placeholder="Дата доставки" value={date} onChange={e => setDate(e.target.value)} onClick={() => setSuggestions(['', '', '', '', '', '', '', '', '', ''])} />
                    <Form.Control type="text" className="edit-field-last" placeholder="Время доставки" value={time} onChange={e => setTime(e.target.value)} onClick={() => setSuggestions(['', '', '', '', '', '', '', '', '', ''])} />
                </div>
                <div>
                    <Form.Control type="text" className="edit-field" placeholder="Широта" value={lat} onChange={e => setLat(e.target.value)} onClick={() => setSuggestions(['', '', '', '', '', '', '', '', '', ''])} />
                    <Form.Control type="text" className="edit-field-last" placeholder="Долгота" value={lng} onChange={e => setLng(e.target.value)} onClick={() => setSuggestions(['', '', '', '', '', '', '', '', '', ''])} />
                </div>
                <div>
                    <Button variant="dark" onClick={() => {
                        setSuggestions(['', '', '', '', '', '', '', '', '', '']);
                        if (id && adress) {
                            if (lat.length && lng.length) {
                                if (date) {
                                    if (time) {
                                        const newDate = new Date(date.slice(0, 4), Number(date.slice(5, 7)) - 1, date.slice(8, 10), 12, 0, 0, 0);
                                        createOrder({
                                            id,
                                            adress,
                                            coords: [lat, lng],
                                            date: newDate.toString(),
                                            name,
                                            comment,
                                            time,
                                            manual : 'true'
                                        }, lat.toString() + ',' + lng.toString() + ',0', 'true');
                                    } else {
                                        const newDate = new Date(date.slice(0, 4), Number(date.slice(5, 7)) - 1, date.slice(8, 10), 12, 0, 0, 0);
                                        createOrder({
                                            id,
                                            adress,
                                            coords: [lat, lng],
                                            date: newDate.toString(),
                                            name,
                                            comment,
                                            time,
                                            manual : 'true'
                                        }, lat.toString() + ',' + lng.toString() + ',0', 'true');
                                    };
                                } else {
                                    const newDate = new Date(0, 0, 0, 0, 0, 0, 0);
                                    createOrder({
                                        id,
                                        adress,
                                        coords: [lat, lng],
                                        date: newDate.toString(),
                                        name,
                                        comment,
                                        time,
                                        manual : 'true'
                                    }, lat.toString() + ',' + lng.toString() + ',0', 'true');
                                };
                                const now = new Date();
                                updateChangeTime({date: now.toString()});

                                setScreen('dots');
                                setError('');
                            } else {
                                let data = new FormData();
    
                                data.append('adress', adress);
                                data.append('type', 'getDot');
        
                                let xhr = new XMLHttpRequest();
                                xhr.open('POST', 'getDadata.php');
                                xhr.onload = (res) => {
                                    const dotCoords = res.target.response;
                                    console.log(dotCoords)
                                    
                                    if (dotCoords !== ',,' && Number(dotCoords.slice(dotCoords.length-1)) <= 2 && dotCoords !== '') {
                                        dotCoords.slice(dotCoords.length-1);
                                        if (date) {
                                            if (time) {
                                                const newDate = new Date(date.slice(0, 4), Number(date.slice(5, 7)) - 1, date.slice(8, 10), 12, 0, 0, 0);
                                                createOrder({
                                                    id,
                                                    adress,
                                                    coords: [Number(dotCoords.slice(0,dotCoords.indexOf(',') - 1)), Number(dotCoords.slice(dotCoords.indexOf(',') + 1, dotCoords.length - 2))],
                                                    date: newDate.toString(),
                                                    name,
                                                    comment,
                                                    time,
                                                    manual : 'false'
                                                }, dotCoords, 'false');
                                            } else {
                                                const newDate = new Date(date.slice(0, 4), Number(date.slice(5, 7)) - 1, date.slice(8, 10), 12, 0, 0, 0);
                                                createOrder({
                                                    id,
                                                    adress,
                                                    coords: [Number(dotCoords.slice(0,dotCoords.indexOf(',') - 1)), Number(dotCoords.slice(dotCoords.indexOf(',') + 1, dotCoords.length - 2))],
                                                    date: newDate.toString(),
                                                    name,
                                                    comment,
                                                    time,
                                                    manual : 'true'
                                                }, dotCoords, 'false');
                                            };
                                        } else {
                                            const newDate = new Date(0, 0, 0, 0, 0, 0, 0);
                                            createOrder({
                                                id,
                                                adress,
                                                coords: [Number(dotCoords.slice(0,dotCoords.indexOf(',') - 1)), Number(dotCoords.slice(dotCoords.indexOf(',') + 1, dotCoords.length - 2))],
                                                date: newDate.toString(),
                                                name,
                                                comment,
                                                time,
                                                manual : 'true'
                                            }, dotCoords, 'false');
                                        };
                                        const now = new Date();
                                        updateChangeTime({date: now.toString()});

                                        setScreen('dots');
                                        setError('');
                                    } else {
                                        setError('Адрес не найден');
                                    };
                                };
                                xhr.send(data);
                            };
                            
                        } else {
                            setError('Заполните поля адреса и номера заказа');
                        };
                    }} className="edit-button">Сохранить</Button>
                </div>
                <div>
                    <Button variant="danger" onClick={() => {
                        setSuggestions(['', '', '', '', '', '', '', '', '', '']);
                        setScreen('dots');
                        setError('');
                    }} className="close-edit-button">X</Button>
                </div>
            </div>
        </div>
    );
};