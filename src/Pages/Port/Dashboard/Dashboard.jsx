import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";

const Dashboard = () => {
  const data = JSON.parse(localStorage.getItem("Port"));
  console.log("data", data);
  return (
    <Stack
      gap={2}
      margin={2}
      position="absolute"
      top={75}
      left={0}
      right={0}
      bottom={0}
    >
      <Stack
        component={Paper}
        elevation={5}
        height={"15dvh"}
        border="2px solid blue"
        sx={{ backgroundColor: "#fff" }}
      >
        <Box component="div">
          <Typography>asaasasa</Typography>
        </Box>
      </Stack>
      <Box
        component={Paper}
        elevation={5}
        position="sticky"
        height=" calc( 80dvh - 50px )"
        border="2px solid red"
        sx={{ backgroundColor: "#fff" }}
      >
        <Box component="div">
          <Typography>asaasasa</Typography>
        </Box>
      </Box>
    </Stack>
  );
};

export default Dashboard;
