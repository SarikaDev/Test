import React, { useCallback, useRef, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import image from "../../assets/half-bg.png";
import Webcam from "react-webcam";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import axios from "../../api/axios";
import PATHS, { URL } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
const Face = () => {
  const navigate = useNavigate();
  const { identityNumber } = JSON.parse(localStorage.getItem("accessPoints"));

  const webCamRef = useRef(null);
  const imgRef = useRef(null);
  const [imgSrc, setImgsrc] = useState("");
  const [croppedImage, setCroppedImage] = useState("");
  const [cropped, setCropped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log("isLoading", isLoading);

  const videoConstraints = {
    width: 519,
    height: 400,
    facingMode: "user",
  };

  const handleNext = e => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(`${URL.AccessPoint.face}${identityNumber}/token`, {
        credential: croppedImage.replace("data:image/jpeg;base64,", ""),
        credentialType: "FACE",
      })
      .then(res => {
        localStorage.setItem("Port", JSON.stringify(res.data.data));
        navigate(PATHS.Ports.dashboard);
      })
      .catch(() => {
        navigate(PATHS.AccessPoint.login);
        localStorage.clear();
        setIsLoading(false);
      });
  };
  const handleCropChange = useCallback(() => {
    const croppedImgData = imgRef.current.cropper
      .getCroppedCanvas()
      .toDataURL("image/jpeg", 0.5);
    setCroppedImage(croppedImgData);
  }, []);

  const capture = useCallback(() => {
    setImgsrc(webCamRef.current.getScreenshot());
  }, [webCamRef]);

  const retake = () => {
    setCroppedImage("");
    setImgsrc("");
    setCropped(false);
  };

  const cropImage = () => {
    setImgsrc(croppedImage);
    setCropped(true);
  };

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
          backgroundColor: "#fff",
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          alignContent="center"
          justifyContent="center"
          height="19.2rem"
          width={1}
        >
          {/* //! imgSrc.length !== 0 ? "Activate WebCam " : cropper === true and cropperImage.length ? Show Image : <Cropper />   */}

          {!imgSrc?.length ? (
            <Webcam
              audio={false}
              height={300}
              ref={webCamRef}
              screenshotFormat="image/jpeg"
              width={400}
              style={{
                borderRadius: 5,
              }}
              videoConstraints={videoConstraints}
            />
          ) : (
            <Box>
              {cropped && croppedImage?.length ? (
                <img
                  alt="sda"
                  style={{
                    width: 350,
                    height: 280,
                  }}
                  src={croppedImage}
                />
              ) : (
                <Cropper
                  cropend={() => handleCropChange()}
                  ref={imgRef}
                  src={imgSrc}
                  zoomable={false}
                  autoCropArea={-0.01}
                  background={false}
                />
              )}
            </Box>
          )}
        </Box>

        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {/* //! image.length !== 0 ? "Capture-btn" : "Retake-btn"   */}
          {!imgSrc?.length ? (
            <Button variant={"contained"} onClick={() => capture()}>
              Capture
            </Button>
          ) : (
            <Box
              display="flex"
              flexDirection="row"
              marginTop="10px"
              gap={2}
              justifyContent="space-evenly"
            >
              <Button
                variant={"contained"}
                onClick={() => {
                  retake();
                }}
              >
                Re-take
              </Button>

              {/* //! cropper  === true ? "Continue-btn" : "Crop-btn"   */}

              {cropped ? (
                <Button variant={"contained"} onClick={handleNext}>
                  Continue
                </Button>
              ) : (
                <Button
                  variant={"contained"}
                  onClick={() => {
                    cropImage();
                  }}
                >
                  Crop
                </Button>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Face;
