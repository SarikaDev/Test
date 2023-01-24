import axios from "../../../api/axios";
import React, { useCallback, useState } from "react";
import GlobalTheme from "../../../components/theme/GlobalTheme";
import { useLocation } from "react-router-dom";

const filterChannel = [
  { value: "name", label: "Name" },
  { value: "mobileNumber", label: "Mobile Number" },
  { value: "branchId", label: "Branch" },
  { value: "district", label: "District" },
];

const tableHeading = [
  { field: "displayName", headerName: "Name" },
  { field: "mobileNumber", headerName: "Mobile Number" },
  { field: "role", headerName: "Roles" },
  { field: "branchName", headerName: "Branch Name" },
  { field: "status", headerName: "Status" },
  { field: "lastLogin", headerName: "Last Login" },
  { field: "createdAt", headerName: "Created Date" },
  { field: "createdBy", headerName: "Created By" },
  { field: "updatedAt", headerName: "Last Modified Date" },
  { field: "updatedBy", headerName: "Last Modified By" },
];
const UserList = () => {
  const { accessToken } = JSON?.parse(localStorage?.getItem("Port"));
  const location = useLocation();
  console.log("location", location);
  const [selectedValue, setselectedValue] = useState("mobileNumber");
  const [mobileNumber, setMobileNumber] = useState("");

  const getUsersList = useCallback(
    params => {
      return axios.get("user", {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        params,
      });
    },
    [accessToken],
  );

  return (
    <GlobalTheme
      title="Users"
      filterChannel={filterChannel}
      selectedValue={selectedValue}
      setselectedValue={setselectedValue}
      tableHeading={tableHeading}
      apiProps={getUsersList}
      mobileNumber={mobileNumber}
      setMobileNumber={setMobileNumber}
      root={location.pathname}
    />
  );
};

export default UserList;
