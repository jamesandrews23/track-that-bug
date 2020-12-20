import React, {useEffect} from 'react';
import axios from 'axios';
import Link from '@material-ui/core/Link';
import { useHistory } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";

export default function YourBugs(props){
    const [userIssues, setUserIssues] = React.useState([]);
    const history = useHistory();
    const [noBugs, setNoBugs] = React.useState(false);

    const runBugSearch = (issueNum) => {
        axios.get('/getIssue/'+issueNum)
            .then(response => {
                if(response.data.payload){
                    history.push("/bugs");
                    props.setBugState(response.data.payload);
                    props.setAlert({...alert, message: ""});
                } else {
                    props.setAlert({message: "Bug not found", severity: "error"});
                    props.setBugState({
                        title: "",
                        assignedTo: "",
                        description: "",
                        status: ""
                    });
                }
            })
            .catch(error => {
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
                    ? <ul>
                        {
                            userIssues.map((issue) => (
                                <React.Fragment>
                                    <li>
                                        <Link href={"#"} onClick={() => runBugSearch(issue.issueNumber)}>{issue.issueNumber}</Link>
                                    </li>
                                </React.Fragment>
                            ))
                        }
                    </ul>
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