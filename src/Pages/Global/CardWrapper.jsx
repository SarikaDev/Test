import { styled } from "@mui/material";
import { Box } from "@mui/material";

const ContainerWrapper = styled(Box)(() => ({
  width: "100%",
  height: "calc(100dvh - 70px)",
  backgroundColor: "grey",
}));

const CardWrapper = ({ children, ...other }) => (
  <ContainerWrapper {...other}>{children}</ContainerWrapper>
);

export default CardWrapper;
