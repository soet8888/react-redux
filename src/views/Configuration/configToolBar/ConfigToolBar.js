import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux'
import {StartReplicator,StopReplicator} from 'actions/actions'
const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const ConfigToolBar = props => {
  const config = useSelector(state => state.config)
  const {history, className, ...rest } = props;
  const classes = useStyles();
  const onStopSubmit = () => {
    StopReplicator(config)
  }
  const onStartSubmit = () => {
    StartReplicator(config)
  }
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
          <span className={classes.spacer} />
        <Button
          color="secondary"
          variant="contained"
          onClick={onStartSubmit}
        >
          Start
        </Button>
        &nbsp;&nbsp;
        <Button
          color="primary"
          variant="contained"
          onClick={onStopSubmit}
        >
          STOP
        </Button>
      </div>
    </div>
  );
};

ConfigToolBar.propTypes = {
  className: PropTypes.string
};

export default withRouter(ConfigToolBar);
