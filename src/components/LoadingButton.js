import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    wrapper: {
        margin: theme.spacing(0, 1, 0, 0),
        position: 'relative',
    },
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

    return (
        <span className={classes.wrapper}>
            <Button
                {...props}
                disabled={props.loading === "true"}
                onClick={props.onClick}
            >
                {props.children}
            </Button>
            {props.loading === "true" ? <CircularProgress size={24} className={classes.buttonProgress} /> : undefined}
        </span>
    )
}

LoadingButton.propTypes = {
    loading: PropTypes.string
}