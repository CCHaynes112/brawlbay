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

import headerImg from './assets/img/maps/Statue.jpg'

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

export default function ClanOverviewCard (props) {
  const classes = useStyles()

  return (
    <Card elevation={2} className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        classes={{
          title: classes.title,
          subheader: classes.subheader
        }}
        title={props.clanName}
      />
      <CardMedia
        className={classes.media}
        image={headerImg}
        title='ClandImg'
      />
      <CardContent className={classes.cardcontent}>
        <Typography variant='h6'>Overview</Typography>
        <Divider light />
        <Grid container className={classes.content}>
          <Grid item lg={6} className={classes.rankFields}>
            <Typography variant='body1'>Formed</Typography>
            <Typography variant='body1'>XP</Typography>
          </Grid>
          <Grid item lg={6} className={classes.rankValues}>
            <Typography variant='body1'>{props.formed}</Typography>
            <Typography variant='body1'>{props.xp}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

ClanOverviewCard.propTypes = {
  clanName: PropTypes.string,
  formed: PropTypes.number,
  xp: PropTypes.number
}
