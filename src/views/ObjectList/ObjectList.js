import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { useSelector } from 'react-redux';

const styles = {
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF"
        }
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: "400",
            lineHeight: "1"
        }
    }
};

const useStyles = makeStyles(styles);
const createObjColumn = () => {
    var colummns = [];
    colummns.splice(0, 0, "name")
    colummns.splice(1, 0, "type")
    return colummns;
}
const createObjRow = (data) => {
    var rows = []
    data.forEach(row => {
        var format = []
        format.splice(0, 0, row.name)
        format.splice(1, 0, row.type)
        rows.push(format);
    })
    return rows;
}
const createMetaColumns = (field) => {
    var columns = [];
    columns.splice(0, 0, "Cid")
    columns.splice(1, 0, "Name")
    columns.splice(2, 0, "Type")
    columns.splice(3, 0, "Not Null")
    columns.splice(4, 0, "Default Value")
    return columns;
}
const createMetaRows = (data) => {
    var rows = [];
    data.forEach(row => {
        var format = []
        format.splice(0, 0, row.cid)
        format.splice(1, 0, row.name)
        format.splice(2, 0, row.type)
        format.splice(3, 0, row.not_null)
        format.splice(4, 0, row.dft_value)
        rows.push(format)
    })
    return rows;
}
export default function ObjectList() {
    const classes = useStyles();
    const config = useSelector(state => state.config)
    const objColumn = createObjColumn();
    const objRow = createObjRow(config.objectList)
    const [formState, setFormState] = useState({
        object: null,
        metaColumn: [],
        metaRow: [],
    });
    const onRowClick = row => {

        var obj = row[0]
        var meta = config.metaData.filter(v => v.id === obj);
        console.log("row", row[0], "\n meta all", config.metaData, "\n meta", meta)
        setFormState(formState => ({
            ...formState,
            object: obj,
            metaColumn: createMetaColumns(),
            metaRow: createMetaRows(meta),
        }))
        console.log("Row click", row)
    }
    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="danger">
                        <h4 className={classes.cardTitleWhite}>Objets List Table</h4>
                    </CardHeader>
                    <CardBody>
                        <Table
                            tableHeaderColor="success"
                            tableHead={objColumn}
                            tableData={objRow}
                            onRowClick={onRowClick}
                        />
                    </CardBody>
                </Card>
            </GridItem>
            {formState.object === null ?
                <div /> :
                <GridItem xs={12} sm={12} md={12}>
                    <Card plain>
                        <CardHeader plain color="danger">
                            <h4 className={classes.cardTitleWhite}>
                                <font color="lightblue" size="5">
                                    Metadata Table
                                    </font>
                            </h4>
                            <p className={classes.cardCategoryWhite}>
                                <b><font color="blue">Object Name:</font> </b>
                                <font color="black">{formState.object}</font>
                            </p>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHeaderColor="primary"
                                tableHead={formState.metaColumn}
                                tableData={formState.metaRow}
                            />
                        </CardBody>
                    </Card>
                </GridItem>
            }
        </GridContainer>
    );
}
