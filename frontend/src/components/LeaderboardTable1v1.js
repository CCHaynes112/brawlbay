import React, { useEffect, useState } from 'react';
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

export default function LeaderboardTable1v1() {
    const classes = useStyles();
    const [pageNumber, setPageNumber] = useState(1);
    const [playerArray, setPlayerArray] = useState([]);

    useEffect(() => {
        PlayerClient.leaderboard({
                bracket: "1v1",
                page_number: pageNumber
            })
            .then(res => {
                console.log(res.data.players)
                setPlayerArray(res.data.players);
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
                        <TableCell className={classes.tableHeaderText}>Name</TableCell>
                        <TableCell className={classes.tableHeaderText}>Winrate</TableCell>
                        <TableCell className={classes.tableHeaderText}>Rating</TableCell>
                        <TableCell className={classes.tableHeaderText}>Peak Rating</TableCell>
                        <TableCell className={classes.tableHeaderText}>Tier</TableCell>
                        <TableCell className={classes.tableHeaderText}>Region</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {playerArray.map((player, key) => (
                        <TableRow key={key}>
                            <TableCell>{player.rank}</TableCell>
                            <TableCell>
                                <Link href={"/players/" + player.brawlhalla_id}>{player.name}</Link>
                            </TableCell>
                            <TableCell>{Math.round((player.wins / player.games) * 100) + "%"}</TableCell>
                            <TableCell>{player.rating}</TableCell>
                            <TableCell>{player.peak_rating}</TableCell>
                            <TableCell>{player.tier}</TableCell>
                            <TableCell>{player.region}</TableCell>
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