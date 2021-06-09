import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link, useHistory } from "react-router-dom";
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { IBreadcrumbs } from '@/models/commonM';
import { IsNullOrEmpty } from '@/helpers/utils'

const useStyles = makeStyles({
    root: {

    }
});

interface IProps {
    breadcrumbs: IBreadcrumbs[]
}


function Breadcrumb(props: IProps) {
    const classes = useStyles();
    let history = useHistory();

    let { breadcrumbs } = props;

    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Breadcrumbs aria-label="breadcrumb">
                {breadcrumbs?.map((item, index) => {
                    if (!IsNullOrEmpty(item.path))
                        return <Typography key={`breadcrumb${index}`} variant="h6" color="textPrimary" > {item.name}</Typography>
                    else
                        return <Link key={`breadcrumb${index}`} className="font-size-13" color="inherit" to={item.path ? item.path : ""} >
                            {item.name}
                        </Link>
                })}


            </Breadcrumbs >
        </Breadcrumbs >
    );
}

const mapStateToProps = state => {
    return {
        breadcrumbs: state.breadcrumb.breadcrumbs
    };
};

export default connect(mapStateToProps)(Breadcrumb)