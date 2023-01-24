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
import React, { useCallback, useState } from "react";
import { Worker } from "@react-pdf-viewer/core";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "../../../api/axios";
import moment from "moment";

const columns = [
  { field: "deviceName", headerName: "DeviceName" },
  { field: "requestType", headerName: "Request Type" },
  { field: "status", headerName: "Status" },
  { field: "statusReason", headerName: "Status Reason" },
  { field: "requestedAt", headerName: "Requested By" },
  { field: "requestedBy", headerName: "Requested At" },
];

const Card2 = ({ fromDate, toDate }) => {
  const navigate = useNavigate();
  const { accessToken } = JSON?.parse(localStorage?.getItem("Port"));

  const [isLoading, setIsLoading] = useState(false);
  const [totalSize, setTotalSize] = useState(10);
  const [pageSize, setPageSize] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [rows, setRows] = useState([]);
  const handleToggle = useCallback(() => {}, []);
  const submitPdf = useCallback(() => {}, []);
  const handleChangePage = useCallback((_event, newPage) => {
    setPageNumber(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback(e => {
    setPageSize(parseInt(e.target.value, 10));
    setPageNumber(0);
  }, []);

  const deviceRegistrations = useCallback(() => {
    return axios.get("/admin/devices", {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      params: {
        from: !fromDate ? "2022-01-01" : moment(fromDate).format("YYYY-MM-DD"),
        to: !toDate
          ? moment(new Date()).format("YYYY-MM-DD")
          : moment(toDate).format("YYYY-MM-DD"),
      },
    });
  }, [accessToken, fromDate, toDate]);

  useEffect(() => {
    setIsLoading(true);
    deviceRegistrations()
      .then(res => {
        setIsLoading(false);
        const { totalSize } = res.data.data;
        setTotalSize(totalSize);
        return setRows(res.data.data.content);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, [deviceRegistrations]);

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
                <TableCell
                  align="left"
                  sx={{ backgroundColor: "#EFF2F7" }}
                  width="5%"
                >
                  ACTIONS
                </TableCell>
                {columns?.map(cell => (
                  <TableCell
                    key={cell.field}
                    align="left"
                    width="5%"
                    sx={{ backgroundColor: "#EFF2F7" }}
                  >
                    {cell.headerName}
                  </TableCell>
                ))}

                <TableCell
                  align="left"
                  sx={{ backgroundColor: "#EFF2F7" }}
                  width="5%"
                >
                  PASSWORD
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length + 2}>
                    <Typography p={5} textAlign="center">
                      <CircularProgress />
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : rows.length ? (
                rows?.map((user, index) => (
                  <TableRow key={Math.random()}>
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
                          {/* <EditIcon /> */}
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    {columns.map(({ field }) => (
                      <TableCell
                        key={Math.random()}
                        component="th"
                        scope="row"
                        align="left"
                      >
                        {user[field]}
                      </TableCell>
                    ))}

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
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length + 2}>
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

export default Card2;
