import ListItem from "../../../../../components/ListItem";
import ListItemText from "../../../../../components/ListItemText";
import IconButton from '../../../../../components/IconButton';
import IconDelete from '../../../../../components/icons/Delete';
import IconInfo from '../../../../../components/icons/Info';
import {Link} from "react-router-dom";

const SongListItem = ({
                          song,
                          onDelete
                      }) => {
    return (
        <ListItem key={song.id}>
            <ListItemText primary={`${song.id}`}/>
            <ListItemText primary={song.title}/>
            <ListItemText primary={`${song.album}`}/>
            <IconButton onClick={() => onDelete(song.id)}>
                <IconDelete size={32}/>
            </IconButton>
            <Link to={`/song_details/${song.id}`}>
                <IconButton>
                    <IconInfo size={32}/>
                </IconButton>
            </Link>
        </ListItem>
    );
};

export default SongListItem;