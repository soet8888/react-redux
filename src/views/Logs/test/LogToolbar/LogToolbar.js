import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux'
import {fetchLog,clearLog} from 'actions/actions'
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

const LogToolbar = props => {
  const config = useSelector(state => state.config)
  const {history, className, ...rest } = props;
  const dispatch= useDispatch();
  const classes = useStyles();
  const onClearSubmit = () => {
    dispatch(clearLog(config))
  }
  const onRefreshSubmit = () => {
    dispatch(fetchLog(config))
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
          onClick={onRefreshSubmit}
        >
          Refresh
        </Button>
        &nbsp;&nbsp;
        <Button
          color="primary"
          variant="contained"
          onClick={onClearSubmit}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

LogToolbar.propTypes = {
  className: PropTypes.string
};

export default withRouter(LogToolbar);
