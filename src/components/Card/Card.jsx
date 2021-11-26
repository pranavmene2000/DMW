import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: 10
    },
    title: {
        fontSize: 14,
    },
});

export default function Carder({ ...props }) {
    const classes = useStyles();
    const { p } = props;

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {p}
                </Typography>
            </CardContent>
        </Card>
    );
}