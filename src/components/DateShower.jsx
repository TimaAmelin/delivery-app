import React from 'react';

export const DateShower = ({ dotDate, dotTime }) => {
    const date = new Date(dotDate);
    return date.getFullYear() === 1899 ? <div className="marker-text">Без даты</div> : 
            <div className="marker-text">
                <p>{date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()}</p>
                <p>{dotTime}</p>
            </div>;
}