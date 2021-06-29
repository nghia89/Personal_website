import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from "react-router-dom";
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { IBreadcrumbs } from '@/models/commonM';
import { IsNullOrEmpty } from '@/helpers/utils'

interface IProps {
    breadcrumbs: IBreadcrumbs[]
}


function Breadcrumb(props: IProps) {
    let { breadcrumbs } = props;

    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Breadcrumbs aria-label="breadcrumb">
                {breadcrumbs?.map((item, index) => {
                    if (IsNullOrEmpty(item.path))
                        return <Typography key={`breadcrumb${index}`} variant="h6" color="textPrimary" > {item.name}</Typography>
                    else
                        return <Link key={`breadcrumb${index}`} className="font-size-13 text-muted" to={item.path ? item.path : ""} >
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