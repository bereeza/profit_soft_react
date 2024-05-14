import React from "react";
import ListItemMUI from '@mui/material/ListItem';
import {createUseStyles} from "react-jss";

const getClasses = createUseStyles({
    item: {
        display: 'flex',
        alignItems: 'center',
        border: '2px solid black',
        borderRadius: '8px',
        background: '#3fb560',
        color: 'white',
        margin: '5px',
        padding: '10px',
    }
});

const ListItem = ({ children }) => {
    const classes = getClasses();

    return (
        <ListItemMUI className={classes.item}>
            {children}
        </ListItemMUI>
    );
};

export default ListItem;
