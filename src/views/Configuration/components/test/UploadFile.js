import React from 'react'
import { post } from 'axios';
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'

class UploadFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      serviceData: null,
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
    this.fetchService= this.fetchService.bind(this)
  }
  componentWillMount() {
    console.log('Component WILL MOUNT!')
    this.fetchService() 
 }
  componentDidMount() {
    console.log('Component DID MOUNT!',this.props.config)
    //this.props.dispatch(fetchService(this.props.config))
  }
  fetchService(){
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
  onFormSubmit(e) {
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response) => {
      alert(response.data)
      console.log(response.data);
    })
  }
  onChange(e) {
    this.setState({ file: e.target.files[0] })
  }
  fileUpload(file) {
    const url = this.props.config.url + "/api/upload"
    //const url = 'http://192.168.1.166:8080/api/upload';
    const formData = new FormData();
    formData.append('uploadfile', file)
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
          <textarea
            id="textarea"
            cols={50}
            rows={40}
            defaultValue={this.props.config.serviceData}
          />
        </div>
        <input type="file" onChange={this.onChange} name="uploadfile" id="uploadfile" />
        <br /><br />
        <Button
          color="secondary"
          variant="contained"
          onClick={this.onFormSubmit}
        >
          Upload
          </Button>
      </div>
    )
  }
}
function configListProps(state) {
  console.log("Proprs change",state.config)
  return {
    config: state.config,
  }
}
export default connect(configListProps)(UploadFile);