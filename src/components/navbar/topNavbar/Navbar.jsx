import { useCallback } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../../assets/BoA logo.png";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { styled, Tooltip, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PATHS, { SM_WIDTH } from "../../../utils/constants";
const Img = styled("img")(() => ({
  width: "208px",
  height: "51px",
  cursor: "pointer",
}));
const Navbar = ({ setIsOpen }) => {
  const isLarge = useMediaQuery(`(min-width:${SM_WIDTH}px)`);

  const toggleNavbar = useCallback(() => {
    setIsOpen(prev => !prev);
  }, [setIsOpen]);
  const navigate = useNavigate();
  const handleImageClick = useCallback(() => {}, []);

  return (
    <AppBar position="fixed" width={1} sx={{ zIndex: 5555 }}>
      <Toolbar>
        {!isLarge && (
          <Tooltip title="Open Navigation">
            <IconButton onClick={toggleNavbar}>
              <MenuIcon />
            </IconButton>
          </Tooltip>
        )}
        <Box width={1}>
          <Img src={logo} alt="Boa_logo" onClick={() => handleImageClick()} />
        </Box>

        <Tooltip title="LogOut">
          <IconButton
            onClick={() => {
              localStorage.clear();
              navigate(PATHS.AccessPoint.login);
            }}
          >
            <MeetingRoomIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
