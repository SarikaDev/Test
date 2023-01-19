import React, { useCallback, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Stack,
  Typography,
  OutlinedInput,
  CircularProgress,
} from "@mui/material";
import image from "../../assets/half-bg.png";
import logo from "../../assets/BoA logo.png";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import PATHS, { URL } from "../../utils/constants";
const Password = () => {
  const { identityNumber } = JSON.parse(localStorage.getItem("accessPoints"));
  console.log("identityNumber", identityNumber);

  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleClickShowPassword = () => setShowPassword(prev => !prev);
  const Password = btoa(password);
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      setIsLoading(true);
      axios
        .post(`${URL.AccessPoint.password}${identityNumber}/token`, {
          headers: {
            "X-Client-Type": "WEB",
          },
          credential: Password,
          credentialType: "PASSWORD",
        })
        .then(res => {
          localStorage.setItem("Port", JSON.stringify(res.data.data));
          navigate(PATHS.Ports.dashboard);
        })
        .catch(err => {
          console.log("err", err);
          setIsLoading(false);
        });
    },
    [Password, identityNumber, navigate],
  );

  return (
    <Box
      component="div"
      width="100dvw"
      height="100dvh"
      bgcolor="grey"
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
        {isLoading ? (
          <Box>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Stack
              justifyContent="center"
              alignItems="center"
              gap={2}
              marginTop={2}
            >
              <form>
                <FormControl>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    type={showPassword ? "text" : "password"}
                    autoComplete="password"
                    onChange={e => setPassword(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </form>
              <Button
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                sx={{ bgcolor: "#efaa14" }}
              >
                Submit
              </Button>
            </Stack>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Password;
