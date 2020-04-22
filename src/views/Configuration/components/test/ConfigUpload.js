import React from 'react'
import Button from '@material-ui/core/Button'
import {updateProject } from 'actions'
import { connect } from 'react-redux'

class UploadConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            configData: props.config.configData,
            serviceData: props.config.serviceData,
        }
        this.onChange = this.onChange.bind(this)
        this.onFormSumit = this.onFormSumit.bind(this)
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onFormSumit = (e) => {
        console.log("config & service", {config:this.state.configData,service:this.state.serviceData})
        e.preventDefault()
        this.props.dispatch(updateProject(this.state.serviceData, this.state.configData))
    }
    // fileUpload() {
    //     const url = this.props.config.url + "/api/upload"
    //     fetch(url, {
    //         method: 'PUT',
    //         headers: {
    //             'Project-ID': this.props.config.projectID
    //         },
    //         body: JSON.stringify(this.state.configData)
    //     }).then(function (response) {
    //         return response.json();
    //     }).then(function (data) {
    //         alert("sucess file upload", data.data)
    //     });
    // }
    render() {
        return (
            <div>
                <div>
                    <h1>Configuration File</h1><br /><br />
                    <textarea
                        id="config"
                        name="configData"
                        rows={30}
                        cols={50}
                        defaultValue={this.props.config.configData}
                        onChange={this.onChange} />
                </div >
                <br /><br />
                <div>
                    <h1> Service File</h1>
                    <textarea
                        id="service"
                        name="serviceData"
                        rows={30}
                        cols={50}
                        defaultValue={this.props.config.serviceData}
                        onChange={this.onChange} />
                </div>
                <br /><br />
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={this.onFormSumit}
                >
                    Save
            </Button>
            </div >
        );
    }
}
function configListProps(state) {
    return {
        config: state.config,
    }
}
export default connect(configListProps)(UploadConfig);