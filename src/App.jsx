import { Box, CssBaseline } from "@mui/material";
import React from "react";
import { ToastContainer } from "react-toastify";
import HandleRoutes from "./routes/HandleRoutes";
const App = () => {
  return (
    <Box>
      <CssBaseline />
      <ToastContainer
        closeOnClick={true}
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
      />
      <HandleRoutes />
    </Box>
  );
};

export default App;
