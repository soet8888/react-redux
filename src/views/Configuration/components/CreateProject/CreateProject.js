import React from 'react'
import { createProject, updateProject } from 'actions'
import { connect } from 'react-redux';
import * as ROUTES from 'constants/routes';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  FormLabel
} from '@material-ui/core';
var cardStyle = {
  display: 'block',
  width: '40vw',
  alignContent: 'center',
  transitionDuration: '0.3s',
  height: '40vw'
}
class CreateProject extends React.Component {
  constructor(props) {
    console.log("Create proejct props", props.isUpdate);
    super(props);
    this.state = {
      isUpdate: props.isUpdate ? true : false,
      configData: props.isUpdate ? props.config.currentProject.configData : null,
      serviceData: props.isUpdate ? props.config.currentProject.serviceData : null,
      projectName: props.isUpdate ? props.config.currentProject.name : null,
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onProjectNameChange = this.onProjectNameChange.bind(this)
    this.onServiceChange = this.onServiceChange.bind(this)
    this.onConfigChange = this.onConfigChange.bind(this)
    this.createButtton = this.createButtton.bind(this)
    this.saveButtton = this.saveButtton.bind(this)
    this.onChange = this.onChange.bind(this)
    this.renderProjectForm = this.renderProjectForm.bind(this)
  }
  componentWillMount() {
    console.log('Component WILL MOUNT!')

  }
  componentDidMount() {
    console.log('Component DID MOUNT!', this.props.config)
  }
  async onFormSubmit(e) {
    e.preventDefault() // Stop form submit
    if (this.state.serviceData === null
      || this.state.configData === null
      || this.state.projectName === null
    ) {
      alert("Registration is not complete")
      return
    }
    var data = {
      serviceData: this.state.serviceData,
      configData: this.state.configData,
      projectName: this.state.projectName,
    }
    this.state.isUpdate ?
      this.props.dispatch(updateProject(this.props.config, data, this.props.currentProject.id)) :
      this.props.dispatch(createProject(this.props.config, data));
    this.props.history.push(ROUTES.DASHBOARD);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  createButtton() {
    return (
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
    );
  }
  saveButtton() {
    return (
      <CardActions>

        <Button
          aling="center"
          color="secondary"
          variant="contained"
          onClick={this.onFormSubmit}
        >
          Save
                </Button>
      </CardActions>
    );
  }
  onServiceChange(e) {
    var reader = new FileReader();
    reader.readAsText(e.target.files[0])
    reader.onload = (event) => {
      console.log("service Loader event", event.target.result)
      this.setState({
        serviceData: event.target.result
      })
    }
  }
  onConfigChange(e) {
    var reader = new FileReader();
    reader.readAsText(e.target.files[0])
    reader.onload = (event) => {
      console.log("config Loader event", event.target.result)
      this.setState({
        configData: event.target.result
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
  renderProjectForm() {
    return (
      <Card style={cardStyle}>
        <form
          autoComplete="off"
          noValidate
        ></form>
        <CardHeader
          subheader={this.state.isUpdate ? "Configuration update" : "New Project configuration"}
          title={this.state.isUpdate ? "Configuration " : "New Project"}
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
              <FormLabel>Project Name</FormLabel>
            </Grid>
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
                defaultValue={this.state.projectName}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <FormLabel>Configuraton File</FormLabel>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <textarea
                id="config"
                name="configData"
                rows={5}
                cols={20}
                onChange={this.onChange}
                defaultValue={this.state.configData}
              />
              <input type="file" onChange={this.onConfigChange} name="configFile" id="configFile" align="right" />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <FormLabel> Service Account File</FormLabel>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <textarea
                id="service"
                name="serviceData"
                rows={5}
                cols={20}
                defaultValue={this.state.serviceData}
                onChange={this.onChange}
              />
              <input type="file" onChange={this.onServiceChange} name="serviceFile" id="serviceFile" />
            </Grid>

          </Grid>
        </CardContent>
        <Divider />
        {this.state.isUpdate ? this.saveButtton() : this.createButtton()}
      </Card>
    );
  }
  render() {
    if (this.props.isUpdate) {
      return (
        <div algin='center'> {this.renderProjectForm()}</div>
      );
    } else {
      return this.renderProjectForm();
    }
  }
}
function configListProps(state) {
  return {
    config: state.config,
  }
}
export default connect(configListProps)(CreateProject);
