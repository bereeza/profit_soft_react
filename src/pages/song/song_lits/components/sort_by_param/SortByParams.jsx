import Typography from "../../../../../components/Typography";
import {useIntl} from "react-intl";
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
    radioContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    },
    radioButton: {
        marginRight: '8px',
    },
});

const SortByParams = ({
                          filter,
                          handleSortChange
                      }) => {
    const classes = useStyles();
    const titleParam = 'title';
    const albumParam = 'album'
    const {formatMessage} = useIntl();

    return (
        <>
            <div className={classes.radioContainer}>
                <input type="radio" id={titleParam} value={titleParam} checked={filter === 'title'}
                       onChange={handleSortChange}/>
                <Typography>
                    {formatMessage({id: 'song_title'})}
                </Typography>

                <input type="radio" id={albumParam} value={albumParam} checked={filter === 'album'}
                       onChange={handleSortChange}/>
                <Typography>
                    {formatMessage({id: 'song_album'})}
                </Typography>
            </div>
        </>
    );
};

export default SortByParams;