import React from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import image from "../../assets/half-bg.png";
import logo from "../../assets/BoA logo.png";
import { useNavigate } from "react-router-dom";
import PasswordIcon from "@mui/icons-material/Password";
import FaceIcon from "@mui/icons-material/Face";
import PATHS from "../../utils/constants";
const LoginTypes = () => {
  const navigate = useNavigate();
  const { credentials } = JSON.parse(localStorage.getItem("accessPoints"));
  return (
    <Box
      component="div"
      width="100dvw"
      height="100dvh"
      bgcolor="#e6e6e6"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        width={"35dvw"}
        borderRight="none"
        borderRadius={"5% 0 0 5%"}
        height={"50dvh"}
        sx={{ background: `url(${image}) bottom center no-repeat #f0ac11` }}
      >
        <Stack margin={5}>
          <Typography
            variant="h6"
            textTransform={"uppercase"}
            align="center"
            fontWeight={600}
            color="#fff"
          >
            Bank 24/7 with our virtual banking
          </Typography>
          <Typography
            variant="body1"
            textTransform={"uppercase"}
            align="center"
            marginY={3}
            fontWeight={600}
            color="#fff"
          >
            Discover more ways to bank than ever
          </Typography>
        </Stack>
      </Box>
      <Box
        borderRadius={"0 5% 5% 0"}
        borderLeft="none"
        width={"35dvw"}
        height={"50dvh"}
        sx={{
          background: `url(${logo}) top center no-repeat #fff`,
          backgroundPositionX: "center",
          backgroundPositionY: "8%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack gap={2}>
          <Typography
            variant="body1"
            textTransform={"uppercase"}
            align="center"
            color="#efaa14"
            fontWeight={800}
          >
            Welcome
          </Typography>
          <Typography
            variant="body2"
            textTransform="uppercase"
            align="center"
            fontWeight={600}
          >
            Please Select Mode of Authentication
          </Typography>
          <Box display="flex" justifyContent="space-evenly" alignItems="center">
            {credentials.includes("PASSWORD") ? (
              <IconButton
                sx={{ bgcolor: "#efaa14", color: "#fff", padding: "15px" }}
                onClick={() => navigate(PATHS.AccessPoint.password)}
              >
                <PasswordIcon fontSize="large" />
              </IconButton>
            ) : null}
            {credentials.includes("FACE") ? (
              <IconButton
                sx={{ bgcolor: "#efaa14", color: "#fff", padding: "15px" }}
                onClick={() => navigate(PATHS.AccessPoint.face)}
              >
                <FaceIcon fontSize="large" />
              </IconButton>
            ) : null}
            {credentials.includes("FINGER") ? (
              <IconButton
                sx={{ bgcolor: "#efaa14", color: "#fff", padding: "15px" }}
                onClick={() => navigate("/face")}
              >
                <FaceIcon fontSize="large" />
              </IconButton>
            ) : null}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default LoginTypes;
