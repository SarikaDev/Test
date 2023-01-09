import { Box, Button, Paper, Stack, Typography } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "../../../api/axios";
import React, { useCallback, useEffect, useState } from "react";
import Card1 from "../../../sessions/userManagement/userList/Card1";
import { URL } from "../../../utils/constants";
import moment from "moment";
import Card2 from "../../../sessions/userManagement/Card2";
// import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [branch, setBranch] = useState([]);
  const [district, setDistrict] = useState([]);
  const [fromDate, setFromDate] = useState("2022-01-01");
  const [toDate, setToDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [pageSize, setPageSize] = useState(10);
  const [filterOptions, setFilterOptions] = useState("mobileNumber");
  const [branchValue, setBranchValue] = useState(null);
  const [districtValue, setDistrictValue] = useState(null);
  const { accessToken } = JSON?.parse(localStorage?.getItem("Port"));
  console.log("fromDate", moment(fromDate).format("YYYY-MM-DD"));
  console.log("toDate", moment(toDate).format("YYYY-MM-DD"));
  // const navigate = useNavigate();
  const handleSearch = useCallback(() => {}, []);
  const onChange = useCallback(e => {
    setFilterOptions(e.target.value);
  }, []);

  // const [isLoading, setIsLoading] = useState(false);
  //! getBranches Request
  useEffect(() => {
    axios.defaults.headers.common.authorization = `Bearer ${accessToken}`;
    axios
      .get(URL.Ports.branch)
      .then(res => {
        const { labelValues } = res?.data?.data;
        setBranch(labelValues.sort((a, b) => a?.label.localeCompare(b?.label)));
      })
      .catch(err => {
        console.error(err);
      });
  }, [accessToken]);

  //! getDistricts Request
  useEffect(() => {
    axios
      .get(URL.Ports.district)
      .then(res => {
        const { labelValues } = res?.data?.data;
        setDistrict(labelValues.sort((a, b) => a.label.localeCompare(b.label)));
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <Box width={"100%"}>
      <Card1
        setFromDate={setFromDate}
        setToDate={setToDate}
        // filterOptions={filterOptions}
        // branchValue={branchValue}
        // setBranchValue={setBranchValue}
        // districtValue={districtValue}
        // setDistrictValue={setDistrictValue}
        // handleSearch={handleSearch}
        // onChange={onChange}
        // fromDate={fromDate}
        // toDate={toDate}
        // branch={branch}
        // district={district}
      />
      <Card2 pageSize={pageSize} fromDate={fromDate} toDate={toDate} />
    </Box>
  );
};

export default UserList;
