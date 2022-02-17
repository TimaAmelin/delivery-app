import { SHOW_LOADER, FETCH_DOTS, FETCH_FILTER, STOP_LOADER, ADD_DOT, DELETE_DOTS, EDIT_DOT, DELETE_DOT, SET_RANGE } from '../types';

const handlers = {
    DEFAULT: state => state,

    [SHOW_LOADER]: state => ({ ...state, loading: true }),

    [FETCH_DOTS]: (state, { payload }) => ({ ...state, dots: payload, loading: false }),

    [ADD_DOT]: (state, { payload }) => ({ ...state, dots: [...state.dots, payload], loading: false }),

    [EDIT_DOT]: (state, { payload }) => ({ ...state, dots: payload, loading: false }),

    [DELETE_DOTS]: state => ({ ...state, dots: [], loading: false }),

    [DELETE_DOT]: (state, { payload }) => ({ ...state, dots: payload, loading: false }),

    [SET_RANGE]: (state, { payload }) => ({ ...state, range: payload }),

    [FETCH_FILTER]: (state, { filterFunc }) => ({ ...state, filterFunc, loading: false }),

    [STOP_LOADER]: (state) => ({ ...state, loading: false })
};

export const dotsReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;

    return handle(state, action);
};