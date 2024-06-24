import React from "react";
import ListItemTextMUI from "@mui/material/ListItemText";
import {createUseStyles} from "react-jss";

const getClasses = createUseStyles({
    itemText: {
        flex: 1,
        textAlign: 'left',
        maxHeight: '40px'
    }
});

const ListItemText = ({ primary }) => {
    const classes = getClasses();
    return (
        <ListItemTextMUI className={classes.itemText} primary={primary} />
    );
};

export default ListItemText;