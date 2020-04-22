
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ReactChipInput from "react-chip-input";

import {
    Card,
    CardHeader,
    CardContent,
    Divider,
} from '@material-ui/core';
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));
const SmallChips = (props) => {
    const { fields } = props;
    const classes = useStyles();
    const handleDelete = (index) => {
        console.info('You clicked the delete icon.', index);
    };
    const [values, setValues] = useState({
        fieldList: fields
    });
    const addChip = value => {
        console.log("before Add Chip", values.fieldList);
        const chips = values.fieldList.slice();
        console.log("chip1", chips);
        chips.push({ name: value })
        console.log("chip2", chips);
        setValues(
            {
                ...values,
                fieldList: chips
            }
        );
        console.log("After Add Chip", values.fieldList);
    };
    const removeChip = index => {
        const chips = [...values.fieldList];
        console.log("Before Remove Chip", values.fieldList);
        chips.splice(index, 1);
        setValues(
            {
                ...values,
                fieldList: chips
            }
        )
        console.log("After Remove Chip", values.fieldList);
    };
    const farr = values.fieldList.map((f) => {
        console.log("fvalue", values.fieldList.length);
        return f.name
    });
    return (
        <Card >
            <form
                autoComplete="off"
                noValidate
            >
                <CardHeader
                    subheader="The information can be edited"
                    title="FullText Search"
                />
                <Divider />
                <CardContent>
                    <div className={classes.root}>
                        {values.fieldList.map((field) => (
                            <Chip
                                size="small"
                                icon={<FaceIcon />}
                                label={field.name}
                                onDelete={handleDelete}
                                color="secondary"
                            />
                        ))}
                    </div>
                </CardContent>
                <Divider />
                <ReactChipInput
                    classes="class1 class2"
                    chips={farr}
                    onSubmit={value => addChip(value)}
                    onRemove={index => removeChip(index)}
                />
            </form>
        </Card>

    );
}
SmallChips.propTypes = {
    fields: PropTypes.array.isRequired
};
export default SmallChips;