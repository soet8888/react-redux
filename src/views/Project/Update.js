import React, { useState } from "react";
// core components
import Card from "components/Card/Card.js";
import Button from "components/CustomButtons/Button.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { useSelector, useDispatch } from 'react-redux';
import { updateProject, StartReplicator, StopReplicator } from 'actions'
export default function Update() {
    const config = useSelector(state => state.config)
    const dispatch = useDispatch();
    const [formState, setFormState] = useState({
        serviceData: config.currentProject.serviceData,
        configData: config.currentProject.configData,
        projectName: config.currentProject.projectName,
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
    const onStopSubmit = (e) => {
        e.preventDefault();
        dispatch(StopReplicator(config))
    }
    const onStartSubmit = (e) => {
        e.preventDefault();
        dispatch(StartReplicator(config))
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
            [name]: value,
        }))
    }
    const onProjectNameChange = (e) => {
        const { value } = e.target;
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
        console.log("Update console", data)
        dispatch(updateProject(config, data))
    }
    return (
        <Card style={{ width: '80%', height: '50%' }}>
            <CardHeader style={{ height: "20px" }}>
                <div>
                    <div style={{ float: "left" }}>
                        <h4>Configuration</h4>
                    </div>
                    <div style={{ float: "right" }}>
                        <Button
                            aling="center"
                            color="success"
                            variant="contained"
                            onClick={(e) => onStartSubmit(e)}
                        >
                            Start
                </Button>
                &nbsp;&nbsp;
                <Button
                            aling="center"
                            color="danger"
                            variant="contained"
                            onClick={(e) => onStopSubmit(e)}
                        >
                            Stop
                </Button>
                    </div>
                </div>

            </CardHeader>
            <CardBody>
                <div style={{ height: '60px', width: '200px' }}>
                    <CustomInput
                        labelText="Project Name"
                        id="username"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            defaultValue: config.currentProject.name,
                            onChange: (e) => onProjectNameChange(e)
                        }}
                    />
                </div>
                <br />
                <div>
                    <GridContainer sm={12}>
                        <GridItem xs={12} sm={20} md={5}>
                            <label><b>Configuration File</b></label><br /><br />
                            <textarea
                                id="config"
                                name="configData"
                                rows={20}
                                cols={43}
                                value={formState.configData}
                                onChange={(e) => onTextAreaChange(e)}
                            /><br />
                            <input type="file" onChange={(e) => onConfigChange(e)} name="configFile" id="configFile" align="right" />
                        </GridItem>
                        <GridItem xs={12} sm={20} md={3}>
                            <label><b>Service File</b></label><br /><br />
                            <textarea
                                id="service"
                                name="serviceData"
                                rows={20}
                                cols={43}
                                value={formState.serviceData}
                                onChange={(e) => onTextAreaChange(e)}
                            />
                            <input type="file" onChange={onServiceChange} name="configFile" id="configFile" align="right" />
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
                    Save
                </Button>
            </CardFooter>
        </Card >
    );
}
