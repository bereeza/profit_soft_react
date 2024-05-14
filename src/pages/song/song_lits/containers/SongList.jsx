import {useIntl} from "react-intl";
import Typography from "../../../../components/Typography";
import SongList from "../components/song_list";

const EntityList = () => {
    const {formatMessage} = useIntl();

    return (
        <>
            <Typography>
                {formatMessage({id: 'title'})}
            </Typography>
            <SongList/>
        </>
    );
}

export default EntityList;