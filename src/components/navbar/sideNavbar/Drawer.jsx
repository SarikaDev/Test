import { Toolbar } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";
const drawerWidth = 234;

const MuiDrawer = ({ isOpen, children, ...other }) => {
  const isLarge = useMediaQuery("(min-width:1100px)");

  return (
    <Drawer
      sx={{
        width: drawerWidth,

        ".css-dm4aar-MuiPaper-root-MuiDrawer-paper": { width: drawerWidth },
        ".css-12i7wg6-MuiPaper-root-MuiDrawer-paper": { width: drawerWidth },
        backgroundColor: "#FFFFFF",
        zIndex: 0,
      }}
      {...other}
      variant={isLarge ? "permanent" : "temporary"}
      open={isLarge || isOpen}
      anchor="left"
    >
      <Toolbar />
      {children}
    </Drawer>
  );
};

export default MuiDrawer;
