import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {AttachFile} from "@material-ui/icons";
import {DateTime} from "luxon";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(2)
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

const parseDate = (date) => {
    // let localTime = DateTime.local();
    let postedTime = DateTime.fromISO(date);
    console.log("parsed");
    return postedTime.toLocaleString(DateTime.DATETIME_FULL);
}

export default function CommentCard(props) {
    const classes = useStyles();

    const openAttachment = () => {
        axios({
            url: '/getAttachment/' + props.issueNumber + "/" + props.id,
            method: 'GET',
            responseType: 'blob', // Important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', ''); //or any other extension
            document.body.appendChild(link);
            link.click();
        });
    }

    return (
        <Card className={classes.root} variant={"outlined"}>
            <CardHeader
                avatar={
                    <Avatar aria-label="userAvatar" className={classes.avatar}>
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={parseDate(props.date)}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.commentMessage}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                {
                    props.attachment &&
                        <IconButton aria-label="file attachment" onClick={openAttachment}>
                            <AttachFile />
                        </IconButton>
                }
            </CardActions>
        </Card>
    );
}
