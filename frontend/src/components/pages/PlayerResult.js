import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';

import RankedCard1v1 from '../RankedCard1v1';
import RankedCard2v2 from '../RankedCard2v2';
import ContentHeader from '../ContentHeader';
import PieChart from '../charts/PieChart';
import PlayerOverviewCard from '../PlayerOverviewCard';
import ClanCard from '../ClanCard';
import { PlayerClient } from '../../api_agent';

import headerImg from '../assets/img/maps/Ship.png';
import PlayerLegendAccordian from '../PlayerLegendAccordian';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: 60,
    },
    textCenter: {
        marginTop: 100,
        textAlign: "center",
    },
    mainContainer: {
        alignItems: "flex-start",
    },
    leftContainer: {
        marginTop: -200,
    },
    rightContainer: {
    },
    overviewItems: {
        padding: 10,
        margin: "auto",
    },
    rankedContainer: {
        margin: "auto",
        marginTop: 0,
        padding: 10,
    },
    winRateChart: {
        padding: 10,
        width: 260,
        height: "fit-content",
        margin: "auto",
        paddingBottom: 20,
    },
    clanCard: {
        width: 260,
        height: "fit-content",
        margin: "auto",
        paddingBottom: 20,
    },
}));

export default function PlayerResult(props) {
    const classes = useStyles();
    const [playerObj, setPlayerObj] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [failed, setFailed] = useState(false);

    let page = (
        <div className={classes.textCenter}>
            <CircularProgress />
        </div>
    )

    useEffect(() => {
        PlayerClient.get(props.match.params.id)
            .then(res => {
                setPlayerObj(res.data.player);
                setIsLoaded(true);
            })
            .catch(error => {
                setFailed(true);
            })
    }, [props.match.params.id]);

    if (failed) {
        page = (
            <div className={classes.textCenter}>
                <Typography variant="h3">Player not found.</Typography>
            </div>
        )
    }

    else if (isLoaded) {
        page = (<div className={classes.root}>
            <ContentHeader profile headerImg={headerImg} />
            <Container maxWidth="xl">
                <Grid container className={classes.mainContainer}>
                    <Grid item lg={3} container className={classes.leftContainer}>
                        <Grid item lg={12} className={classes.overviewItems}>
                            <PlayerOverviewCard
                                playerName={playerObj.name}
                                id={playerObj.brawlhalla_id}
                                legendImg={require(`../assets/img/legend_art/${playerObj.best_legend}.png`)}
                                level={playerObj.level}
                                xp={playerObj.xp}
                                rating={playerObj.ranked.rating}
                                region={playerObj.ranked.region}
                                games={playerObj.games}
                                wins={playerObj.wins}
                                losses={playerObj.games - playerObj.wins}
                            />
                        </Grid>
                        <Grid item lg={12} className={classes.overviewItems}>
                            <Paper className={classes.winRateChart}>
                                <Typography variant="h6">Total Win/Loss</Typography>
                                <Divider />
                                <PieChart
                                    labels={["Wins", "Losses"]}
                                    values={[playerObj.wins, playerObj.games - playerObj.wins]}
                                />
                            </Paper>
                        </Grid>
                        {playerObj.clan ? (<Grid item lg={12} className={classes.overviewItems}>
                            <ClanCard clanID={playerObj.clan.clan_id} clanName={playerObj.clan.clan_name} className={classes.clanCard} />
                        </Grid>) : null}
                    </Grid>
                    <Grid item lg={9} container className={classes.rightContainer}>
                        <Grid item sm={6} className={classes.rankedContainer}>
                            {
                                playerObj.ranked ? (<RankedCard1v1
                                    type="1v1"
                                    playerName={playerObj.ranked.name}
                                    rankedImg={require(`../assets/img/Rankings/${playerObj.ranked.tier.split(" ")[0]}.png`)}
                                    region={playerObj.ranked.region}
                                    rank={playerObj.ranked.tier}
                                    peakRating={playerObj.ranked.peak_rating}
                                    currentRating={playerObj.ranked.rating}
                                    games={playerObj.ranked.games}
                                    wins={playerObj.ranked.wins}
                                    losses={playerObj.ranked.games - playerObj.ranked.wins}
                                />) : (<RankedCard1v1 error={true} />)
                            }
                        </Grid>
                        <Grid item sm={6} className={classes.rankedContainer}>
                            {
                                playerObj.ranked.ranked_teams ? (
                                    <RankedCard2v2 teams={playerObj.ranked.ranked_teams} />
                                ) :
                                    (<RankedCard2v2 error={true} />)
                            }
                        </Grid>
                        <Grid item sm={12} className={classes.rankedContainer}>
                            <PlayerLegendAccordian legends={playerObj.legends} />
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>)
    }

    return (
        <div>
            {page}
        </div>
    );
}