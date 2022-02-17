import React, { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { dotsContext } from '../context/dots/dotsContext';

export const Settings = () => {
    let { range, setRange } = useContext(dotsContext);

    return (
        <div className="settings">
            <p>Радиус - <Form.Control className="settings-input" value={range} onChange={e => setRange(e.target.value)} /> км</p>
            <Form.Range className="settings-range" value={range} onChange={e => setRange(e.target.value)} />
        </div>
    )
}