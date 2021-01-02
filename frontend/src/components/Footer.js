import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import LinkedIn from '@material-ui/icons/LinkedIn';
import GitHub from '@material-ui/icons/GitHub';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.text.secondary,
        padding: 5,
        overflow: "auto",
        width: "100%",
    },
    content: {
        float: "right",
    },
    white: {
        color: theme.palette.text.secondary,
    },
}));

export default function Header() {
    const classes = useStyles();

    return (
        <footer className={classes.root}>
            <div className={classes.content}>
                <IconButton href="http://CurtisHaynes.net">
                    <Typography className={classes.white}>Curtis Haynes</Typography>
                </IconButton>
                <IconButton href="https://www.linkedin.com/in/curtis-haynes-b608b015b/" className={classes.white}>
                    <LinkedIn />
                </IconButton>
                <IconButton href="https://github.com/CCHaynes112" className={classes.white}>
                    <GitHub />
                </IconButton>
            </div>
        </footer>
    );
}