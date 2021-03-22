import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    marginTop: 100,
    textAlign: 'center'
  }
})

export default function LeaderboardTable2v2 () {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant="h3">Oops, page not found.</Typography>
    </div>
  )
}
