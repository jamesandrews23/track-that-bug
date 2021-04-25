import React from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BugReportIcon from '@material-ui/icons/BugReport';
import {Link} from "react-router-dom";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import { useLocation } from "react-router-dom";

export default function MainListItems() {
    const location = useLocation();

    return (
        <MenuList>
            <MenuItem button component={Link} to={'/dashboard'} selected={location.pathname.includes('dashboard')}>
                <ListItemIcon>
                    <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary="Dashboard"/>
            </MenuItem>
            <MenuItem button component={Link} to={'/bugs'} selected={location.pathname.includes('bugs')}>
                <ListItemIcon>
                    <BugReportIcon/>
                </ListItemIcon>
                <ListItemText primary="Bugs"/>
            </MenuItem>
            <MenuItem button component={Link} to={'/teams'} selected={location.pathname.includes('teams')}>
                <ListItemIcon>
                    <PeopleIcon/>
                </ListItemIcon>
                <ListItemText primary="Teams"/>
            </MenuItem>
        </MenuList>
    );
}