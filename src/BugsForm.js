import React from 'react';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";
import {DropzoneArea} from "material-ui-dropzone";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import green from "@material-ui/core/colors/green";
import _ from 'lodash';

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        marginTop: theme.spacing(2),
        width: "100%"
    },
    alert: {
        marginBottom: theme.spacing(2),
        width: '100%',
        '& > * + *': {
            marginBottom: theme.spacing(2),
        },
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

export default function BugsForm(props){
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);


    const [files, setFiles] = React.useState();

    const handleChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;

        props.setState({...props.state, [name] : value});
    };

    const handleCreateIssue = function(e){
        e.preventDefault();
        setLoading(true);

        let form = new FormData();

        form.append("properties", new Blob([JSON.stringify(props.state)], {
            type: "application/json"
        }));

        files.forEach(file =>{
           form.append("files", file, file.name);
        });

        axios.post('/createIssue',
            form,
            {
                headers: {
                    'Content-Type' : undefined
                }
            })
            .then(response => {
                setLoading(false);
                props.setAlert({
                    message: "Bug " + response.data.payload.issueNumber + " created successfully.",
                    severity: "success"
                })
            })
            .catch(error => {
                setLoading(false);
                props.setAlert({
                    message: "An error has occurred. " + error.message,
                    severity: "error"
                })
            });
    }

    return (
        <form className={classes.form} noValidate onSubmit={handleCreateIssue}>
            {props.alert.message &&
                <div className={classes.alert}>
                    <Alert
                        onClose={() => props.setAlert({...props.alert, message: ""})}
                        severity={props.alert.severity}>
                        {props.alert.message}
                    </Alert>
                </div>
            }
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        autoComplete="off"
                        name="title"
                        variant="outlined"
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        autoFocus
                        onChange={handleChange}
                        value={props.state.title}
                    />
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="assignedTo">Assigned To</InputLabel>
                        <Select
                            labelId="assignedTo"
                            id="assignedTo"
                            onChange={handleChange}
                            value={props.state.assignedTo}
                            label="Assigned To"
                            fullWidth
                            name="assignedTo"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="james">James</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="status">Status</InputLabel>
                        <Select
                            labelId="status"
                            id="status"
                            value={props.state.status}
                            onChange={handleChange}
                            label="Status"
                            fullWidth
                            name="status"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="OPEN">Open</MenuItem>
                            <MenuItem value="CLOSED">Closed</MenuItem>
                            <MenuItem value="PENDING">Pending</MenuItem>
                            <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                            <MenuItem value="FIXED">Fixed</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        autoComplete="off"
                        name="description"
                        variant="outlined"
                        required
                        fullWidth
                        id="description"
                        label="Description"
                        onChange={handleChange}
                        value={props.state.description}
                        multiline
                        rows={10}
                    />
                </Grid>
                <Grid item xs={12}>
                    <DropzoneArea
                        onChange={(files) => setFiles(files)}
                    />
                </Grid>
            </Grid>
            <div className={classes.wrapper}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={loading}
                >
                    Add Bug
                </Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
        </form>
    );
}