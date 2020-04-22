import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from '@material-ui/core/TablePagination';
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from '@material-ui/core/TableContainer';
// core components
import styles from "./style";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { tableHead, tableData, tableHeaderColor, onRowClick } = props;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const OnTableRowClick = (e, row) => {
    e.preventDefault();
    onRowClick(row);
  }

  return (
    <div className={classes.tableResponsive}>
      <TableContainer>
        <Table className={classes.table}>
          {tableHead !== undefined ? (
            <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
              <TableRow className={classes.tableHeadRow}>
                {tableHead.map((prop, key) => {
                  return (
                    <TableCell
                      className={classes.tableCell + " " + classes.tableHeadCell}
                      key={key}
                    >
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
          ) : null}
          <TableBody>
            {
              tableData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                                                                                                                                                                                                                                                                                                                                                                                                                                          
                    return (
                      <TableRow
                        className={classes.tableHeadRow}
                        onClick={(e) => OnTableRowClick(e, row)}
                      >
                        {row.map((prop, key) => {
                          return (
                            <TableCell
                              className={classes.tableCell + " " + classes.tableHeadCell}
                              key={key}
                            >
                              {prop}
                            </TableCell>

                          );
                        })}
                      </TableRow>
                    );
                  
                })
            }
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={tableData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div >
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "primary"
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  onRowClick: PropTypes.func,
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};
