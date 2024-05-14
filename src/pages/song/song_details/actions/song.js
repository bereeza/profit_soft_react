import {
    ERROR_RECEIVE_SONG, ERROR_UPDATE_SONG,
    RECEIVE_SONG,
    REQUEST_SONG, UPDATE_SONG,
} from "../constants/songActionTypes";
import data from "../../../../Data/data";
import axios from "axios";

const requestSong = () => ({
    type: REQUEST_SONG
})

const receiveSong = (data) => ({
    payload: data,
    type: RECEIVE_SONG
})

const errorReceiveSong = (err) => ({
    payload: err,
    type: ERROR_RECEIVE_SONG
})

const updateSong = () => ({
    type: UPDATE_SONG
})

const errorUpdateSong = () => ({
    type: ERROR_UPDATE_SONG
})

const getSong = (id) => {
    return Promise.resolve(data.songs.find(song => song.id === id));
};

const fetchSong = (id) => {
    return (dispatch) => {
        dispatch(requestSong());
        return getSong(id)
            .then(response => {
                dispatch(receiveSong(response));
                return response;
            })
            .catch(err => {
                dispatch(errorReceiveSong(err.message));
            });
    };
};

const fetchUpdateSong = (id, updatedSong) => {
    return (dispatch) => {
        dispatch(requestSong());
        return axios.put(`/song_details/${id}`, updatedSong)
            .then(response => {
                dispatch(updateSong(response));
                return response;
            })
            .catch(err=> {
                dispatch(errorUpdateSong(err.message))
            })
    };
};

const songAction = {
    fetchSong,
    fetchUpdateSong
}

export default songAction;