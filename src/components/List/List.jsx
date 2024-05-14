import React from 'react';
import ListMUI from '@mui/material/List';
import {createUseStyles} from "react-jss";

const getClasses = createUseStyles({
    list: {
        margin: "16px",
    }
});

const List = ({ children }) => {
    const classes = getClasses();
    return (
        <ListMUI className={classes.list}>
            {children}
        </ListMUI>
    );
};

export default List;