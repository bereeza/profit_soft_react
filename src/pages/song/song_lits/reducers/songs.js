import {
    ADD_SONG, ERROR_ADD_SONG,
    ERROR_DELETE_SONG,
    ERROR_RECEIVE_SONG_LIST,
    RECEIVE_SONG_LIST, REQUEST_DELETE_SONG,
    REQUEST_SONG_LIST, SUCCESS_DELETE_SONG,
} from '../constants/songsActionTypes';

const initialState = {
    errors: [],
    songList: [],
    isLoading: false,
}

const convertErrors = err => err.map(err => ({
    code: err.code,
    description: err.description,
}));

export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case REQUEST_SONG_LIST:
            return {...state, isLoading: true}
        case RECEIVE_SONG_LIST:
            return {...state, songList: action.payload, isLoading: false}
        case ERROR_RECEIVE_SONG_LIST:
            return {...state, errors: convertErrors(action.payload), isLoading: false}
        case REQUEST_DELETE_SONG:
            return { ...state, isLoading: true };
        case SUCCESS_DELETE_SONG:
            return { ...state, songList: action.payload, isLoading: false };
        case ERROR_DELETE_SONG:
            return { ...state, isLoading: false, errors: convertErrors(action.payload) };
        case ADD_SONG:
            return {...state, isLoading: false};
        case ERROR_ADD_SONG:
            return {...state, isLoading: false, errors: convertErrors(action.payload)}
        default: return state;
    }
}