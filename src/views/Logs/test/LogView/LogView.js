import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {useSelector} from 'react-redux';
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

const LogView = props => {
  const { className, ...rest } = props;
  const config = useSelector(state => state.config);
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
                subheader="Logs file can onl view"
                title="Logs"
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
                  <textarea
                        id="log"
                        name="logData"
                        rows={20}
                        cols={70 }
                        defaultValue = {config.logData}
                         />
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
export default LogView;
