import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import { useStyles } from './Styles';

function Charter({ ...props }) {
    const classes = useStyles()
    const { percentage } = props
    return (
        <div className={classes.wrapper}>
            <CircularProgressbar value={Math.round(percentage)} text={`${Math.round(percentage)}%`} />
        </div>
    )
}


export default Charter
