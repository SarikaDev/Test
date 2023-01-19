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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Link from "../../global/Link";
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
            {open ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </IconButton>
        </ListItemButton>
      </Link>
      <Collapse in={open} timeout="auto">
        <List component="nav">
          {links?.map(({ link, icon, title }, index) => (
            <React.Fragment key={index}>
              <Link to={link}>
                <ListItemButton
                  onClick={onClick}
                  selected={link === location.pathname}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={title} />
                </ListItemButton>
              </Link>
            </React.Fragment>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default CollapsableNavbar;
