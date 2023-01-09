import React, { useCallback, useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  InputAdornment,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import image from "../../assets/half-bg.png";
import logo from "../../assets/BoA logo.png";
import Text from "../../components/global/TextField";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import PATHS, { URL } from "../../utils/constants";
const Login = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = useCallback(e => {
    if (e.target) {
      setMobileNumber(e.target.value.replace(/\D/g, ""));
    }
  }, []);

  const focusRef = useRef(null);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      if (
        mobileNumber.length === 9 &&
        (mobileNumber.startsWith("9") || mobileNumber.startsWith("7"))
      ) {
        setIsLoading(true);
        axios
          .get(URL.AccessPoint.login, {
            params: {
              "attribute-name": "MobileNumber",
              "attribute-value": mobileNumber,
            },
          })
          .then(res => {
            localStorage.setItem("accessPoints", JSON.stringify(res.data.data));

            navigate(PATHS.AccessPoint.loginTypes);
          })
          .catch(err => {
            console.log(err);
            setIsLoading(false);
          });

        setMobileNumber("");
      } else if (mobileNumber.length < 9) {
        toast.error("Number Must Contain 9 Digits");
      } else {
        toast.error("Number Must Start With 9 or  7 ");
      }
    },
    [mobileNumber, navigate],
  );

  useEffect(() => {
    if (mobileNumber.length === 9) focusRef.current.focus();
  }, [mobileNumber.length]);
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
              <Text
                sx={{
                  "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
                    borderRadius: "0px",
                  },
                }}
                onChange={handleChange}
                width={220}
                height={40}
                value={mobileNumber}
                label="MobileNumber"
                inputProps={{ maxLength: 9 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+251</InputAdornment>
                  ),
                }}
              />
              <Button
                fullWidth
                ref={focusRef}
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

export default Login;
