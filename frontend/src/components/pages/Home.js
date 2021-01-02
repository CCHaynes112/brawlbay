import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

import TopEight from '../TopPlayers';
import PlayerSearchBar from '../PlayerSearchBar';

import bannerImg from '../assets/img/Brawlbay_Banner_Gradient_lighter.jpg';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: 70,
        minHeight: "100vh",
    },
    banner: {
        marginTop: 20,
        marginBottom: 20,
        textAlign: "center",
        "& img": {
            width: "100%",
        },

    },
    searchBar: {
        position: "relative",
        margin: "auto",
        top: -100,
        width: "60%",
    },
}));

export default function Home() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Container maxWidth="xl">
                <Paper className={classes.banner}>
                    <img src={bannerImg} alt="Banner" />
                    <div className={classes.searchBar}>
                        <PlayerSearchBar />
                    </div>
                </Paper>
                <TopEight />
            </Container>
        </div>
    );
}