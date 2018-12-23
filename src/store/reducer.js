import { GET_MOVIES } from './Action-types';
import { SAVE_MOVIE } from './Action-types';
import { DELETE_MOVIE } from './Action-types';
import { UPDATE_KEY } from './Action-types'

const initialState = {
    movies: []
};

const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case `${GET_MOVIES}_FULFILLED`:
            return { ...state, movies: action.payload };
        case `${UPDATE_KEY}_FULFILLED`:
            return { ...state, movies: action.payload };
        case SAVE_MOVIE:
            return { ...state, movies: action.payload };
        case DELETE_MOVIE:
            return { ...state, movies: action.payload };
        default:
            return state;
    }
};

export default movieReducer;