import {
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Link from "../../global/Link";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
const CollapsableNavbar = ({ primary, links, root, icon, onClick }) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Link to={root}>
        <ListItemButton
          selected={location.pathname.includes(root)}
          onClick={() => {
            setOpen(prev => !prev);
          }}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText
            onClick={onClick}
            fontSize={{ xs: 2, md: 3, lg: 2 }}
            primary={primary}
          />
          <IconButton>
            {open ? <ChevronRightOutlinedIcon /> : <ExpandMore />}
          </IconButton>
        </ListItemButton>
      </Link>
      <Collapse in={open} timeout="auto">
        <List component="nav">
          {links?.map(({ link, title }, index) => (
            <React.Fragment key={index}>
              <Link to={link}>
                <ListItemButton
                  onClick={onClick}
                  selected={link === location.pathname}
                >
                  <ListItemText
                    primary={title}
                    sx={{ alignContent: "center" }}
                  />
                </ListItemButton>
                {/* <ListItemIcon>
                  <DoneIcon />
                </ListItemIcon> */}
              </Link>
            </React.Fragment>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default CollapsableNavbar;
