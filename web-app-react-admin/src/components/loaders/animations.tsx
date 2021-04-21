import React from 'react';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

interface IProps {
    W?: number
}

export default function Animations(props: IProps) {
    const useStyles = makeStyles({
        root: {
            width: props?.W ? props.W : 300,
        },
    });
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton animation={false} />
            <Skeleton animation="wave" />
        </div>
    );
}
