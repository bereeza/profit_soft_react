import Button from "../../../../../components/Button";
import {useState} from "react";
import {useDispatch} from "react-redux";
import songAction from "../../actions/song";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toast from "../../../../../components/Toast";
import {useIntl} from "react-intl";
import {createUseStyles} from "react-jss";
import useTheme from "../../../../../misc/hooks/useTheme";

// Styles for SongEditor (form) component
const getClasses = createUseStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '20px',
    },
    input: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px #ccc',
        fontSize: '16px',
    },
    // If we have some error during validation
    error: {
        color: 'red',
        fontSize: '16px',
        fontStyle: 'bold',
        marginTop: '4px',
    }
}));

const SongEditor = ({
                        song,
                        setSong,
                        edit,
                        setEdit
                    }) => {
    const {theme} = useTheme();
    const {formatMessage} = useIntl();
    const classes = getClasses(theme);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const validateFields = () => {
        const errors = {};
        if (!song.title) errors.title = formatMessage({id: 'text_validate'});
        if (!song.duration || song.duration < 0) errors.duration = formatMessage({id: 'number_validate'});
        if (!song.album) errors.album = formatMessage({id: 'text_validate'});
        if (!song.genre) errors.genre = formatMessage({id: 'text_validate'});
        if (!song.artist_id || song.artist_id < 0) errors.artist_id = formatMessage({id: 'number_validate'});
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSaveChanges = () => {
        if (!validateFields()) return;

        dispatch(songAction.fetchUpdateSong(song.id, song))
            .then(() => {
                setSong(song);
                console.log(song)
                toast.success('Song Updated');
                setEdit(false);
            })
            .catch(err => {
                console.log('Something went wrong' + err);
                toast.error('Something went wrong' + err);
            });
    };

    const handleInputChange = e => {
        const { name, value } = e.target;
        const props = { duration: parseFloat, artist_id: parseInt };

        setSong(prev => ({
            ...prev,
            [name]: props[name] ? props[name](value) : value,
        }));
    };

    return (
        <>
            {/* Toast for a message to the user (successful/failed). */}
            <Toast/>

            {/* Form to change the song & cancel button. */}
            <form className={classes.form}>
                {/* Input for the value. */}
                <input
                    type="text"
                    name="title"
                    value={song.title || ''}
                    disabled={!edit}
                    onChange={handleInputChange}
                    className={classes.input}
                    placeholder="Title"
                />
                {/* If we have a validation error. */}
                {errors.title && <div className={classes.error}>{errors.title}</div>}

                <input
                    type="number"
                    name="duration"
                    value={song.duration || ''}
                    disabled={!edit}
                    onChange={handleInputChange}
                    className={classes.input}
                    placeholder="Duration"
                />
                {errors.duration && <div className={classes.error}>{errors.duration}</div>}

                <input
                    type="text"
                    name="album"
                    value={song.album || ''}
                    disabled={!edit}
                    onChange={handleInputChange}
                    className={classes.input}
                    placeholder="Album"
                />
                {errors.album && <div className={classes.error}>{errors.album}</div>}

                <input
                    type="text"
                    name="genre"
                    value={song.genre || ''}
                    disabled={!edit}
                    onChange={handleInputChange}
                    className={classes.input}
                    placeholder="Genre"
                />
                {errors.genre && <div className={classes.error}>{errors.genre}</div>}

                <input
                    type="number"
                    name="artist_id"
                    value={song.artist_id || ''}
                    disabled={!edit}
                    onChange={handleInputChange}
                    className={classes.input}
                    placeholder="Artist ID"
                />
                {errors.artist_id && <div className={classes.error}>{errors.artist_id}</div>}

                {edit && (
                    <Button onClick={handleSaveChanges}>
                        {formatMessage({id: 'btn_save'})}
                    </Button>
                )}
            </form>
        </>
    );
};

export default SongEditor;