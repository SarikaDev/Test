import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";

const Dashboard = () => {
  const data = JSON.parse(localStorage.getItem("Port"));
  console.log("data", data);
  return (
    <Box border="2px solid red" height={"90.4dvh"}>
      <Stack
        component={Paper}
        elevation={5}
        minWidth={"50dvw"}
        minHeight={"35dvh"}
        border="2px solid red"
        marginY={5}
        marginX={2}
        sx={{ backgroundColor: "#fff" }}
      >
        <Box component="div">
          <Typography>asaasasa</Typography>
        </Box>
      </Stack>
      <Stack
        component={Paper}
        elevation={5}
        minWidth={"50dvw"}
        minHeight={"35dvh"}
        border="2px solid red"
        marginY={5}
        marginX={2}
        sx={{ backgroundColor: "#fff" }}
      >
        <Box component="div">
          <Typography>asaasasa</Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default Dashboard;
