import React, { useCallback, useState } from "react";
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
  { field: "createdAt", headerName: "Created Date" },
  { field: "actorName", headerName: "Actor Name" },
  {
    field: "channel",
    headerName: "Channel",
  },
  {
    field: "clientType",
    headerName: "Client Type",
  },
  {
    field: "result",
    headerName: "Result",
  },
  {
    field: "identityNumber",
    headerName: "Identity Number",
  },
  { field: "eventType", headerName: "Event Type" },
  {
    field: "description",
    headerName: "Description",
  },
  {
    field: "eventTypeSpecificAttributes",
    headerName: "Event_Type_Specific_Attributes",
  },
];
const AuditTrails = () => {
  const location = useLocation();
  const [mobileNumber, setMobileNumber] = useState("");
  const { accessToken } = JSON?.parse(localStorage?.getItem("Port"));
  const [selectedValue, setselectedValue] = useState("mobileNumber");

  const getAuditTrails = useCallback(
    params => {
      return axios.get("/admin/reporting/events", {
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
      title="Audit Trail Events"
      filterChannel={filterChannel}
      selectedValue={selectedValue}
      setselectedValue={setselectedValue}
      tableHeading={tableHeading}
      apiProps={getAuditTrails}
      mobileNumber={mobileNumber}
      setMobileNumber={setMobileNumber}
      root={location.pathname}
    />
  );
};

export default AuditTrails;
