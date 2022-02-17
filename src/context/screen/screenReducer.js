import { SET_SCREEN, SET_DOT, SET_EDIT_DOT, SET_SETTINGS, SET_ERROR, SET_MAP, SET_USER_KEY, SET_SUGGESTIONS } from "../types";

const handlers = {
    DEFAULT: state => state,

    [SET_SCREEN]: (state, { payload }) => ({ ...state, screen: payload }),

    [SET_DOT]: (state, { payload }) => ({ ...state, dotId: payload }),

    [SET_EDIT_DOT]: (state, { payload }) => ({ ...state, editDotKey: payload }),

    [SET_ERROR]: (state, { payload }) => ({ ...state, error: payload }),

    [SET_SUGGESTIONS]: (state, { payload }) => ({ ...state, suggestions: payload }),

    [SET_SETTINGS]: (state, { payload }) => ({ ...state, settings: payload }),

    [SET_MAP]: (state, { payload }) => ({ ...state, coords: payload }),

    [SET_USER_KEY]: (state, { payload }) => ({ ...state, userKey: payload })
};

export const screenReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;

    return handle(state, action);
};