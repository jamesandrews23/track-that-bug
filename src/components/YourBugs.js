import React, {useEffect} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import List from "@material-ui/core/List";
import BugReportIcon from "@material-ui/icons/BugReport";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";

export default function YourBugs(props){
    const [userIssues, setUserIssues] = React.useState([]);
    const history = useHistory();
    const [noBugs, setNoBugs] = React.useState(false);

    const runBugSearch = (issueNum) => {
        props.setBackdropOpen(true);
        axios.get('/getIssue/'+issueNum)
            .then(response => {
                props.setBackdropOpen(false);
                if(response.data.payload){
                    history.push("/bugs");
                    props.setBugState({...props.state, ...response.data.payload });
                    props.setAlert({...alert, message: ""});
                } else {
                    props.setAlert({message: "Bug not found", severity: "error"});
                    props.setBugState({...props.state,
                        title: "",
                        assignedTo: "",
                        description: "",
                        status: ""
                    });
                }
            })
            .catch(error => {
                props.setBackdropOpen(false);
                console.log(error);
            });
    }

    const getYourBugs = () => {
        axios.get("/byUser", {}, )
            .then(rs => {
                console.log(rs);
                if(rs.data.payload && rs.data.payload.length > 0){
                    setUserIssues(rs.data.payload);
                } else {
                    setNoBugs(true);
                }
            })
    }

    useEffect(()=> {
        getYourBugs();
    }, []);

    return (
        <React.Fragment>
            {
                userIssues.length > 0
                    ? <List dense>
                        {
                            userIssues.map((issue) => (
                                <ListItem>
                                    <IconButton onClick={() => runBugSearch(issue.issueNumber)}>
                                        <BugReportIcon />
                                    </IconButton>
                                    <ListItemText
                                        primary={issue.issueNumber + " : " + issue.title}
                                    />
                                </ListItem>
                            ))
                        }
                      </List>
                    : noBugs
                    ? <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Typography>
                            You do not have any bugs assigned to you.
                        </Typography>
                    </Grid>
                    : <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <CircularProgress />
                    </Grid>
            }
        </React.Fragment>
    )
}