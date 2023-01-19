import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
const CreateUser = () => {
  return (
    <Box component={Stack} alignItems="center">
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          minWidth: 300,
          width: "35dvw",
          borderRadius: 2,
          position: "absolute",
          marginY: 1.8,
          height: "auto",
          border: "2px solid blue",
          minHeight: "85dvh",
        }}
      >
        <PersonAddAltIcon sx={{ fontSize: "4rem" }} />
        <Typography
          variant="h5"
          textTransform="uppercase"
          letterSpacing={5}
          lineHeight={3}
          fontWeight={600}
        >
          Create User
        </Typography>
        <Stack gap={2} width={"75%"} p={4}>
          <TextField size="small" label="Mobile Number" />
          <TextField size="small" label="User Name" />
          <TextField size="small" label="Role" />
          <TextField size="small" label="Select Branch Name" />
          <TextField size="small" label="Select Status" />

          <Button variant="contained" sx={{ mt: 2 }}>
            Submit
          </Button>
        </Stack>
      </Card>
    </Box>
  );
};

export default CreateUser;
