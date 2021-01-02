import React from 'react';

import { Doughnut } from 'react-chartjs-2';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        textAlign: "center",
    },
    heading: {
        marginBottom: 10,
    },
}));

export default function DoughnutChart(props) {
    const classes = useStyles();
    const data = {
        labels: props.labels,
        datasets: [{
            data: props.values,
            backgroundColor: [
                'rgba(54, 162, 235, 0.4)',
                'rgba(255,99,132, 0.4)',
                'rgba(93, 75, 116, 0.4)',
                'rgb(242, 160, 11, 0.4)',
                'rgba(158, 205, 94, 0.4)'
            ],
            hoverBackgroundColor: [
                'rgba(54, 162, 235, 0.7)',
                'rgba(255,99,132, 0.7)',
                'rgba(93, 75, 116, 0.7)',
                'rgb(242, 160, 11, 0.7)',
                'rgba(158, 205, 94, 0.7)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255,99,132, 1)',
                'rgba(93, 75, 116, 1)',
                'rgb(242, 160, 11, 1)',
                'rgba(158, 205, 94, 1)'
            ],
        }]
    };

    const options = {
        legend: {
            display: false
        }
    };

    return (
        <div className={classes.root}>
            <Typography variant="subtitle1" className={classes.heading}>{props.title}</Typography>
            <Doughnut data={data} options={options} />
        </div>
    );
}