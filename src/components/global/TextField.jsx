import { Box, styled, TextField } from "@mui/material";

const StyledText = styled(TextField)(({ theme }) => ({
  borderRadius: 0,
}));

const Text = ({ label, onChange, other }) => {
  return (
    <Box
      component="form"
      sx={{
        "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
          borderRadius: "0px",
        },
      }}
      noValidate
      autoComplete="off"
    >
      <StyledText
        label={label}
        onChange={onChange}
        type="text"
        autoFocus
        size="small"
        {...other}
      />
    </Box>
  );
};

export default Text;
