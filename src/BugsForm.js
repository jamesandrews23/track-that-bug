import React from 'react';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";
import {DropzoneDialogBase} from "material-ui-dropzone";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Alert from "@material-ui/lab/Alert";
import green from "@material-ui/core/colors/green";
import LoadingButton from "./components/LoadingButton";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SaveIcon from '@material-ui/icons/Save';
import CommentCard from "./components/CommentCard";
import {AttachFile, Send} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from '@material-ui/icons/Send';
import Badge from "@material-ui/core/Badge";

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
    comment: {
        marginBottom: 0
    },
    grow: {
        flexGrow: 1,
    },
}));

export default function BugsForm(props){
    const classes = useStyles();
    const [loading, setLoading] = React.useState("false");
    const [files, setFiles] = React.useState([]);
    const [openAttachFile, setOpenAttachFile] = React.useState(false);

    const getForm = () => {
        let form = new FormData();

        form.append("properties", new Blob([JSON.stringify(props.state)], {
            type: "application/json"
        }));

        if(files){
            files.forEach(fileObj =>{
                form.append("files", fileObj.file, fileObj.file.name);
            });
        }

        return form;
    };

    const handleChange = event => {
        let value = event.target.value;
        let name = event.target.name;

        props.setState({...props.state, [name] : value});
    };

    const handleSaveIssue = () => {
        setLoading("true");

        let form = getForm();

        axios.patch('/saveIssue',
            form,
            {
                headers: {
                    'Content-Type' : undefined
                }
            })
            .then(response => {
                setLoading("false"); //reset state
                setFiles([]); //clear files for next save
                props.setAlert({
                    message: response.data.message,
                    severity: "success"
                })
                if(response.data.payload)
                    props.setState(response.data.payload);
            })
            .catch(error => {
                setLoading("false");
                props.setAlert({
                    message: "An error has occurred. " + error.message,
                    severity: "error"
                })
            });
    };

    const attachFile = (files) => {
        setOpenAttachFile(false);
    }

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
                        onClick={handleSaveIssue}
                        startIcon={<SaveIcon />}
                        size="small"
                    >
                        Save
                    </LoadingButton>
                    <Button
                        style={{float: "right"}}
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => props.handleClearBugForm()}
                    >
                        Clear
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        autoComplete="off"
                        name="issueNumber"
                        id="issueNumber"
                        label="Issue Number"
                        onChange={handleChange}
                        value={props.state.issueNumber}
                        disabled
                        size="small"
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        autoComplete="off"
                        name="title"
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        autoFocus
                        onChange={handleChange}
                        value={props.state.title}
                        size="small"
                        inputProps={{ tabIndex: "1" }}
                    />
                    <FormControl className={classes.formControl} size="small">
                        <InputLabel id="assignedTo">Assigned To</InputLabel>
                        <Select
                            labelId="assignedTo"
                            id="assignedTo"
                            onChange={handleChange}
                            value={props.state.assignedTo}
                            label="Assigned To"
                            fullWidth
                            name="assignedTo"
                            size="small"
                            inputProps={{ tabIndex: "3" }}
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
                        required
                        fullWidth
                        id="description"
                        label="Description"
                        onChange={handleChange}
                        value={props.state.description}
                        size="small"
                        inputProps={{ tabIndex: "2" }}

                    />
                    <FormControl className={classes.formControl} size="small">
                        <InputLabel id="status">Status</InputLabel>
                        <Select
                            labelId="status"
                            id="status"
                            value={props.state.status}
                            onChange={handleChange}
                            label="Status"
                            fullWidth
                            name="status"
                            size="small"
                            inputProps={{ tabIndex: "4" }}
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
                    {
                        props.state.comments &&
                        props.state.comments.map((card, index) => (
                            <CommentCard
                                id={card.id}
                                key={index}
                                date={card.date}
                                commentMessage={card.commentMessage}
                                attachment={card.attachment}
                                issueNumber={props.state.issueNumber}
                            />
                        ))
                    }
                    <TextField
                        autoComplete="off"
                        name="comment"
                        fullWidth
                        id="comment"
                        label="Comment"
                        onChange={handleChange}
                        value={props.state.comment}
                        size="small"
                        inputProps={{ tabIndex: "5" }}
                        className={classes.comment}
                        placeholder={"Type a message here"}
                    />
                    <Grid item xs={12} style={{display: "flex"}}>
                        <IconButton onClick={() => setOpenAttachFile(true)}>
                            <Badge color={"secondary"} badgeContent={files.length}>
                                <AttachFile  />
                            </Badge>
                        </IconButton>
                        <span className={classes.grow} />
                        {
                            props.state.issueNumber &&
                            <IconButton onClick={() => handleSaveIssue()}>
                                <SendIcon />
                            </IconButton>
                        }
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <DropzoneDialogBase
                        cancelButtonText={"cancel"}
                        submitButtonText={"submit"}
                        maxFileSize={128000}
                        open={openAttachFile}
                        onClose={() => setOpenAttachFile(false)}
                        onSave={(files) => attachFile(files)}
                        initialFiles={[files]}
                        showPreviews={true}
                        showFileNamesInPreview={true}

                        // dialogTitle={dialogTitle()}
                        // acceptedFiles={['image/*']}
                        fileObjects={files}
                        onAdd={newFileObjs => {
                            setFiles([].concat(files, newFileObjs));
                        }}
                        onDelete={deleteFileObj => {
                            setFiles(files.filter(fileObj => { return deleteFileObj.file.name !== fileObj.file.name }));
                        }}
                    />
                </Grid>
            </Grid>
        </form>
    );
}