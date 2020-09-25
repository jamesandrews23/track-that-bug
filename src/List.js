import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BugReportIcon from '@material-ui/icons/BugReport';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import {Link} from "react-router-dom";

export const mainListItems = (
    <div>
            <ListItem button component={Link} to={'/dashboard'}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} to={'/addBug'}>
                    <ListItemIcon>
                        <NoteAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Bug"/>
            </ListItem>
            <ListItem button component={Link} to={'/bugReport'}>
                <ListItemIcon>
                    <BugReportIcon />
                </ListItemIcon>
                <ListItemText primary="Bug Report" />
            </ListItem>
            <ListItem button component={Link} to={'/teams'}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Teams" />
            </ListItem>
        {/*<ListItem button>*/}
        {/*    <ListItemIcon>*/}
        {/*        <BarChartIcon />*/}
        {/*    </ListItemIcon>*/}
        {/*    <ListItemText primary="Reports" />*/}
        {/*</ListItem>*/}
        {/*<ListItem button>*/}
        {/*    <ListItemIcon>*/}
        {/*        <LayersIcon />*/}
        {/*    </ListItemIcon>*/}
        {/*    <ListItemText primary="Integrations" />*/}
        {/*</ListItem>*/}
    </div>
);

export const secondaryListItems = (
    <div>
        {/*<ListSubheader inset>Saved reports</ListSubheader>*/}
        {/*<ListItem button>*/}
        {/*    <ListItemIcon>*/}
        {/*        <AssignmentIcon />*/}
        {/*    </ListItemIcon>*/}
        {/*    <ListItemText primary="Current month" />*/}
        {/*</ListItem>*/}
        {/*<ListItem button>*/}
        {/*    <ListItemIcon>*/}
        {/*        <AssignmentIcon />*/}
        {/*    </ListItemIcon>*/}
        {/*    <ListItemText primary="Last quarter" />*/}
        {/*</ListItem>*/}
        {/*<ListItem button>*/}
        {/*    <ListItemIcon>*/}
        {/*        <AssignmentIcon />*/}
        {/*    </ListItemIcon>*/}
        {/*    <ListItemText primary="Year-end sale" />*/}
        {/*</ListItem>*/}
    </div>
);