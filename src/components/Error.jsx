import React, { useContext } from "react";
import { screenContext } from '../context/screen/screenContext';

export const Error = ({text}) => {
    let { setError } = useContext(screenContext);

    return (
        <div className="error" onClick={() => {
            setError('');
        }}>
            <h5>{text}</h5>
        </div>
    )
}