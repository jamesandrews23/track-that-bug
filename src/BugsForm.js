import React from 'react';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";
import {DropzoneDialog} from "material-ui-dropzone";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Alert from "@material-ui/lab/Alert";
import green from "@material-ui/core/colors/green";
import LoadingButton from "./components/LoadingButton";
import Link from "@material-ui/core/Link";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';

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
    const [modifyLoading, setModifyLoading] = React.useState(false);
    const [files, setFiles] = React.useState();
    const [openAttachFile, setOpenAttachFile] = React.useState(false);

    const getForm = () => {
        let form = new FormData();

        form.append("properties", new Blob([JSON.stringify(props.state)], {
            type: "application/json"
        }));

        files.forEach(file =>{
            form.append("files", file, file.name);
        });

        return form;
    };

    const handleChange = event => {
        let value = event.target.value;
        let name = event.target.name;

        props.setState({...props.state, [name] : value});
    };

    const handleCreateIssue = e => {
        e.preventDefault();
        setLoading(true);

        let form = getForm();

        axios.patch('/saveIssue',
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
    };

    const handleModifyIssue = e => {
        e.preventDefault();
        setModifyLoading(true);

        let form = getForm();

        axios.patch('/modifyIssue',
            form,
            {
                headers: {
                    'Content-Type' : undefined
                }
            })
            .then(response => {
                setModifyLoading(false);
                props.setAlert({
                    message: "Bug " + response.data.payload.issueNumber + " modified successfully.",
                    severity: "success"
                })
            })
            .catch(error => {
                setModifyLoading(false);
                props.setAlert({
                    message: "An error has occurred. " + error.message,
                    severity: "error"
                })
            });
    };

    return (
        <form className={classes.form} noValidate>
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
                <Grid item xs={12}>
                    <LoadingButton
                        variant="contained"
                        color="primary"
                        loading={loading}
                        onClick={handleCreateIssue}
                        startIcon={<SaveIcon />}
                    >
                        Save
                    </LoadingButton>
                    <LoadingButton
                        variant="contained"
                        color="primary"
                        loading={modifyLoading}
                        onClick={handleModifyIssue}
                        startIcon={<EditIcon />}
                    >
                        Modify
                    </LoadingButton>
                    <Button
                        variant={"contained"}
                        color={"primary"}
                        onClick={() => setOpenAttachFile(true)}
                        startIcon={<AttachFileIcon />}
                    >
                        Attach File
                    </Button>
                    <Button
                        style={{float: "right"}}
                        variant="contained"
                        color="primary"
                    >
                        Clear
                    </Button>
                </Grid>
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
                    />
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
                <Grid item xs={12}>
                    <TextField
                        autoComplete="off"
                        name="comments"
                        variant="outlined"
                        fullWidth
                        id="comments"
                        label="Comments"
                        onChange={handleChange}
                        value={props.state.comments}
                        multiline
                        rows={4}
                        className={classes.formControl}
                    />
                    {
                        props.state.pathToAttachment
                            && <Link href={props.state.pathToAttachment}>{props.state.pathToAttachment}</Link>
                    }
                </Grid>
                <Grid item xs={12}>
                    <DropzoneDialog
                        cancelButtonText={"cancel"}
                        submitButtonText={"submit"}
                        maxFileSize={128000}
                        open={openAttachFile}
                        onClose={() => setOpenAttachFile(false)}
                        onSave={(files) => {
                            setFiles(files)
                            setOpenAttachFile(false);
                        }}
                        showPreviews={true}
                        showFileNamesInPreview={true}
                    />
                </Grid>
            </Grid>
        </form>
    );
}