import React from 'react'
import { CardContent, Divider, Grid, makeStyles, Paper, Typography, Card as PercentageCard } from '@material-ui/core'
import Charter from './../Chart/Chart';
import { useStyles } from './Styles';
import Card from '../Card/Card';

const Styles = makeStyles({
    root: {
        minWidth: 275,
        margin: 10
    },
    title: {
        fontSize: 14,
    },
});

function TweetsContainer({ ...props }) {
    const { data } = props
    const classes = useStyles()
    const cls = Styles();

    return (
        <React.Fragment>
            {data && (
                <Paper classes={{ root: classes.wrapper }} elevation={1} square>
                    <Grid justifyContent="space-between" container spacing={0}>
                        <Grid item md={6} sm={12} xs={12}>
                            <PercentageCard className={cls.root} variant="outlined">
                                <CardContent>
                                    <Typography align="center" variant="p" component="h3" color="textSecondary" gutterBottom>
                                        Positive Percentage (%)
                                    </Typography>
                                    <Charter percentage={data?.positive} />
                                </CardContent>
                            </PercentageCard>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12}>
                            <PercentageCard className={cls.root} variant="outlined">
                                <CardContent>
                                    <Typography align="center" variant="p" component="h3" color="textSecondary" gutterBottom>
                                        Negative Percentage (%)
                                    </Typography>
                                    <Charter percentage={data?.negative} />
                                </CardContent>
                            </PercentageCard>
                        </Grid>
                    </Grid>
                </Paper>
            )}

            <Paper classes={{ root: classes.wrapper }} elevation={1} square>
                <Grid justifyContent="space-between" container spacing={0}>
                    <Grid item md={12}>
                        {data?.length && <Divider />}
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        {data?.ptweets?.length > 0 && (
                            <Paper classes={{ root: classes.heading }} variant="outlined" square elevation={1}>
                                <Typography color="primary" variant="p" component="h2">
                                    Positive Tweets (+)
                                </Typography>
                            </Paper>
                        )}
                        {data?.ptweets?.map(p => {
                            return (
                                <Card p={p} />
                            )
                        })}
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        {data?.ntweets?.length > 0 && (
                            <Paper classes={{ root: classes.heading }} variant="outlined" square elevation={1}>
                                <Typography color="secondary" variant="p" component="h2">
                                    Negative Tweets (-)
                                </Typography>
                            </Paper>
                        )}
                        {data?.ntweets?.map(p => {
                            return (
                                <Card p={p} />
                            )
                        })}
                    </Grid>
                </Grid>
            </Paper>
        </React.Fragment>
    )
}

export default TweetsContainer
