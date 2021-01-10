import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';


const useStyles = makeStyles(theme => ({
    card: {
        width: 200,
        textAlign: "left",
        margin: "auto",
    },
    media: {
        width: "100%",
        height: 350,
    },
    cardcontent: {
        padding: 6,
        "&:last-child": {
            paddingBottom: 6
        }
    }
}));

export default function LegendCard(props) {
    const classes = useStyles();

    return (
        <Link component={RouterLink} to={"/legends/" + props.legendID} underline="none">
            <Card elevation={2} className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={props.legendImg}
                    title="LegendImg"
                />
                <CardContent className={classes.cardcontent}>
                    <Typography gutterBottom variant="h6">{props.name}</Typography>
                    <Typography gutterBottom variant="caption">{props.title}</Typography>
                </CardContent>
            </Card>
        </Link>
    );
}