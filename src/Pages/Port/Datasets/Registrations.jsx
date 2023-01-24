import { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../../api/axios";
import GlobalTheme from "../../../components/theme/GlobalTheme";

const filterChannel = [
  { value: "branchId", label: "Branch" },
  { value: "district", label: "District" },
];

const tableHeading = [
  { field: "fullName", headerName: "FullName" },
  { field: "mobileNumber", headerName: "Mobile Number" },
  { field: "agentName", headerName: "Agent Name" },
  { field: "adjudicatorName", headerName: "Adjudicator Name" },
  { field: "status", headerName: "Status" },
  { field: "createdAt", headerName: "Created Date" },
];

const Registrations = () => {
  const location = useLocation();
  const { accessToken } = JSON?.parse(localStorage?.getItem("Port"));
  const [selectedValue, setselectedValue] = useState("branchId");
  const getRegistrations = useCallback(
    params => {
      return axios.get("/admin/reporting/enrollments/list", {
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
      title="Registrations"
      filterChannel={filterChannel}
      selectedValue={selectedValue}
      setselectedValue={setselectedValue}
      tableHeading={tableHeading}
      apiProps={getRegistrations}
      root={location.pathname}
    />
  );
};

export default Registrations;
