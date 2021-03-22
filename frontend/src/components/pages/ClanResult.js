import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import ContentHeader from '../ContentHeader';
import ClanOverviewCard from '../ClanOverviewCard';
import PlayerCard from '../PlayerCard';
import LeaderboardTableClan from '../LeaderboardTableClan';

import headerImg from '../assets/img/maps/ShipPirate.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 60,
  },
  mainContainer: {
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  overviewContainer: {
    marginTop: -200,
  },
  overviewItems: {
    padding: 10,
    margin: 'auto',
  },
  topPlayersContainer: {
    marginTop: 10,
    justifyContent: 'space-evenly',
  },
  clanMembers: {
    marginTop: 10,
    justifyContent: 'space-evenly',
  },
}));

export default function ClanResult(props) {
  const classes = useStyles();
  const [clanObj, setClanObj] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [top4Players, setTop4Players] = useState([]);

  let page = (<p>Loading...</p>);

  function getTop4PlayerIDs(arr) {
    const ids = [];
    if (arr.clan.length > 4) {
      arr.clan.slice(0, 5).forEach((player) => {
        ids.push(player.brawlhalla_id);
      });
    } else {
      arr.clan.forEach((player) => {
        ids.push(player.brawlhalla_id);
      });
    }
    return ids;
  }

  useEffect(() => {
    axios.get('http://localhost:8000/api/clan', {
      params: {
        clan: props.match.params.id,
      },
    })
        .then((res) => {
          const ids = getTop4PlayerIDs(res.data.players);
          setClanObj(res.data.players);
          axios.get('http://localhost:8000/api/players', {
            params: {
              players: ids,
            },
          })
              .then((res) => {
                setTop4Players(res.data.players);
                setIsLoaded(true);
              })
              .catch((error) => {
                console.log('Error');
                console.log(error.data);
              });
        })
        .catch((error) => {
          console.log('Error');
          console.log(error.data);
        });
  }, [props.match.params.id]);

  if (isLoaded) {
    page = (<div className={classes.root}>
      <ContentHeader profile headerImg={headerImg} />
      <Container maxWidth="xl" className={classes.mainContainer}>
        <Grid container>
          <Grid item lg={2} container className={classes.overviewContainer}>
            <Grid item lg={12} className={classes.overviewItems}>
              <ClanOverviewCard
                clanName={clanObj.clan_name}
                formed={clanObj.clan_create_date}
                xp={clanObj.clan_xp}
              />
            </Grid>
          </Grid>
          <Grid item lg={10} container className={classes.topPlayersContainer}>
            {
              top4Players.map((player, key) =>
                <Grid item key={key}>
                  <PlayerCard
                    playerID={player.brawlhalla_id}
                    legendImg={require(`../assets/img/legend_art/${player.legends[0].legend_id}.png`)}
                    playerName={player.name}
                    playerRating={player.rating}
                    playerWins={player.wins}
                  />
                </Grid>,
              )
            }
          </Grid>
          <Grid item lg={12} container className={classes.topPlayersContainer}>
            <LeaderboardTableClan clan={clanObj.clan} className={classes.clanMembers} />
          </Grid>
        </Grid>
      </Container>
    </div>);
  }

  return (
    <div>
      {page}
    </div>
  );
}
