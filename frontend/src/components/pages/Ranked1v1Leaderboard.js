import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import ContentHeader from '../ContentHeader';
import LeaderboardTable from '../LeaderboardTable1v1';

import headerImg from '../assets/img/maps/Stadium.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 60,
  },
  container: {
    marginBottom: 30,
  },
}));

export default function Ranked1v1Leaderboard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ContentHeader title="Ranked 1v1 Leaderboards" headerImg={headerImg} />
      <Container className={classes.container} maxWidth="xl">
        <LeaderboardTable />
      </Container>
    </div >
  );
}
