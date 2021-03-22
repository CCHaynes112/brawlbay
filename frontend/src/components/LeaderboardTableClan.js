import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import theme from '../theme';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableHeader: {
    backgroundColor: theme.palette.primary.main,
  },
  tableHeaderText: {
    color: theme.palette.text.secondary,
  },
});

export default function LeaderboardTableClan(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead className={classes.tableHeader} >
          <TableRow>
            <TableCell className={classes.tableHeaderText}>Rank</TableCell>
            <TableCell className={classes.tableHeaderText}>Name</TableCell>
            <TableCell className={classes.tableHeaderText}>Join Date</TableCell>
            <TableCell className={classes.tableHeaderText}>Xp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.clan.map((player, key) => (
            <TableRow key={key}>
              <TableCell>{player.rank}</TableCell>
              <TableCell>
                <Link component={RouterLink} to={'/players/' + player.brawlhalla_id}>{player.name}</Link>
              </TableCell>
              <TableCell>{player.join_date}</TableCell>
              <TableCell>{player.xp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
