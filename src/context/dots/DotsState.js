import React, { useReducer } from 'react';
import { SHOW_LOADER, FETCH_DOTS, FETCH_FILTER, ADD_DOT, DELETE_DOTS, EDIT_DOT, DELETE_DOT, SET_RANGE, STOP_LOADER } from '../types';
import { dotsContext } from './dotsContext';
import { dotsReducer } from './dotsReducer';

export const DotsState = ({ children }) => {
    const initialState = {
        dots: [], 
        filterFunc: dots => dots,
        range: 5,
        loading: true
    };

    const [state, dispatch] = useReducer(dotsReducer, initialState);

    const showLoader = () => dispatch({type: SHOW_LOADER});

    const setDots = payload => dispatch({
        type: FETCH_DOTS,
        payload
    });

    const addDot = (payload) => dispatch({
        type: ADD_DOT,
        payload
    });

    const editDot = (payload, key) => dispatch({
            type: EDIT_DOT,
            payload: state.dots.map(dot => dot.key === key ? payload : dot)
        });

    const deleteDot = (payload) => dispatch({
            type: DELETE_DOT,
            payload: state.dots.filter(dot => dot.key !== payload)
        });

    const setRange = (payload) => dispatch({
            type: SET_RANGE,
            payload
        });

    const deleteDots = () => dispatch({type: DELETE_DOTS});

    const fetchFilter = (filterFunc) => dispatch({
        type: FETCH_FILTER,
        filterFunc
    });

    const stopLoader = () => dispatch({type: STOP_LOADER});

    return (
        <dotsContext.Provider value = {{
            showLoader, fetchFilter, addDot, deleteDots, editDot, deleteDot, setRange, setDots, stopLoader,
            loading: state.loading, 
            filterFunc: state.filterFunc,
            dots: state.dots,
            range: state.range
        }}>
            {children}
        </dotsContext.Provider>
    );
};