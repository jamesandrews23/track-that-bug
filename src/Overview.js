import React from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import DataCard from './components/DataCard.js';
import YourBugs from './components/YourBugs.js';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    fixedHeight: {
        height: 240,
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    }
}));

export default function Overview(props){
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12} md={8} lg={4}>
                <DataCard title="Your Bugs">
                    <YourBugs {...props} />
                </DataCard>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
                <DataCard title={"Fixed Bugs"} />
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
                <DataCard title={"Pending Bugs"} />
            </Grid>
        </Grid>
    );
}