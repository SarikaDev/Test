import { Box } from "@mui/material";
import Top from "../../components/navbar/topNavbar/Top";
import Drawer from "../../components/navbar/sideNavbar/Drawer";
import DrawerList from "../../components/navbar/sideNavbar/DrawerList";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import CardWrapper from "./CardWrapper";
const MenuBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Box>
      <Top setIsOpen={setIsOpen} />
      <Box display="flex">
        <Drawer isOpen={isOpen}>
          <DrawerList setIsOpen={setIsOpen} />
        </Drawer>
        <CardWrapper>
          <Outlet />
        </CardWrapper>
      </Box>
    </Box>
  );
};

export default MenuBar;
