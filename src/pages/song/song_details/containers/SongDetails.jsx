import {Typography} from "@mui/material";
import {useIntl} from "react-intl";
import SongInfo from "../components/song_info";

function SongDetails() {
    const {formatMessage} = useIntl()

    return (
        <>
            <Typography>
                {formatMessage({ id: 'title' })}
            </Typography>
            <SongInfo/>
        </>
    )
}

export default SongDetails;