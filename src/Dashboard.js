import React from 'react';
import clsx from 'clsx';
import { makeStyles, fade } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MainListItems from './List';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import BugsForm from "./BugsForm";
import Teams from "./Teams";
import Overview from './Overview';
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import PersonIcon from '@material-ui/icons/Person';
import UserDrawer from "./components/UserDrawer";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    grow: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function Dashboard() {
    const defaultBugState = {
        title: "",
        assignedTo: "",
        description: "",
        status: "",
        lastModifiedBy: "",
        lastModifiedDate: "",
        comment: "",
        comments: [],
        issueNumber: ""
    }
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [bugState, setBugState] = React.useState(defaultBugState);
    const [alert, setAlert] = React.useState({
        message: "",
        severity: "success"
    });
    const [backdropOpen, setBackdropOpen] = React.useState(false);
    const [userDrawerOpen, setUserDrawerOpen] = React.useState(false);

    const runBugSearch = (issueNum) => {
        setBackdropOpen(true);
        axios.get('/getIssue/'+issueNum)
            .then(response => {
                setBackdropOpen(false);
                if(response.data.payload){
                    history.push("/addBug");
                    setBugState(response.data.payload);
                    setAlert({...alert, message: ""});
                } else {
                    setAlert({message: "Bug not found", severity: "error"});
                    setBugState(defaultBugState);
                }
            })
            .catch(error => {
                setBackdropOpen(false);
                console.log(error);
            });
    }

    const handleIssueSearch = (e, history) => {
        if(e.key === "Enter"){
            runBugSearch(e.target.value);
        }
    };

    const handleClearBugForm = () => {
        setAlert({...alert, message: ""});
        setBugState(defaultBugState);
    };

    const toggleUserDrawer = (event, open) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setUserDrawerOpen(open);
    }

    // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <Router>
            <div className={classes.root}>
                <Backdrop className={classes.backdrop} open={backdropOpen} onClick={() => setBackdropOpen(false)}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <CssBaseline />
                <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => setOpen(true)}
                            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                            Track that Bug
                        </Typography>
                        <div className={classes.grow} />
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <Route render={({history}) => (
                                <InputBase
                                    placeholder="Bug Number"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                    onKeyPress={(e) => handleIssueSearch(e, history)}
                                />
                            )}
                            />
                        </div>
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton color="inherit" onClick={(e) => toggleUserDrawer(e,true)}>
                            <PersonIcon />
                        </IconButton>
                        <IconButton color="inherit" onClick={ () => window.location.href = "/logout" }>
                            <ExitToAppIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <UserDrawer toggleDrawer={toggleUserDrawer} isOpen={userDrawerOpen} />
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={() => setOpen(false)}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <MainListItems />
                    </List>
                    <Divider />
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                            <Switch>
                                <Route path="/dashboard">
                                    <Overview setBugState={setBugState} setAlert={setAlert} setBackdropOpen={setBackdropOpen} />
                                </Route>
                                <Route path="/bugs">
                                    <BugsForm
                                        state={bugState}
                                        setState={setBugState}
                                        alert={alert}
                                        setAlert={setAlert}
                                        handleClearBugForm={handleClearBugForm}
                                    />
                                </Route>
                                <Route path="/teams">
                                    <Teams />
                                </Route>
                            </Switch>
                        </Grid>
                        <Box pt={4}>
                            <Copyright />
                        </Box>
                    </Container>
                </main>
            </div>
        </Router>
    );
}