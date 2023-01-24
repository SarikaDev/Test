import React, { useCallback } from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CollapsableNavbar from "./CollapsableNavbar";
import { useLocation } from "react-router-dom";
import Link from "../../global/Link";
import PATHS from "../../../utils/constants";
import DvrIcon from "@mui/icons-material/Dvr";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import DevicesIcon from "@mui/icons-material/Devices";
import DatasetIcon from "@mui/icons-material/Dataset";
const navItems = [
  { title: "Dashboard", link: PATHS.Ports.dashboard, icon: <DvrIcon /> },
  {
    title: "User Management",
    link: PATHS.Ports.userManagement.root,
    icon: <PersonAddAltRoundedIcon />,
    children: [
      {
        title: "Create User",
        link: PATHS.Ports.userManagement.createUser,
      },
    ],
  },
  {
    title: "Datasets Reports",
    link: PATHS.Ports.datasets.registrations,
    icon: <DatasetIcon />,
    children: [
      {
        title: "Registrations",
        link: PATHS.Ports.datasets.registrations,
      },
      {
        title: "Users",
        link: PATHS.Ports.datasets.users,
      },
      {
        title: "Audit Trails",
        link: PATHS.Ports.datasets.auditTrails,
      },
    ],
  },
  {
    title: "Device Management",
    link: PATHS.Ports.deviceManagement.registrations,
    icon: <DevicesIcon />,

    children: [
      {
        title: "Activate/DeActivate",
        link: PATHS.Ports.deviceManagement.Activation,
      },
    ],
  },
];
const DrawerList = ({ setIsOpen }) => {
  const location = useLocation();
  const closeNavbar = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);
  return (
    <List component={"nav"}>
      {navItems?.map((navItem, index) =>
        !!navItem?.children?.length ? (
          <CollapsableNavbar
            key={index}
            onClick={closeNavbar}
            icon={navItem.icon}
            primary={navItem.title}
            links={navItem.children}
            root={navItem.link}
          />
        ) : (
          <List key={index}>
            <Link to={navItem.link}>
              <ListItemButton
                selected={navItem?.link === location.pathname}
                onClick={closeNavbar}
              >
                <ListItemIcon>{navItem.icon}</ListItemIcon>
                <ListItemText primary={navItem.title} />
              </ListItemButton>
            </Link>
          </List>
        ),
      )}
    </List>
  );
};

export default DrawerList;
