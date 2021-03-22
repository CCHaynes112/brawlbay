import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles((theme) => ({
  root: {

  },
  paper: {
    width: '100%',
    height: '17rem',
    overflow: 'auto',
  },

  content: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
  },
  imgContainer: {
    margin: 'auto',
    paddingRight: 10,
  },
  rankImg: {
    width: '100%',
  },

  rankFields: {
    textAlign: 'left',
  },

  rankValues: {
    textAlign: 'right',
  },
  no1v1: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '15rem',
    overflow: 'auto',
  },
}));


export default function RankedCard2v2(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {
                props.error ? (
                    <Paper className={classes.no1v1}>
                      <Typography variant="h6">Oops, no 1v1 data...</Typography>
                    </Paper>
                ) :
                    (
                        <Paper className={classes.paper}>
                          <Grid container className={classes.content}>
                            <Grid item>
                              <Typography variant="h6">{props.playerName}</Typography>
                            </Grid>
                            <Grid item>
                              <Typography variant="subtitle1">Rank {props.type}</Typography>
                            </Grid>
                          </Grid>
                          <Divider light />
                          <Grid container className={classes.content}>
                            <Grid className={classes.imgContainer} item lg={4}>
                              <img src={props.rankedImg} alt="Rank" className={classes.rankImg} />
                            </Grid>
                            <Grid item lg={5} className={classes.rankFields}>
                              <Typography variant="body1">Region</Typography>
                              <Typography variant="body1">Rank</Typography>
                              <Typography variant="body1">Peak Rating</Typography>
                              <Typography variant="body1">Current Rating</Typography>
                              <Typography variant="body1">Games</Typography>
                              <Typography variant="body1">Wins</Typography>
                              <Typography variant="body1">Losses</Typography>
                            </Grid>
                            <Grid item lg={3} className={classes.rankValues}>
                              <Typography variant="body1">{props.region}</Typography>
                              <Typography variant="body1">{props.rank}</Typography>
                              <Typography variant="body1">{props.peakRating}</Typography>
                              <Typography variant="body1">{props.currentRating}</Typography>
                              <Typography variant="body1">{props.games}</Typography>
                              <Typography variant="body1">{props.wins}</Typography>
                              <Typography variant="body1">{props.losses}</Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                    )
      }

    </div>
  );
}
