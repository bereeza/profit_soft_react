import {useNavigate, useParams} from "react-router-dom";
import CardContent from "../../../../../components/CardContent";
import Card from "../../../../../components/Card";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import songAction from "../../actions/song";
import IconButton from "../../../../../components/IconButton";
import IconEdit from '../../../../../components/icons/Edit';
import SongEditor from "../song_editor/SongEditor";
import Button from "../../../../../components/Button";
import IconBack from "../../../../../components/icons/Back";
import {useIntl} from "react-intl";
import {createUseStyles} from "react-jss";
import useTheme from "../../../../../misc/hooks/useTheme";

const getClasses = createUseStyles((theme) => ({
    buttons: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}))

const SongInfo = () => {
    const {theme} = useTheme();
    const classes = getClasses(theme);

    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [song, setSong] = useState({});
    const [originalSong, setOriginalSong] = useState({});
    const [edit, setEdit] = useState(false);
    const {formatMessage} = useIntl();

    // use id from useParams, and parse it to number.
    useEffect(() => {
        dispatch(songAction.fetchSong(parseInt(id)))
            .then((song) => {
                setSong(song);
                console.log(song)
                setOriginalSong(song);
            })
            .catch((err) => {
                console.log("Something went wrong" + err);
            });
    }, [dispatch, id]);

    const handleEditClick = () => {
        setEdit(!edit);
        if (!edit) {
            setOriginalSong({...song});
        }
    };

    return (
        <>
            <div className={classes.buttons}>
                <IconButton onClick={() => navigate(-1)}>
                    <IconBack size={32}/>
                </IconButton>
                <IconButton onClick={handleEditClick}>
                    <IconEdit size={32} color={edit ? 'blue' : 'default'}/>
                </IconButton>
            </div>
            <Card>
                <CardContent>
                    <SongEditor
                        song={song}
                        setSong={setSong}
                        edit={edit}
                        setEdit={setEdit}
                    />
                    {edit && (
                        <Button onClick={() => {
                            setSong({...originalSong});
                            setEdit(false);
                        }}>
                            {formatMessage({id: 'btn_cancel'})}
                        </Button>
                    )}
                </CardContent>
            </Card>
        </>
    );
};

export default SongInfo;