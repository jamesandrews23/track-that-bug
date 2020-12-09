import React, {useEffect} from 'react';
import axios from 'axios';

export default function YourBugs(){
    const [userIssues, setUserIssues] = React.useState([]);

    const getYourBugs = () => {
        axios.get("/byUser", {}, )
            .then(rs => {
                console.log(rs);
                setUserIssues(rs.data.payload);
            })
    }

    useEffect(()=> {
        getYourBugs();
    }, []);

    return (
        <ul>
            {
                userIssues.map((issue) => (
                    <React.Fragment>
                        <li>
                            <a href={"/getIssue/" + issue.issueNumber}>{issue.issueNumber}</a>
                        </li>
                    </React.Fragment>
                ))
            }
        </ul>
    )
}