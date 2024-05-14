import {
    ERROR_RECEIVE_SONG, ERROR_UPDATE_SONG, RECEIVE_SONG, REQUEST_SONG, UPDATE_SONG
} from "../constants/songActionTypes";

const initialState = {
    errors: [],
    song: {},
    isLoading: false,
}

const convertErrors = err => {
    if (err === undefined) return {};
    return err.map(err => ({
        code: err.code,
        description: err.description,
    }));
};

export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case REQUEST_SONG:
            return {...state, isLoading: true}
        case RECEIVE_SONG:
            return {...state, songList: action.payload, isLoading: false}
        case ERROR_RECEIVE_SONG:
            return {...state, errors: convertErrors(action.payload), isLoading: false}
        case UPDATE_SONG:
            return {...state, isLoading: true}
        case ERROR_UPDATE_SONG:
            return {...state, errors: convertErrors(action.payload), isLoading: false}
        default:
            return state;
    }
}