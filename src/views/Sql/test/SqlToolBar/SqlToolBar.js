import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { SqlQueryExec } from "actions"

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

const SqlToolBar = props => {
  const config = useSelector(state => state.config)
  const dispatch = useDispatch();
  const { history, className, ...rest } = props;
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

  const classes = useStyles();
  const onQuerySubmit = () => {
    dispatch(SqlQueryExec(config, formState.query))
  }
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>

        <div align="left">
          <br />
          <br />

          <textarea
            cols="120"
            rows="5"
            id="query"
            name="query"
            onChange={handleChange}>
            sql statements query execution
             </textarea>

        </div>
        <span className={classes.spacer} />
        <Button
          color="primary"
          variant="contained"
          onClick={onQuerySubmit}
        >
          Run
        </Button>
      </div>
    </div>
  );
};

SqlToolBar.propTypes = {
  className: PropTypes.string
};

export default withRouter(SqlToolBar);
