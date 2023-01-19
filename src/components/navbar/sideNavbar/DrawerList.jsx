import React, { useCallback } from "react";
import AcUnitIcon from "@mui/icons-material/AcUnit";
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
const navItems = [
  { title: "Dashboard", link: PATHS.Ports.dashboard, icon: <AcUnitIcon /> },
  {
    title: "User Management",
    link: PATHS.Ports.userManagement.root,
    icon: <AcUnitIcon />,
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
    icon: <AcUnitIcon />,
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
];
const DrawerList = ({ setIsOpen }) => {
  const closeNavbar = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);
  const location = useLocation();
  return (
    <List component={"nav"}>
      {navItems?.map((navItem, index) =>
        !!navItem?.children?.length ? (
          <CollapsableNavbar
            key={index}
            onClick={closeNavbar}
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
