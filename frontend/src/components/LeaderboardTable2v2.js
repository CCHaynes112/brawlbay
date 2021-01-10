import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import theme from '../theme';

import { PlayerClient } from '../api_agent';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    tableHeader: {
        backgroundColor: theme.palette.primary.main,
    },
    tableHeaderText: {
        color: theme.palette.text.secondary,
    }
});

export default function LeaderboardTable2v2() {
    const classes = useStyles();
    const [pageNumber, setPageNumber] = useState(1);
    const [teamArray, setTeamArray] = useState([]);

    useEffect(() => {
        PlayerClient.leaderboard({
            bracket: "2v2",
            page_number: pageNumber
        })
            .then(res => {
                setTeamArray(res.data.players);
            })
            .catch(error => {
                console.log(error.data);
            })
    }, [pageNumber]);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table}>
                <TableHead className={classes.tableHeader} >
                    <TableRow>
                        <TableCell className={classes.tableHeaderText}>Rank</TableCell>
                        <TableCell className={classes.tableHeaderText}>Player 1</TableCell>
                        <TableCell className={classes.tableHeaderText}>Player 2</TableCell>
                        <TableCell className={classes.tableHeaderText}>Winrate</TableCell>
                        <TableCell className={classes.tableHeaderText}>Rating</TableCell>
                        <TableCell className={classes.tableHeaderText}>Peak Rating</TableCell>
                        <TableCell className={classes.tableHeaderText}>Tier</TableCell>
                        <TableCell className={classes.tableHeaderText}>Region</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {teamArray.map((team, key) => (
                        <TableRow key={key}>
                            <TableCell>{team.rank}</TableCell>
                            <TableCell>
                                <Link component={RouterLink} to={"/players/" + team.brawlhalla_id_one}>{team.teamname.split("+")[0]}</Link>
                            </TableCell>
                            <TableCell>
                                <Link component={RouterLink} to={"/players/" + team.brawlhalla_id_two}>{team.teamname.split("+")[1]}</Link>
                            </TableCell>
                            <TableCell>{Math.round((team.wins / team.games) * 100) + "%"}</TableCell>
                            <TableCell>{team.rating}</TableCell>
                            <TableCell>{team.peak_rating}</TableCell>
                            <TableCell>{team.tier}</TableCell>
                            <TableCell>{team.region}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div style={{ float: "right" }}>
                {
                    pageNumber > 1 ?
                        (
                            <span>
                                <Button onClick={() => { setPageNumber(1) }} color="primary">Top</Button>
                                <Button onClick={() => { setPageNumber(pageNumber - 1) }} color="primary">Previous</Button>
                            </span>
                        )
                        : null
                }
                <Button onClick={() => { setPageNumber(pageNumber + 1) }} color="primary">Next</Button>
            </div>
        </TableContainer>
    );
}