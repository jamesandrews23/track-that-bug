import React from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BugReportIcon from '@material-ui/icons/BugReport';
import {Link} from "react-router-dom";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";

export default function MainListItems() {
    const [selected, setSelected] = React.useState(0);

    return (
        <MenuList>
            <MenuItem button component={Link} to={'/dashboard'} selected={selected === 0} onClick={() => setSelected(0)}>
                <ListItemIcon>
                    <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary="Dashboard"/>
            </MenuItem>
            <MenuItem button component={Link} to={'/bugs'} selected={selected === 1} onClick={() => setSelected(1)}>
                <ListItemIcon>
                    <BugReportIcon/>
                </ListItemIcon>
                <ListItemText primary="Bugs"/>
            </MenuItem>
            <MenuItem button component={Link} to={'/teams'} selected={selected === 2} onClick={() => setSelected(2)}>
                <ListItemIcon>
                    <PeopleIcon/>
                </ListItemIcon>
                <ListItemText primary="Teams"/>
            </MenuItem>
        </MenuList>
    );
}