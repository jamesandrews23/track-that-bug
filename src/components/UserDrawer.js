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

export default function UserDrawer(props) {
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        fetch("/getUserInfo")
            .then(response => response.json())
            .then(data => {
                if(data){
                    setUserName(data.userName);
                }
            });
    });

    const list = () => (
        <div
            role="presentation"
        >
            <List>
                <ListItem button key={"0"}>
                    <ListItemIcon>
                        <Avatar aria-label="userAvatar">
                            R
                        </Avatar>
                    </ListItemIcon>
                    <ListItemText>{userName}</ListItemText>
                </ListItem>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
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
