import React, { useState } from "react";
// @material-ui/core components
// core components
import Card from "components/Card/Card.js";
import Button from "components/CustomButtons/Button.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import * as ROUTES from 'constants/routes';
import AppBar from "components/AppBar/AppBar";
import { useSelector, useDispatch } from 'react-redux';
import { createProject } from 'actions'
export default function Create(props) {
    const config = useSelector(state => state.config)
    const dispatch = useDispatch();
    const [formState, setFormState] = useState({
        serviceData: null,
        configData: null,
        projectName: null,
    });

    const onServiceChange = (e) => {
        var reader = new FileReader();
        reader.readAsText(e.target.files[0])
        reader.onload = (event) => {
            setFormState(formState => ({
                ...formState,
                serviceData: event.target.result
            }))
        }
    }
    const onConfigChange = (e) => {
        var reader = new FileReader();
        reader.readAsText(e.target.files[0])
        reader.onload = (event) => {
            setFormState(formState => ({
                ...formState,
                configData: event.target.result
            }))
        }
    }
    const onTextAreaChange = (e) => {
        const { name, value } = e.target
        setFormState(formState => ({
            ...formState,
            [name]: value
        }))
    }
    const onProjectNameChange = (e) => {
        const { value } = e.target
        console.log("Even proname", e)
        e.preventDefault();
        setFormState(formState => ({
            ...formState,
            projectName: value
        }))
    }
    const onFormSubmit = (e) => {
        e.preventDefault() // Stop form submit
        if (formState.serviceData === null
            || formState.configData === null
            || formState.projectName === null
        ) {
            alert("Registration is not complete")
            return
        }
        var data = {
            serviceData: formState.serviceData,
            configData: formState.configData,
            projectName: formState.projectName,
        }
        console.log("Create console", data)
        dispatch(createProject(config, data))
        props.history.push(ROUTES.DASHBOARD);
    }
    return (
        <div>
            <AppBar />
            <div style={{ height: "20px" }} />
            <div className="name23" style={{ paddingLeft: "20px", paddingTop: "30px" }}>
                <Card style={{ width: '60%', height: '50%' }}>
                    <CardHeader style={{ height: "20px" }}>
                        <div>
                            <div style={{ float: "left" }}>
                                <h4>New Project Creation</h4>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div style={{ height: '60px', width: '200px' }} align="left" id="ProjectName">
                            <CustomInput
                                labelText="Project Name"
                                id="projectName"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    onChange: (e) => onProjectNameChange(e)
                                }}
                            />
                        </div>
                        <br />
                        <div>
                            <GridContainer>
                                <GridItem xs={12} sm={40} md={5}>
                                    <label><b>Configuration File</b></label><br /><br />
                                    <textarea
                                        id="config"
                                        name="configData"
                                        rows={20}
                                        cols={43}
                                        value={formState.configData}
                                        onChange={(e) => onTextAreaChange(e)}
                                    /><br />
                                    <input type="file"
                                        name="configFile"
                                        id="configFile"
                                        align="right"
                                        onChange={onConfigChange}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={40} md={3}>
                                    <label><b>Service File</b></label><br /><br />
                                    <textarea
                                        id="service"
                                        name="serviceData"
                                        rows={20}
                                        cols={43}
                                        onChange={(e) => onTextAreaChange(e)}
                                    />
                                    <input type="file"
                                        name="configFile"
                                        id="configFile"
                                        onChange={onServiceChange}
                                        align="right" />
                                </GridItem>
                            </GridContainer>
                        </div>
                    </CardBody>
                    <CardFooter>
                        <Button
                            aling="center"
                            color="info"
                            variant="contained"
                            onClick={(e) => onFormSubmit(e)}
                        >
                            Create
                </Button>
                    </CardFooter>
                </Card >
            </div>
        </div>
    );
}
