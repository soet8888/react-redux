import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { useSelector } from 'react-redux'
import Alert from '@material-ui/lab/Alert';

const alertStyle = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const SimpleAlerts = (message) => {
  const classes = alertStyle();
  if (message === null) {
    return (
      <div className={classes.root}>
        <Alert severity="info">Query Execute Info — check it out!</Alert>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <Alert severity="error">This is an error alert — {message}</Alert>
      </div>
    );
  }
}

function createColumms(data) {
  console.log("Columns def", data)
  const columns = data.map((column, index) => {
    var obj = {
      name: column.name,
      index: index,
      id: column.name,
      label: 'Density',
      minWidth: 170,
      align: 'right',
      value: column.name
    }
    return obj
  })
  console.log("columns return value", columns)
  return columns
}
function createRows(columns, rows) {
  var data = []
  rows.forEach(row => {
    console.log("up row", row)
    var formatRow = []
    columns.forEach((column) => {
      formatRow.splice(column.index, 0, { value: row[column.name], align: column.align, key: column.name })
    })
    console.log("format row", formatRow)
    data.push(formatRow)
  });
  console.log("return row", data)
  return data
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable() {
  const config = useSelector(state => state.config)
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {createColumms(config.sqlQueryData.columns).map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {createRows(createColumms(config.sqlQueryData.columns), config.sqlQueryData.rows)
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} >

                  {row.map(rowData => {
                    return (
                      <TableCell key={rowData.key} align={rowData.align}>
                        {rowData.value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={config.sqlQueryData.rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      {SimpleAlerts(config.sqlQueryData.message)}
    </Paper>
  );
}
