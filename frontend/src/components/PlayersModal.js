import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import {PlayerClient} from "../api_agent";


const useStyles = makeStyles(theme => ({
    progressBar: {
        padding: 20,
        textAlign: "center"
    },
}));


export default function PlayersModal(props) {
    const classes = useStyles();
    const history = useHistory();

    const { playerToSearch, onClose, open } = props;

    const handleEnter = () => {
        getPlayers();
    }

    const handleClose = () => {
        onClose();
    };

    const handleListItemClick = value => {
        history.push("/players/" + value.brawlhalla_id);
        onClose(value);
    };

    const [playersArray, setPlayersArray] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadError, setLoadError] = useState(null);



    function getPlayers() {
        PlayerClient.search({player: playerToSearch})
            .then(res => {
                setIsLoaded(true);
                let players = res.data.players;
                if (Array.isArray(players)) {
                    setPlayersArray(players);
                }
                else {
                    setPlayersArray([players]);
                }
            })
            .catch(error => {
                setLoadError(error.data);
            })
    }

    let playersListElement;
    if (!isLoaded) {
        playersListElement = (<div className={classes.progressBar}><CircularProgress /></div>)
    }

    else if (loadError) {
        playersListElement = (<Typography>Error: {loadError}</Typography>)
    }

    else {
        playersListElement = (
            <List>
                {
                    playersArray.map((player, key) => (
                        <div key={key}>
                            <ListItem button onClick={() => handleListItemClick(player)}>
                                <ListItemIcon>
                                    <AccountCircleIcon fontSize="large" />
                                </ListItemIcon>
                                <ListItemText primary={player.name} />
                                <ListItemText primary={player.region} style={{ textAlign: "right" }} />
                            </ListItem>
                            <Divider />
                        </div>
                    ))}
            </List>
        )
    }

    return (
        <Dialog onEnter={handleEnter} onClose={handleClose} open={open} fullWidth={true} maxWidth="sm" className={classes.modal}>
            <DialogTitle>Players matching '{playerToSearch}'</DialogTitle>
            {playersListElement}
        </Dialog>
    );
}