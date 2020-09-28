import React from 'react';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";
import {DropzoneArea} from "material-ui-dropzone";

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}));

export default function AddBug(){
    const classes = useStyles();

    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [files, setFiles] = React.useState();

    const handleCreateIssue = function(e){
        e.preventDefault();

        let form = new FormData();

        form.append("properties", new Blob([JSON.stringify({
            title: title,
            description: description
        })], {
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
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <form className={classes.form} noValidate onSubmit={handleCreateIssue}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        autoComplete="title"
                        name="title"
                        variant="outlined"
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        autoFocus
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        autoComplete="Description"
                        name="description"
                        variant="outlined"
                        required
                        fullWidth
                        id="description"
                        label="Description"
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                    />
                </Grid>
                <Grid item xs={12}>
                    <DropzoneArea
                        onChange={(files) => setFiles(files)}
                    />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Add a Bug
            </Button>
        </form>
    );
}