import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import ContentHeader from '../ContentHeader';

import headerImg from '../assets/img/maps/13 - qCo0Jbj.jpg';
import tinRank from '../assets/img/Rankings/Tin.png';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: 60,
    },
    paper: {
        padding: 40,
        textAlign: "center"
    },
    gridContainer: {
        justifyContent: "center",
        marginTop: 50,
    },
    img: {
        width: "100%",
    },
    form: {
        display: "grid",
        width: "80%",
        margin: "auto",
    },
    textField: {
        color: theme.palette.text.primary,
    },
    button: {
        color: theme.palette.text.secondary,
        width: "30%",
        margin: 30,
    },
}));

export default function Home() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ContentHeader title="Contact" headerImg={headerImg} />
            <Container maxWidth="md">
                <Paper className={classes.paper}>
                    <Typography variant="body1">
                        Please feel free to shoot me a message if you have any questions or comments!
                    </Typography>
                    <Grid container className={classes.gridContainer}>
                        <Grid item sm={3}>
                            <img className={classes.img} src={tinRank} alt="Tin" />
                        </Grid>
                        <Grid item sm={9}>
                            <form noValidate className={classes.form}>
                                <TextField
                                    InputLabelProps={{
                                        className: classes.textField
                                    }}
                                    label="Name"
                                />
                                <TextField
                                    InputLabelProps={{
                                        className: classes.textField
                                    }}
                                    label="Email"
                                />
                                <TextField
                                    InputLabelProps={{
                                        className: classes.textField
                                    }}
                                    label="Subject"
                                />
                                <TextField
                                    InputLabelProps={{
                                        className: classes.textField
                                    }}
                                    label="Message"
                                />
                                <Button className={classes.button} variant="contained" color="secondary">Submit</Button>
                            </form>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </div >
    );
}