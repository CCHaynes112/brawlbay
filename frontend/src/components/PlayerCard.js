import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';


const useStyles = makeStyles(theme => ({
    root: {

    },
    card: {
        width: 225,

    },
    media: {
        width: "100%",
        height: 275,
    },
}));

export default function PlayerCard(props) {
    const classes = useStyles();

    return (
        <Link href={"/players/" + props.playerID} underline="none">
            <Card elevation={2} className={classes.card}>
                <CardActionArea>
                    {props.legendImg != null &&
                        <CardMedia
                            className={classes.media}
                            image={props.legendImg}
                            title="LegendImg"
                        />}

                    <CardContent>
                        <Typography noWrap={true} gutterBottom variant="h5">{props.playerName}</Typography>
                        <Typography variant="body2">Rating: {props.playerRating}</Typography>
                        <Typography variant="body2">{props.playerRegion}</Typography>
                        <Typography variant="body2">Wins: {props.playerWins}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    );
}