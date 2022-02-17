import React, { useContext, useState } from 'react';
import { dotsContext } from '../context/dots/dotsContext';
import { screenContext } from '../context/screen/screenContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const Header = () => {
    let { fetchFilter, deleteDots } = useContext(dotsContext);
    let { setScreen, setDot, setSettings, settings, setUserKey } = useContext(screenContext);

    const [search, setSearch] = useState('');
    const [date, setDate] = useState('');

    return (
        <div className="top-menu">
            <div className="top-menu-button">
                <Button variant="dark" className="top-menu-btn1" onClick={() => {
                    setSearch('');
                    setDate('');
                    fetchFilter(dots => dots);
                }}>Сбросить</Button>
                <Form.Control type="date" className="top-menu-date" value={date} onChange={e => setDate(e.target.value)} />
                <Form.Control type="text" className="top-menu-input" value={search} onChange={e => setSearch(e.target.value)} />
                <Button variant="dark" className="top-menu-btn2"onClick={() => {
                    if (search && date) {
                        fetchFilter(dots => dots.filter(dot => {
                            const dotDate = new Date(dot.date);
                            const day = dotDate.getDate() < 10 ? '0' + dotDate.getDate() : dotDate.getDate();
                            const month = dotDate.getMonth() + 1 < 10 ? '0' + (dotDate.getMonth() + 1) : dotDate.getMonth() + 1;
                            return date.slice(5) === month + '-' + day && (dot.adress.toLowerCase().indexOf(search.toLowerCase()) + 1 || dot.id.toLowerCase().indexOf(search.toLowerCase()) + 1 || dot.name.toLowerCase().indexOf(search.toLowerCase()) + 1);
                        }));
                    } else if (search) {
                        fetchFilter(dots => dots.filter(dot => {
                            return (dot.adress.toLowerCase().indexOf(search.toLowerCase()) + 1 || dot.id.toLowerCase().indexOf(search.toLowerCase()) + 1 || dot.name.toLowerCase().indexOf(search.toLowerCase()) + 1);
                        }));
                    } else if (date) {
                        fetchFilter(dots => dots.filter(dot => {
                            const dotDate = new Date(dot.date);
                            const day = dotDate.getDate() < 10 ? '0' + dotDate.getDate() : dotDate.getDate();
                            const month = dotDate.getMonth() + 1 < 10 ? '0' + (dotDate.getMonth() + 1) : dotDate.getMonth() + 1;

                            return date.slice(5) === month + '-' + day;
                        }));
                    } else {
                        fetchFilter(dots => dots);
                    };
                }}>Поиск</Button>

                <Button variant="dark" className="top-menu-btn3" onClick={() => {
                    fetchFilter(dots => dots.filter(dot => {
                        
                        return dot.date === 'Sun Dec 31 1899 00:00:00 GMT+0230 (Москва, стандартное время)'
                    }));
                }}>Доставки без даты</Button>

                <Button variant="dark" className="top-menu-btn4" onClick={() => {
                    settings === true ? setSettings(false) : setSettings(true);
                }}>
                    <img src="./assets/settings.png" className="top-menu-btn4-img" alt="..." />
                </Button>

                <Button variant="danger" className="top-menu-btn5" onClick={() => {
                    setScreen('login');
                    deleteDots();
                    fetchFilter(dots => dots);
                    setSearch('');
                    setDate('');
                    setDot('-1');
                    setUserKey('');
                }}>Выйти</Button>
            </div>
        </div>
    );
};