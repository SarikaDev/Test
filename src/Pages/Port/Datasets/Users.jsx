import { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../../api/axios";
import GlobalTheme from "../../../components/theme/GlobalTheme";

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
const Users = () => {
  const { accessToken } = JSON?.parse(localStorage?.getItem("Port"));
  const location = useLocation();
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

export default Users;
