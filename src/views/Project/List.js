import React from "react";
// core components
import Card from "components/Card/Card.js";
import Button from "components/CustomButtons/Button.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import AppBar from "components/AppBar/AppBar";
import * as CONSTANT from 'constants/constants';
import * as ROUTES from 'constants/routes';
import CardMedia from "@material-ui/core/CardMedia";
import { useSelector, useDispatch } from 'react-redux';
import { StartReplicator, StopReplicator, addCurrentProject } from 'actions'

export default function ProjectList(props) {
    const config = useSelector(state => state.config)
    const { history } = props
    const dispatch = useDispatch();
    const onStopSubmit = (e, id) => {
        e.stopPropagation();
        StopReplicator(config)
    }
    const onStartSubmit = (e, id) => {
        e.stopPropagation();
        StartReplicator(config)
    }
    const cardOnClick = (e, p) => {
        console.log("on click", e, "\nvalue", p)
        if (p.id === CONSTANT.NEW_PROJECT_ID) {
            history.push(ROUTES.CREATE_PROJECT);
        } else {
            dispatch(addCurrentProject(config, p.id))
            history.push(ROUTES.DASHBOARD)
        }

    }
    return (
        <div>
            <AppBar />
            <div style={{ height: "40px" }} />
            <Card>
                <CardHeader>
                    <GridContainer>
                        {
                            config.projectList.filter(p => p.id !== CONSTANT.ALL_PROJECT_ID)
                                .map((value, index) => {
                                    return (
                                        <GridItem xs={12} sm={5} md={3}>
                                            <Card
                                                onClick={(e) => cardOnClick(e, value)}
                                                profile
                                                style={{ backgroundColor: "lightgray" }}>
                                                <CardHeader>
                                                    <CardMedia
                                                        component="img"
                                                        alt="Contemplative Reptile"
                                                        height="140"
                                                        image={value.id === CONSTANT.NEW_PROJECT_ID ? "images/add.png" : "images/project.jpg"}
                                                        title="Contemplative Reptile"
                                                    />
                                                </CardHeader>
                                                <CardBody>
                                                    {
                                                        value.id === CONSTANT.NEW_PROJECT_ID ?
                                                            <div /> :
                                                            <Table
                                                                tableHeaderColor="info"
                                                                onRowClick={(e) => console.log("row click")}
                                                                tableHead={Object.keys(value)}
                                                                tableData={[Object.values(value)]}
                                                            />
                                                    }
                                                </CardBody>
                                                {value.id === CONSTANT.NEW_PROJECT_ID ?
                                                    <div /> :
                                                    <CardFooter>
                                                        <Button
                                                            aling="center"
                                                            color="success"
                                                            variant="contained"

                                                            onClick={(e) => onStartSubmit(e, value.id)}
                                                        >
                                                            Start
</Button>
                                                        <Button

                                                            aling="center"
                                                            color="danger"
                                                            variant="contained"
                                                            onClick={(e) => onStopSubmit(e, value.id)}
                                                        >
                                                            Stop
</Button>
                                                    </CardFooter>

                                                }

                                            </Card>
                                        </GridItem>
                                    )
                                }
                                )
                        }
                    </GridContainer>
                </CardHeader>
            </Card>
        </div>
    );
}
