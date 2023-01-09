import {
  Avatar,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useCallback } from "react";
import profile_pic from "../../../assets/user.png";
import DvrIcon from "@mui/icons-material/Dvr";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
// import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
// import DatasetIcon from "@mui/icons-material/Dataset";
import { Link, useLocation } from "react-router-dom";
import CollapsableNav from "./CollapsableNav";
import PATHS from "../../../utils/constants";

const navItems = [
  {
    title: "Dashboard",
    link: PATHS.Ports.dashboard,
    icon: <DvrIcon />,
  },

  {
    title: "User Management",
    link: PATHS.Ports.userManagement.usersList,
    icon: <PersonAddAltRoundedIcon />,
    children: [
      {
        title: "Create User",
        link: PATHS.Ports.userManagement.createUser,
      },
      {
        title: "Update User",
        link: PATHS.Ports.userManagement.updateUser,
      },
    ],
  },
  // {
  //   title: "Metrics",
  //   link: "/metrics",
  //   icon: <InsertChartOutlinedIcon />,
  //   children: [
  //     {
  //       title: "Adjudication",
  //       link: "/adjudication",
  //     },
  //   ],
  // },
  // {
  //   title: "Datasets Reports",
  //   link: "datasets",
  //   icon: <DatasetIcon />,
  //   children: [
  //     {
  //       title: "Registrations",
  //       link: "/datasets/registrations",
  //     },
  //     { title: "Users", link: "/datasets/users" },
  //     {
  //       title: "Audit Trails",
  //       link: "/datasets/auditTrails",
  //     },
  //   ],
  // },
];

const DrawerList = ({ setIsOpen }) => {
  const location = useLocation();
  const { roleName, displayName, branchName, reportingRoleName } = JSON?.parse(
    localStorage?.getItem("Port"),
  );
  const details = JSON?.parse(localStorage?.getItem("Port"));

  const hasReportingRoleName =
    Object?.keys(details)?.includes("reportingRoleName");

  let roleBasedAccess = [];

  roleName?.includes("PRIMORDIAL_USER")
    ? roleBasedAccess?.push(navItems?.filter(navItem => navItem?.title))
    : roleName?.includes("USER_MANAGER") &&
      hasReportingRoleName === true &&
      reportingRoleName === "NONE"
    ? roleBasedAccess?.push(
        navItems?.filter(navItem => navItem?.title !== "Dashboard"),
      )
    : hasReportingRoleName === true &&
      reportingRoleName?.includes("REPORT") &&
      !roleName?.includes("USER_MANAGER")
    ? roleBasedAccess?.push(
        navItems?.filter(navItem => navItem !== "User Management"),
      )
    : hasReportingRoleName === true &&
      reportingRoleName?.includes("REPORT") &&
      roleName?.includes("USER_MANAGER")
    ? roleBasedAccess.push(navItems?.filter(navItem => navItem?.title))
    : roleName.includes("USER_MANAGER") && hasReportingRoleName === false
    ? roleBasedAccess.push(navItems?.filter(navItem => navItem !== "Dashboard"))
    : roleName.includes("ADJUDICATOR") ||
      roleName.includes("AGENT") ||
      roleName.includes("SELF_KYC_USER")
    ? roleBasedAccess?.push(
        navItems?.filter(navItem => navItem?.title !== "User Management"),
      )
    : roleBasedAccess?.push();

  const closeNavbar = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);
  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          ".MuiBox-root.css-ndow8k": {
            width: "236px",
          },
        }}
        marginY={2}
      >
        <Avatar
          alt="profile_pic"
          src={profile_pic}
          sx={{
            width: "60px",
            height: "60px",
            objectFit: "cover",
          }}
        />

        <Typography
          fontSize={{ xs: 14, md: 14, lg: 16 }}
          variant="h6"
          color="#343434"
          sx={{ fontWeight: "500" }}
        >
          {roleName}
        </Typography>

        <Typography
          fontSize={{ xs: 14, md: 14, lg: 14 }}
          variant="h6"
          color="#343434"
          sx={{ fontWeight: "500" }}
        >
          {branchName}
        </Typography>
        <Typography
          fontSize={{ xs: 14, md: 14, lg: 14 }}
          variant="h6"
          color="#343434"
          sx={{ fontWeight: "500" }}
        >
          {displayName}
        </Typography>
        <Typography
          fontSize={{ xs: 14, md: 14, lg: 14 }}
          variant="h6"
          color="#343434"
          sx={{ fontWeight: "500" }}
        >
          {reportingRoleName}
        </Typography>
      </Box>
      <List component="nav">
        {roleBasedAccess[0]?.map((navItem, index) =>
          !!navItem?.children?.length ? (
            <CollapsableNav
              key={index}
              onClick={closeNavbar}
              primary={navItem?.title}
              links={navItem?.children}
              icon={navItem?.icon}
              root={navItem?.link}
            />
          ) : (
            <Link to={navItem?.link} key={index}>
              <ListItemButton
                selected={navItem?.link === location?.pathname}
                onClick={closeNavbar}
              >
                <ListItemIcon>{navItem?.icon}</ListItemIcon>
                <ListItemText
                  fontSize={{ xs: 12, md: 9, lg: 15 }}
                  primary={navItem?.title}
                />
              </ListItemButton>
            </Link>
          ),
        )}
      </List>
    </>
  );
};

export default DrawerList;
