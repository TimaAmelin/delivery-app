import React, { useContext } from 'react';
import { screenContext } from '../context/screen/screenContext';
import Button from 'react-bootstrap/Button';

export const Dot = ({ title, date, id, name, coords, dotKey, time }) => {
    let { setScreen, setEditDot, setDot, dotId, setMap } = useContext(screenContext);

    const days = [', Понедельник', ', Вторник', ', Среда', ', Четверг', ', Пятница', ', Суббота', ', Воскресенье'];
    const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

    const now = new Date();
    const dateText = new Date(date);

    let shownDate = dateText.getDate() + ' ' + months[dateText.getMonth()];

    if (Math.floor((Date.parse(date) / 1000 / 60 / 60 + 3) / 24) - Math.floor((Date.parse(now) / 1000 / 60 / 60 + 3) / 24) === 0) {
        shownDate += ', Сегодня'
    } else if (Math.floor(Date.parse(date) / 1000 / 60 / 60 / 24) - Math.floor((Date.parse(now) / 1000 / 60 / 60 + 3) / 24) === 1) {
        shownDate += ', Завтра'
    } else if (Math.floor(Date.parse(date) / 1000 / 60 / 60 / 24) - Math.floor((Date.parse(now) / 1000 / 60 / 60 + 3) / 24) <= 6 &&
                Math.floor(Date.parse(date) / 1000 / 60 / 60 / 24) - Math.floor((Date.parse(now) / 1000 / 60 / 60 + 3) / 24) > 0) {
        shownDate += days[dateText.getDay() - 1];
    };
    
    return (
        <div className="dot" style={{borderWidth: dotId === dotKey ? 2 : 0}} onClick={() => {
                if (dotId === dotKey) {
                    setDot('-1');
                } else {
                    setDot(dotKey);
                    setMap(coords);
                };
            }}>
            <div className="dot-text">
                <p className="dot-info dot-date">{dateText.getFullYear() === 1899 ? 'Дата не установлена' : shownDate}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {time}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#{id},&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{name}</p>
                <p className="dot-info">{title}</p>
            </div>
            <div className="dot-button">
                <Button variant="outline-dark" className="dot-btn" onClick={() => {
                    setScreen('edit');
                    setEditDot(dotKey);
                }}>Ред.</Button>
            </div>
        </div>
    );
};
//55.748278, 37.698744