import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStyles } from './Styles'

export default function Loader() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CircularProgress className="loading" color="primary" />
        </div>
    );
}
