import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { currentMetadata} from'actions'
import {useDispatch} from 'react-redux'
import {
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const ObjectTable = props => {
  const { history, className, objectList, ...rest } = props;
  const classes = useStyles();
  const dispatch = useDispatch()
  const [selectedObject] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [page, setPage] = useState(0);
  const handlePageChange = (event, page) => {
    setPage(page);
  };
  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };
  const onTableRowClick = (event,obj) => {
    event.preventDefault();
    dispatch(currentMetadata(obj.name))
    history.push('/obj-detail');
  }
  console.log("Object list",objectList)
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Object List</TableCell>
                  <TableCell>Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {objectList.slice(0, rowsPerPage).map((obj,i) => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={i}
                    selected={selectedObject.indexOf(i) !== -1}
                    onClick={(e)=>onTableRowClick(e,obj)}
                  >
                    <TableCell>{obj.name}</TableCell>
                    <TableCell>{obj.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={objectList.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

ObjectTable.propTypes = {
  history: PropTypes.object,
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default withRouter(ObjectTable);
