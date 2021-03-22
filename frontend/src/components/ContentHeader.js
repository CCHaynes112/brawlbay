import PropTypes from 'prop-types'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  root: {

  },
  imgConainer: {
    height: 255,
    overflow: 'hidden'
  },
  headerImg: {
    width: '100%'
  },
  title: {
    position: 'relative',
    margin: 'auto',
    bottom: 50,
    minWidth: 'fit-content',
    width: '40%',
    padding: 5,
    textAlign: 'center'
  }
}))

export default function ContentHeader (props) {
  const classes = useStyles()

  let headerContent
  if (!props.profile) {
    headerContent = (
      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.title}>
            <Typography variant="h2">{props.title}</Typography>
          </Paper>
        </Grid>
      </Grid>
    )
  }

  return (
    <div className={classes.root}>
      <div className={classes.imgConainer}>
        <img src={props.headerImg} className={classes.headerImg} alt="Header" />
      </div>
      {headerContent}
    </div>
  )
}

ContentHeader.propTypes = {
  headerImg: PropTypes.string,
  profile: PropTypes.bool,
  title: PropTypes.string
}
