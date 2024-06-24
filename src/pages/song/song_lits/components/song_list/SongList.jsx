import React, {useEffect, useMemo, useState} from 'react';
import songAction from '../../actions/song';
import {useDispatch} from 'react-redux';
import Typography from '../../../../../components/Typography';
import List from '../../../../../components/List';
import Pagination from '../../../../../components/Pagination';
import Button from "../../../../../components/Button";
import useLocationSearch from "../../../../../misc/hooks/useLocationSearch";
import useChangePage from "../../../../../misc/hooks/useChangePage";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toast from "../../../../../components/Toast";
import SongListItem from "../song_list_item/SongListItem";
import SortOptions from "../sort_by_param/SortByParams";
import {useNavigate} from "react-router-dom";
import {useIntl} from "react-intl";

const SongList = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const locationParams = useLocationSearch();

    const currentPage = parseInt(locationParams.page) || 1;
    const changePage = useChangePage();
    const songsPerPage = 5;

    const [songs, setSongs] = useState([]);
    const [filter, setFilter] = useState(locationParams.sortBy || 'title');
    const {formatMessage} = useIntl();

    useEffect(() => {
        dispatch(songAction.fetchSongList({page: currentPage, filter}))
            .then((data) => {
                setSongs(data);
            });
    }, [dispatch, currentPage, filter]);

    const handlePageChange = (page) => {
        changePage({
            locationSearch: {...locationParams, page}
        });
    };

    const handleSortChange = (event) => {
        const newSortBy = event.target.value;
        changePage({
            locationSearch: {...locationParams, sortBy: newSortBy}
        });
        setFilter(newSortBy);
    };

    const filteredSongs = useMemo(() => {
        return [...songs].sort((a, b) => {
            return a[filter].toLowerCase() > b[filter].toLowerCase() ? 1 : -1;
        });
    }, [songs, filter]);
    const totalPages = Math.ceil(filteredSongs.length / songsPerPage);

    const getCurrentSongs = () => {
        const startIndex = (currentPage - 1) * songsPerPage;
        return filteredSongs.slice(startIndex, startIndex + songsPerPage);
    };

    const handleDeleteSong = (id) => {
        if (window.confirm("Delete song?")) {
            dispatch(songAction.fetchDeleteSong(id)).then(() => {
                const index = songs.findIndex(song => song.id === id);

                // I delete it manually, because I work with a mocked data and the server will give 404
                songs.splice(index, 1);
                setSongs([...songs]);
                toast.success('Song removed successfully.')
            }).catch((err) => {
                console.log('Something went wrong. ' + err.message)
                toast.error('Something went wrong. ' + err.message)
            })
        }
    };

    const handleAddSong = () => {
        const newSong = {
            // I work with mocked data. So the request for creating
            // a new song and ID would be made by the server.
            // For this example, I made an ID generator.
            id: Math.floor(Math.random() * 1000),
            title: '',
            album: ''
        };

        dispatch(songAction.fetchAddSong(newSong)).then(() => {

            // I add it manually, because I work with a mocked data and the server will give 404
            songs.push(newSong);
            setSongs(prevSongs => [...prevSongs, newSong]);
            navigate(`/song_details/${newSong.id}`);
        }).catch((err) => {
            console.log('Something went wrong. ' + err.message)
            toast.error('Something went wrong. ' + err.message);
        });
    };

    return (
        <>
            <Toast/>
            <SortOptions filter={filter} handleSortChange={handleSortChange}/>
            <Button onClick={handleAddSong}>
                {formatMessage({id: 'add_song'})}
            </Button>

            {filteredSongs.length > 0 ? (
                <>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                    <List>
                        {getCurrentSongs().map((song) => (
                            <SongListItem key={song.id} song={song} onDelete={handleDeleteSong}/>
                        ))}
                    </List>
                </>
            ) : (
                <Typography>No data</Typography>
            )}
        </>
    );
};

export default SongList;
