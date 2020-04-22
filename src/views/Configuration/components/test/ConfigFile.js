import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { UploadConfig} from '../../components'
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

const ConfigFile = props => {
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
                subheader="configuration file can edit"
                title="Configuration"
              />
              <Divider />
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
                  <UploadConfig/>
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
export default ConfigFile;
