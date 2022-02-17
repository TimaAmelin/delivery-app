import React, { useReducer } from 'react';
import { SET_SCREEN, SET_DOT, SET_EDIT_DOT, SET_SETTINGS, SET_ERROR, SET_MAP, SET_USER_KEY, SET_SUGGESTIONS } from '../types';
import { screenContext } from './screenContext';
import { screenReducer } from './screenReducer';

export const ScreenState = ({ children }) => {
    const initialState = {
        screen: 'login',
        dotId: '-1',
        editDotKey: '-1',
        error: '',
        suggestions: ['', '', '', '', '', '', '', '', '', ''],
        settings: false,
        userKey: '',
        coords: {
            lat: 55.751395, lng: 37.619048
        },
        bounds: {
            ne: {lat: 56.043596989588735, lng: 38.053694606445305},
            sw: {lat: 55.456987734340146, lng: 37.18440139355468}
        }
    };
    
    const [state, dispatch] = useReducer(screenReducer, initialState);

    const setScreen = (payload) => dispatch({
        type: SET_SCREEN,
        payload
    });

    const setMap = (payload) => dispatch({
        type: SET_MAP,
        payload
    });

    const setUserKey = (payload) => dispatch({
        type: SET_USER_KEY,
        payload
    });

    const setDot = (payload) => dispatch({
        type: SET_DOT,
        payload
    });

    const setEditDot = (payload) => dispatch({
        type: SET_EDIT_DOT,
        payload
    });

    const setSettings = (payload) => dispatch({
        type: SET_SETTINGS,
        payload
    });

    const setError = (payload) => dispatch({
        type: SET_ERROR,
        payload
    });

    const setSuggestions = (payload) => dispatch({
        type: SET_SUGGESTIONS,
        payload
    });

    return (
        <screenContext.Provider value = {{
            setScreen, setDot, setEditDot, setSettings, setError, setMap, setUserKey, setSuggestions,
            screen: state.screen,
            dotId: state.dotId,
            editDotKey: state.editDotKey,
            settings: state.settings,
            error: state.error,
            coords: state.coords,
            bounds: state.bounds,
            userKey: state.userKey,
            suggestions: state.suggestions
        }}>
            {children}
        </screenContext.Provider>
    );
};