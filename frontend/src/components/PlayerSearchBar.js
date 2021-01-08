import React from 'react';

import ReactGA from 'react-ga';

import { fade, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';

import PlayersModal from './PlayersModal';


const useStyles = makeStyles(theme => ({
    searchLabel: {
        color: theme.palette.text.primary,
    },
    searchBar: {
        width: "100%",
    },

    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
}));

export default function PlayerSearchBar(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [playerName, setPlayerName] = React.useState("");

    const handleTextChange = (event) => {
        setPlayerName(event.target.value)
    }

    const handleClickOpen = () => {
        ReactGA.event({
            category: "Player Search",
            action: "User pressed the player search button",
          });
        setOpen(true);
    };

    const handleClose = value => {
        setOpen(false);
    };

    let searchBarElement;

    if (props.filled) {
        searchBarElement = (
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && playerName.length > 0) {
                            handleClickOpen();
                        }
                    }}
                    value={playerName} onChange={handleTextChange}
                />
            </div>
        );
    }

    else {
        searchBarElement = (
            <FormControl className={classes.searchBar}>
                <InputLabel className={classes.searchLabel}>Search...</InputLabel>
                <Input onKeyDown={(e) => {
                    if (e.key === "Enter" && playerName.length > 0) {
                        handleClickOpen();
                    }
                }}
                    value={playerName} onChange={handleTextChange} endAdornment={
                        <InputAdornment position="end">
                            <IconButton onClick={handleClickOpen}>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        );
    }

    return (
        <div>
            {searchBarElement}
            <PlayersModal playerToSearch={playerName} open={open} onClose={handleClose} />
        </div>
    );
}