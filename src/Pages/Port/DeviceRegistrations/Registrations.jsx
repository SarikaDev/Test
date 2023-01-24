import { Box } from "@mui/material";
import { useState } from "react";
import Card1 from "../../../sessions/deviceManagement/deviceRegistrations/Card1";
import Card2 from "../../../sessions/deviceManagement/deviceRegistrations/Card2";

const Registrations = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  return (
    <Box>
      <Card1 setFromDate={setFromDate} setToDate={setToDate} />
      <Card2 fromDate={fromDate} toDate={toDate} />
    </Box>
  );
};

export default Registrations;
