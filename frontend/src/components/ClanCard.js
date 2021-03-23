import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Divider from '@material-ui/core/Divider'

import headerImg from './assets/img/maps/Statue.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 260,
    textAlign: 'left',
    margin: 'auto'
  },
  media: {
    width: '100%',
    height: 150
  },
  cardContent: {
    padding: 10,
    '&:last-child': {
      paddingBottom: 6
    }
  }
}))

export default function ClanCard (props) {
  const classes = useStyles()

  return (
    <Link component={RouterLink} to={'/clans/' + props.clanID} underline='none'>
      <Card elevation={2} className={classes.root}>
        <CardMedia
          className={classes.media}
          image={headerImg}
          title='ClanImg'
        />
        <CardContent className={classes.cardcontent}>
          <Typography variant='h6'>Clan</Typography>
          <Divider light />
          <Typography variant='body1'>{props.clanName}</Typography>
        </CardContent>
      </Card>
    </Link>
  )
}

ClanCard.propTypes = {
  clanID: PropTypes.number,
  clanName: PropTypes.string
}
