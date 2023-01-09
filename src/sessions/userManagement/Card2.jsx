import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Paper,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "../../api/axios";
import moment from "moment";

const Card2 = ({ fromDate, toDate, pageSize }) => {
  const { accessToken } = JSON?.parse(localStorage?.getItem("Port"));
  const [rows, setRows] = useState([]);

  const handleToggle = useCallback(() => {}, []);

  const userList = useCallback(() => {
    return axios.get("user", {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      params: {
        pageSize,
        ...(fromDate && {
          fromLastUpdated: moment(fromDate).format("YYYY-MM-DD"),
        }),
        ...(toDate && {
          toLastUpdated: moment(toDate).format("YYYY-MM-DD"),
        }),
      },
    });
  }, [accessToken, fromDate, pageSize, toDate]);
  useEffect(() => {
    userList().then(res => setRows(res.data.data.content));
  }, [userList]);

  const columns = [
    { field: "displayName", headerName: "Name", width: 20 },
    { field: "mobileNumber", headerName: "Mobile Number", width: 50 },
    { field: "role", headerName: "Roles", width: 50 },
    { field: "branchName", headerName: "Branch Name", width: 50 },
    { field: "status", headerName: "Status", width: 50 },
    { field: "lastLogin", headerName: "Last Login", width: 50 },
    { field: "createdAt", headerName: "Created Date", width: 50 },
    { field: "createdBy", headerName: "Created By", width: 50 },
    { field: "updatedAt", headerName: "Last Modified Date", width: 50 },
    { field: "updatedBy", headerName: "Last Modified By", width: 50 },
  ];

  return (
    <Paper
      elevation={5}
      sx={{
        margin: 2,
        maxWidth: "50%",
      }}
    >
      <Stack
        alignItems="flex-end"
        direction="row"
        justifyContent="flex-end"
        p={1.2}
        gap={2}
      >
        <Typography color="error" fontWeight={600} letterSpacing={2}>
          EXPORT as
        </Typography>
        <Button size="small" variant="outlined">
          PDF
        </Button>
        <Button size="small" variant="outlined">
          CSV
        </Button>
      </Stack>

      <TableContainer
        component={Paper}
        elevation={2}
        sx={{
          minHeight: "calc(82dvh - 150px)",
          minWidth: 250,
        }}
      >
        <Table stickyHeader>
          <TableHead sx={{ backgroundColor: "red" }}>
            <TableRow>
              {columns.map(({ headerName, width }) => (
                <TableCell
                  key={Math.random()}
                  align="left"
                  sx={{ backgroundColor: "#EFF2F7", width: { width } }}
                >
                  {headerName}
                </TableCell>
              ))}
              <TableCell
                key={Math.random()}
                align="left"
                sx={{ backgroundColor: "#EFF2F7" }}
              >
                PASSWORD
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map(user => (
              <TableRow key={Math.random()}>
                {columns.map(({ field }) => (
                  <TableCell key={field} align="left">
                    {user[field]}
                  </TableCell>
                ))}
                <TableCell align="left">
                  <Switch
                    checked={user.passwordEnabled}
                    onChange={() => handleToggle()}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Card2;
