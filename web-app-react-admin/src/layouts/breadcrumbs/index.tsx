import React from 'react';
import { emphasize, withStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import HomeIcon from '@material-ui/icons/Home';
import { Link, useHistory } from "react-router-dom";
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
    root: {

    }
});


export default function Breadcrumb() {
    const classes = useStyles();
    let history = useHistory();

    function handleClick(event: React.MouseEvent<Element, MouseEvent>) {
        event.preventDefault();
        history.push('/');
    }

    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" to="/" onClick={handleClick}>
                    Material-UI
                </Link>
                <Typography color="textPrimary">Breadcrumb</Typography>
            </Breadcrumbs>
        </Breadcrumbs>
    );
}
