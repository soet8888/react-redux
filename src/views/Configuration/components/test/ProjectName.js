import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import {
    Card,
    CardHeader,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    }
}));

const ProjectName = props => {
    const { className, ...rest } = props;
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={4}
            >
                <Grid
                    item
                    lg={8}
                    md={6}
                    xl={8}
                    xs={3}
                >
                    <Card
                        {...rest}
                        className={clsx(classes.root, className)}
                    >
                        <form
                            autoComplete="off"
                            noValidate
                        >
                            <CardHeader
                                subheader="ok_dev.app"
                                title="Project Name"
                            />
                        </form>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};
ProjectName.propTypes = {
    className: PropTypes.string
};

export default ProjectName;
