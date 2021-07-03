import React from 'react'
import { Drawer } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

interface IProps {
    isOpen: boolean,
    anchor?: 'left' | 'top' | 'right' | 'bottom'
    children?: React.ReactNode;
    width?: string
}

let w = window.innerWidth;

const drawerWidth = ((w / 2) - 150) + 'px';


export default function DrawerLayout(props: IProps) {

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            drawerPaper: {
                width: props.width ? props.width : drawerWidth,
                overflowY: 'visible',
                overflowX: 'auto'
            }
        }),
    );
    const classes = useStyles();

    let { isOpen, anchor } = props;

    return <React.Fragment key={'anchor'}>
        <Drawer
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor={anchor ? anchor : 'right'} open={isOpen} >
            {props.children}
        </Drawer>
    </React.Fragment>

}