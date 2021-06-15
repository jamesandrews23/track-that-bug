import React, {useEffect, useState} from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Avatar from "@material-ui/core/Avatar";
import EditIcon from '@material-ui/icons/Edit';

export default function UserDrawer(props) {
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        if(userName == null){
            fetch("/getUserInfo")
                .then(response => response.json())
                .then(data => {
                    if(data){
                        setUserName(data.userName);
                    }
                });
        }
    });

    const list = () => (
        <div
            role="presentation"
        >
            <List>
                <ListItem button key={"0"}>
                    <ListItemIcon>
                        <Avatar aria-label="userAvatar">
                            {userName != null && userName.charAt(0).toUpperCase()}
                        </Avatar>
                    </ListItemIcon>
                    <ListItemText>{userName}</ListItemText>
                </ListItem>
                <ListItem button key={"1"}>
                    <ListItemIcon>
                        <EditIcon />
                    </ListItemIcon>
                    <ListItemText>Update Profile</ListItemText>
                </ListItem>
            </List>
            <Divider />
        </div>
    );

    return (
        <div>
            <React.Fragment>
                <Drawer anchor="right" open={props.isOpen} onClose={() => props.toggleDrawer("right", false)}>
                    {list()}
                </Drawer>
            </React.Fragment>
        </div>
    );
}
