import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { CreateProject } from '../../components'
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
} from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));
const Upload = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          lg={8}
          md={6}
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
                title="Create New Project "
              />
              <Divider />
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                >

                </Grid>
              </Grid>
              <CardContent>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <CreateProject />
                  </Grid>
                </Grid>
              </CardContent>
            </form>
          </Card>
        </Grid>
      </Grid>
    </div>

  );
};
export default Upload;
