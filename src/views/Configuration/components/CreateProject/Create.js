import React from 'react'
import { post } from 'axios';

import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Grid,
    Button,
    TextField
} from '@material-ui/core';

class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceFileString: null,
            configFileString: null,
            projectName: null,
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onProjectNameChange = this.onProjectNameChange.bind(this)
        this.onServiceChange = this.onServiceChange.bind(this)
        this.onConfigChange = this.onConfigChange.bind(this)
        this.createProject = this.createProject.bind(this)
    }
    componentWillMount() {
        console.log('Component WILL MOUNT!')

    }
    componentDidMount() {
        console.log('Component DID MOUNT!', this.props.config)
    }
    fetchService() {
        const url = this.props.config.url + "/api/service"
        console.log("request url path", url)
        //const url = 'http://192.168.1.166:8080/api/service';
        const that = this;
        fetch(url, {
            headers: {
                'Project-ID': this.props.config.projectID
            }
        })
            // We get the API response and receive data in JSON format...
            .then(response => response.json())
            // ...then we update the users state
            .then((data) => {
                that.setState({ serviceData: data.data })
            }
            )
            .catch(err => {
                alert(err)
            })
    }
    async onFormSubmit(e) {
        e.preventDefault() // Stop form submit
        if (this.state.serviceFileString === null
            || this.state.configFileString === null
            || this.state.projectName === null
        ) {
            alert("Registration is not complete")
            return
        }
        this.createProject(this.state.serviceFileString, this.state.configFileString, this.state.projectName).then((response) => {
            console.log(response.data)
        })
    }
    onServiceChange(e) {
        var reader = new FileReader();
        reader.readAsText(e.target.files[0])
        reader.onload = (event) => {
            console.log("service Loader event", event.target.result)
            this.setState({
                serviceFileString: event.target.result
            })
        }
    }
    onConfigChange(e) {
        var reader = new FileReader();
        reader.readAsText(e.target.files[0])
        reader.onload = (event) => {
            console.log("config Loader event", event.target.result)
            this.setState({
                configFileString: event.target.result
            })
        }
    }
    onProjectNameChange(e) {
        this.setState(
            {
                projectName: e.target.value
            }
        )
    }

    createProject(sFile, cFile, pName) {
        console.log("create project data", { Service: sFile, Config: this.state.configFileString, Name: pName });
        const url = this.props.config.url + "/api/project/" + pName
        //const url = 'http://192.168.1.166:8080/api/upload';
        const formData = new FormData();
        formData.append('serviceFile', sFile)
        formData.append('configFile', cFile)
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Project-ID': this.props.config.projectID
            },
        }
        return post(url, formData, config)
    }
    render() {
        return (
            <Card alignContent='center'>
                <form
                    autoComplete="off"
                    noValidate
                ></form>
                <CardHeader
                    subheader="New Project configuration"
                    title="New Project"
                />
                <Divider />
                <CardContent>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <label for="title">Project Name:</label>
                        </Grid>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    helperText="Please specify the project name"
                                    label="Project name"
                                    margin="dense"
                                    name="projectName"
                                    onChange={this.onProjectNameChange}
                                    required
                                    //  value={values.firstName}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <label for="title">Configuraton File:</label>
                        </Grid>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <input type="file" onChange={this.onConfigChange} name="configFile" id="configFile" align="right" />
                            </Grid>
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <label for="title">Service Account File:</label>
                        </Grid>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <input type="file" onChange={this.onServiceChange} name="serviceFile" id="serviceFile" />
                            </Grid>
                        </Grid>

                    </Grid>
                </CardContent>
                <Divider />
                <CardActions>
                    <Button
                        aling="center"
                        color="secondary"
                        variant="contained"
                        onClick={this.onFormSubmit}
                    >
                        Create
                    </Button>
                </CardActions>

            </Card>
        )
    }
}
export default Create;