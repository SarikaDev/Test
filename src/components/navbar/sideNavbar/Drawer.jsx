import React from "react";
import { Drawer as MuiDrawer, Toolbar, useMediaQuery } from "@mui/material";
import { SM_WIDTH } from "../../../utils/constants";
const Drawer = ({ children, isOpen, ...other }) => {
  const drawWidth = 234;

  const isLarge = useMediaQuery(`(min-width:${SM_WIDTH}px)`);
  return (
    <MuiDrawer
      anchor="left"
      variant={isLarge ? "permanent" : "temporary"}
      open={isLarge || isOpen}
      sx={{
        width: drawWidth,
        backgroundColor: "#fffff",
        ".css-dm4aar-MuiPaper-root-MuiDrawer-paper": { width: drawWidth },
        ".css-12i7wg6-MuiPaper-root-MuiDrawer-paper": { width: drawWidth },
      }}
      {...other}
    >
      <Toolbar />
      {children}
    </MuiDrawer>
  );
};

export default Drawer;
