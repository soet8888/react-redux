import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import Button from "components/CustomButtons/Button.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Table from "components/Table/Table.js";
import Alert from '@material-ui/lab/Alert';
import { SqlQueryExec } from "actions"
import { useSelector, useDispatch } from 'react-redux'
const alertStyle = makeStyles(theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));
function createColumms(data) {
    const columns = data.map((column, index) => {
        var obj = {
            name: column.name,
            index: index,
            id: column.name,
            value: column.name
        }
        return obj
    })
    console.log("columns return value", columns)
    return columns
}
function createRows(columns, rows) {
    var data = []
    rows.forEach(row => {
        var formatRow = []
        columns.forEach((column) => {
            formatRow.splice(column.index, 0, row[column.name])
        })
        data.push(formatRow)
    });
    return data
}

export default function Sql() {
    const config = useSelector(state => state.config)
    const columns = createColumms(config.sqlQueryData.columns).map(colum => colum.name);
    const rows = createRows(createColumms(config.sqlQueryData.columns), config.sqlQueryData.rows);
    const dispatch = useDispatch();
    const alertClasses = alertStyle();
    const [formState, setFormState] = useState({
        query: null,
    });
    const handleChange = event => {
        event.persist();
        setFormState(formState => ({
            ...formState,
            [event.target.name]: event.target.value
        }));
    };
    const onQueryExecute = (e) => {
        e.preventDefault();
        console.log("query", formState.query);
        if (formState.query === null) {
            alert("Invalid query statement");
        } else {
            dispatch(SqlQueryExec(config, formState.query))
        }
    }
    const onRowClck = (row) => {
        console.log("ON row clik", row);
    }
    return (
        <Card>
            <CardHeader>
                <div>
                    <div style={{ float: "left" }}>
                        <textarea
                            cols="100"
                            rows="5"
                            id="query"
                            name="query"
                            onChange={handleChange} />

                    </div>
                    <div style={{ float: "right" }}>
                        <Button
                            aling="center"
                            color="warning"
                            variant="contained"
                            onClick={(e) => onQueryExecute(e)}
                        >
                            Run
                    </Button>
                    </div>
                </div>
            </CardHeader>
            <CardBody>
                <Table
                    tableHeaderColor="primary"
                    tableHead={columns}
                    tableData={rows}
                    onRowClick={onRowClck}
                />
            </CardBody>
            <CardFooter>
                <div className={alertClasses.root}>
                    {config.sqlQueryData.message ?
                        <Alert serverity="error"> {config.sqlQueryData.message}</Alert> :
                        <div />
                    }
                </div>
            </CardFooter>
        </Card >
    );
}
