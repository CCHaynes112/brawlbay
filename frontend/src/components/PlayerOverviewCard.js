import PropTypes from 'prop-types'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles((theme) => ({
  card: {
    width: 260,
    textAlign: 'left',
    margin: 'auto'
  },
  cardHeader: {
    padding: 15,
    paddingTop: 7,
    paddingBottom: 7
  },
  title: {
    fontSize: 34
  },
  subheader: {
    color: 'black'
  },
  media: {
    width: '100%',
    height: 400
  },
  cardcontent: {
    padding: 10,
    '&:last-child': {
      paddingBottom: 6
    }
  },
  content: {
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between'
  },

  rankFields: {
    textAlign: 'left'
  },

  rankValues: {
    textAlign: 'right'
  }
}))

export default function ProfileOverviewCard (props) {
  const classes = useStyles()

  return (
    <Card elevation={2} className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        classes={{
          title: classes.title,
          subheader: classes.subheader
        }}
        title={props.playerName}
        subheader={'ID: ' + props.id}
      />
      <CardMedia
        className={classes.media}
        image={props.legendImg}
        title='LegendImg'
      />
      <CardContent className={classes.cardcontent}>
        <Typography variant='h6'>Overview</Typography>
        <Divider light />
        <Grid container className={classes.content}>
          <Grid item lg={6} className={classes.rankFields}>
            <Typography variant='body1'>Level</Typography>
            <Typography variant='body1'>XP</Typography>
            <Typography variant='body1'>Rating</Typography>
            <Typography variant='body1'>Region</Typography>
            <Typography variant='body1'>Games</Typography>
            <Typography variant='body1'>Wins</Typography>
            <Typography variant='body1'>Losses</Typography>
          </Grid>
          <Grid item lg={6} className={classes.rankValues}>
            <Typography variant='body1'>{props.level}</Typography>
            <Typography variant='body1'>{props.xp}</Typography>
            <Typography variant='body1'>{props.rating}</Typography>
            <Typography variant='body1'>{props.region}</Typography>
            <Typography variant='body1'>{props.games}</Typography>
            <Typography variant='body1'>{props.wins}</Typography>
            <Typography variant='body1'>{props.losses}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

ProfileOverviewCard.propTypes = {
  games: PropTypes.number,
  id: PropTypes.number,
  legendImg: PropTypes.string,
  level: PropTypes.number,
  losses: PropTypes.number,
  playerName: PropTypes.string,
  rating: PropTypes.number,
  region: PropTypes.string,
  wins: PropTypes.number,
  xp: PropTypes.number
}
