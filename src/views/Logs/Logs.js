import React from "react";
import Card from "components/Card/Card.js";
import Button from "components/CustomButtons/Button.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { useDispatch, useSelector } from 'react-redux';
import { fetchLog, clearLog } from 'actions'

export default function ObjectList() {
    const config = useSelector(state => state.config)
    const dispatch = useDispatch()
    const onRefresh = (e) => {
        e.preventDefault();
        dispatch(fetchLog(config))
    }
    const onClear = (e) => {
        e.preventDefault();

        dispatch(clearLog(config))
    }
    return (
        <Card style={{ width: '50%', height: '50%' }}>
            <CardHeader style={{ height: "30px" }}>
                <div>
                    <div style={{ float: "left" }}>
                        <h4>Replication Logs</h4>
                    </div>
                    <div style={{ float: "right" }}>
                        <Button
                            aling="center"
                            color="success"
                            variant="contained"
                            onClick={(e) => onClear(e)}
                        >
                            Refresh
                </Button>
                &nbsp;&nbsp;
                <Button
                            aling="center"
                            color="danger"
                            variant="contained"
                            onClick={(e) => onRefresh(e)}
                        >
                            Clear
                </Button>
                    </div>
                </div>

            </CardHeader>
            <CardBody>
                <textarea
                    cols={60}
                    rows={30}
                    defaultValue={config.currentProject.logData}
                />
            </CardBody>
        </Card>
    );
}
