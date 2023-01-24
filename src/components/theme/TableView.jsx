import {
  Box,
  Button,
  CircularProgress,
  Fade,
  IconButton,
  Paper,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useCallback } from "react";
import { Worker } from "@react-pdf-viewer/core";
import "jspdf-autotable";
// import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import PATHS from "../../utils/constants";

const TableView = ({
  tableHeading,
  tableBody,
  totalSize,
  setPageSize,
  setPageNumber,
  isLoading,
  setIsLoading,
  pageSize,
  pageNumber,
  apiProps,
  root,
}) => {
  const navigate = useNavigate();

  const submitPdf = useCallback(() => {}, []);
  const handleToggle = useCallback(() => {}, []);
  const handleChangePage = useCallback(
    (_event, newPage) => {
      setPageNumber(newPage);
    },
    [setPageNumber],
  );

  const handleChangeRowsPerPage = useCallback(
    e => {
      setPageSize(parseInt(e.target.value, 10));
      setPageNumber(0);
    },
    [setPageNumber, setPageSize],
  );

  return (
    <Stack
      component={Paper}
      gap={1}
      elevation={5}
      height="auto"
      margin={2}
      paddingY={2}
    >
      <Stack direction="row" justifyContent="flex-end" p={1.2} gap={2}>
        <Typography color="error" fontWeight={600} letterSpacing={2}>
          EXPORT as
        </Typography>
        <Button size="small" variant="outlined" onClick={submitPdf}>
          PDF
        </Button>
        <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.min.js">
          <div
            style={{
              alignItems: "center",
              backgroundColor: "#eeeeee",
              borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
              display: "none",
              justifyContent: "center",
            }}
          ></div>
        </Worker>
        <Button size="small" variant="outlined">
          CSV
        </Button>
      </Stack>
      <Box component={"div"} display="grid" height={"90%"} marginX={3}>
        <TableContainer component={Paper} elevation={2}>
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ height: "5%" }}>
                {(root === PATHS.Ports.datasets.users ||
                  root === PATHS.Ports.userManagement.root) && (
                  <TableCell
                    align="left"
                    sx={{ backgroundColor: "#EFF2F7" }}
                    width="5%"
                  >
                    ACTIONS
                  </TableCell>
                )}
                {tableHeading?.map(cell => (
                  <TableCell
                    key={cell.field}
                    align="left"
                    width="5%"
                    sx={{ backgroundColor: "#EFF2F7" }}
                  >
                    {cell.headerName}
                  </TableCell>
                ))}

                {(root === PATHS.Ports.datasets.users ||
                  root === PATHS.Ports.userManagement.root) && (
                  <TableCell
                    align="left"
                    sx={{ backgroundColor: "#EFF2F7" }}
                    width="5%"
                  >
                    PASSWORD
                  </TableCell>
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={tableHeading.length + 2}>
                    <Typography p={5} textAlign="center">
                      <CircularProgress />
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : tableBody.length ? (
                tableBody?.map((user, index) => (
                  <TableRow key={Math.random()}>
                    {(root === PATHS.Ports.datasets.users ||
                      root === PATHS.Ports.userManagement.root) && (
                      <TableCell align="center">
                        <Tooltip
                          title="EDIT"
                          TransitionComponent={Fade}
                          TransitionProps={{ timeout: 600 }}
                        >
                          <IconButton
                            aria-label="edit"
                            size="small"
                            // onClick={() => editUser(user.mobileNumber)}
                            onClick={() => {
                              navigate(
                                `/userManagement/edit/${user.mobileNumber}`,
                              );
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    )}
                    {tableHeading.map(({ field }) => (
                      <TableCell
                        key={Math.random()}
                        component="th"
                        scope="row"
                        align="left"
                      >
                        {user[field]}
                      </TableCell>
                    ))}

                    {(root === PATHS.Ports.datasets.users ||
                      root === PATHS.Ports.userManagement.root) && (
                      <TableCell align="center">
                        <Tooltip
                          title="Deactive-Active"
                          TransitionComponent={Fade}
                          TransitionProps={{ timeout: 600 }}
                        >
                          <Switch
                            checked={user.passwordEnabled}
                            onChange={() =>
                              handleToggle(index, user.passwordEnabled)
                            }
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        </Tooltip>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={tableHeading.length + 2}>
                    <Typography p={5} textAlign="center">
                      NO Data Available
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 15, 20]}
          component="div"
          sx={{
            "& .css-194a1fa-MuiSelect-select-MuiInputBase-input.css-194a1fa-MuiSelect-select-MuiInputBase-input.css-194a1fa-MuiSelect-select-MuiInputBase-input":
              {
                minWidth: "16px",
              },
          }}
          count={totalSize}
          rowsPerPage={pageSize}
          page={pageNumber}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Stack>
  );
};

export default TableView;
