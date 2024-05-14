import {
    ADD_SONG, ERROR_ADD_SONG,
    ERROR_DELETE_SONG,
    ERROR_RECEIVE_SONG_LIST,
    RECEIVE_SONG_LIST, REQUEST_DELETE_SONG,
    REQUEST_SONG_LIST, SUCCESS_DELETE_SONG,
} from "pages/song/song_lits/constants/songsActionTypes";
import data from 'Data/data'
import axios from "axios";

const errorReceiveSongList = (err) => ({
    payload: err,
    type: ERROR_RECEIVE_SONG_LIST
})

const requestSongList = () => ({
    type: REQUEST_SONG_LIST
})

const receiveSongList = (data) => ({
    payload: data,
    type: RECEIVE_SONG_LIST
})

const requestDeleteSong = () => ({
    type: REQUEST_DELETE_SONG,
});

const successDeleteSong = (id) => ({
    type: SUCCESS_DELETE_SONG,
    payload: id,
});

const errorDeleteSong = (error) => ({
    type: ERROR_DELETE_SONG,
    payload: error,
});

const addSong = () => ({
    type: ADD_SONG
})

const errorAddSong = (error) => ({
    type: ERROR_ADD_SONG,
    payload: error
})

const getSongList = () => {
    // Using data.songs as mocked data
    return Promise.resolve(data.songs);
};

const fetchSongList = () => {
    return (dispatch) => {
        dispatch(requestSongList());
        return getSongList()
            .then(response => {
                dispatch(receiveSongList(response));
                return response;
            })
            .catch(err => {
                dispatch(errorReceiveSongList(err.message));
            });
    };
};

const fetchDeleteSong = (id) => {
    return (dispatch) => {
        dispatch(requestDeleteSong());
        return axios.delete(`/song_list/${id}`)
            .then(response => {
                dispatch(successDeleteSong(id));
                return response;
            })
            .catch(error => {
                dispatch(errorDeleteSong(error.message));
            });
    };
};

const fetchAddSong = (song) => {
    return (dispatch) => {
        return axios.post(`/song_list`, song)
            .then(response => {
                dispatch(addSong())
                return response;
            })
            .catch(error => {
                dispatch(errorAddSong(error.message))
            })
    }
}

const songAction = {
    fetchSongList,
    fetchDeleteSong,
    fetchAddSong
}

export default songAction;