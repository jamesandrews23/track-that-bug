import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    wrapper: {
        margin: theme.spacing(0, 1, 0, 0),
        position: 'relative',
    },
    // buttonSuccess: {
    //     backgroundColor: green[500],
    //     '&:hover': {
    //         backgroundColor: green[700],
    //     },
    // },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

export default function LoadingButton(props){
    const classes = useStyles();

    // const buttonClassname = clsx({
    //     [classes.buttonSuccess]: props.success,
    // });

    return (
        <span className={classes.wrapper}>
            <Button
                {...props}
                disabled={props.loading}
                onClick={props.onClick}
            >
                {props.children}
            </Button>
            {props.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </span>
    )
}