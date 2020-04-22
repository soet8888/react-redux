import React from 'react'
import { post } from 'axios';
import Button from '@material-ui/core/Button'

class CreateProject extends React.Component {
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
            <div>
                <div>
                    <label for="projectName">Project Name:</label> &nbsp;&nbsp;
                    <input type="text" class="form-control" onChange={this.onProjectNameChange} name="projectName" placeholder="Title" />
                    <br /><br />
                    <label for="title">Configuraton File:</label>
                    <input type="file" onChange={this.onConfigChange} name="configFile" id="configFile" align="right" />
                    <br /><br />
                    <label for="title">Firestore service Account:</label>
                    <input type="file" onChange={this.onServiceChange} name="serviceFile" id="serviceFile" />
                    <br /><br />
                    <Button
                        aling="center"
                        color="secondary"
                        variant="contained"
                        onClick={this.onFormSubmit}
                    >
                        Create
          </Button>
                </div>
            </div>
        )
    }
}
export default CreateProject;