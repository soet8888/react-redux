import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { ConfigDetails,SmallChip } from '../../components';
import mockData from '../../data'
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));
const Detail = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={8}
      >
       <Grid
          item
          lg={8}
          md={6}
          xl={8}
          xs={12}
        >
          <ConfigDetails />
        </Grid>
        <Grid
          item
          lg={8}
          md={6}
          xl={8}
          xs={12}
        >
          <SmallChip fields={mockData}/>
        </Grid>
      </Grid>
    </div>
  );
};

export default Detail;
