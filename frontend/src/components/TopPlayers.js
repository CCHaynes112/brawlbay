import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import PlayerCard from './PlayerCard';
import { PlayerClient } from '../api_agent'

import topCountImg from './assets/img/TopSix.png'

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: "2rem",
        paddingBottom: "2rem",
    },
    topPlayers: {
        width: "50%",
        marginBottom: 30,
    },
    cardContainer: {
        justifyContent: "space-around",
        alignItems: "center",
    },
}));

export default function TopPlayers() {
    const classes = useStyles();

    const [playerArray, setPlayerArray] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadError, setLoadError] = useState(null);

    let playersElement;

    useEffect(() => {
        PlayerClient.leaderboard({ playerCount: 6})
            .then(res => {
                setIsLoaded(true);
                setPlayerArray(res.data.players);
            })
            .catch(error => {
                setLoadError(error.data);
            })
    }, [isLoaded, isLoaded]);

    if (!isLoaded) {
        playersElement = (<CircularProgress />)
    }

    else if (loadError) {
        playersElement = (<Typography>Error: {loadError}</Typography>)
    }

    else {
        playersElement = playerArray.map((player, key) =>
            <Grid item key={key}>
                <PlayerCard
                    playerID={player.brawlhalla_id}
                    legendImg={require(`./assets/img/legend_art/${player.best_legend}.png`)}
                    playerName={player.name}
                    playerRating={player.rating}
                    playerWins={player.wins}
                />
            </Grid>
        )
    }

    return (
        <div className={classes.root}>
            <Grid container justify="center">
                <img src={topCountImg} className={classes.topPlayers} alt="TopPlayers" />
            </Grid>

            <Grid container spacing={1} className={classes.cardContainer}>
                {playersElement}
            </Grid>
        </div>
    );
}