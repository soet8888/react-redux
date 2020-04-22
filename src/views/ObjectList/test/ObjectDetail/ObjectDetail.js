import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux'
import {
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Typography,
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

const ObjectDetail = props => {
  const config = useSelector(state => state.config)
  const { history, className, objectList, ...rest } = props;
  const classes = useStyles();
 // const [selectedObject] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [page, setPage] = useState(0);
  const handlePageChange = (event, page) => {
    setPage(page);
  };
  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };
  // const onTableRowClick = (event, obj) => {
  //   event.preventDefault();
  //   // dispatch(currentMetadata(obj))
  //   history.push('/obj-detail');
  // }
  console.log("current metadata list",config)
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
                  <TableCell>Object</TableCell>
                  <TableCell>Cid</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Not Null </TableCell>
                  <TableCell>Default Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {config.currentMetaData.slice(0, rowsPerPage).map((info,i) => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={i}
                    //selected={selectedUsers.indexOf(user.id) !== -1}
                    //onClick={onTableRowClick}
                  >
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Typography variant="body1">{info.id}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>{info.cid}</TableCell>
                    <TableCell>
                      {info.name}
                    </TableCell>
                    <TableCell>{info.type}</TableCell>
                    <TableCell>{info.notNull} </TableCell>
                    <TableCell>{info.dftValue} </TableCell>
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
          count={config.currentMetaData.length}
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

ObjectDetail.propTypes = {
  history: PropTypes.object,
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default withRouter(ObjectDetail);
