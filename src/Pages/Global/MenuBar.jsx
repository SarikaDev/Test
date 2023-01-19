import { Box, Paper, Stack, Toolbar } from "@mui/material";
import Navbar from "../../components/navbar/topNavbar/Navbar";
import Drawer from "../../components/navbar/sideNavbar/Drawer";
import DrawerList from "../../components/navbar/sideNavbar/DrawerList";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
const MenuBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Box component={Stack} direction="row">
      <Navbar setIsOpen={setIsOpen} />
      <Drawer isOpen={isOpen}>
        <DrawerList setIsOpen={setIsOpen} />
      </Drawer>
      <Box
        component={Paper}
        height={"auto"}
        minHeight={"100dvh"}
        position="relative"
        display="flex"
        flexDirection="column"
        width={1}
        sx={{
          backgroundColor: "grey",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MenuBar;
