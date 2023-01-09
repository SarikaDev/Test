import {
  Box,
  FormControl,
  InputLabel,
  Select as MuiSelect,
  styled,
} from "@mui/material";

const StyledInput = styled(MuiSelect)(({ theme }) => ({
  borderRadius: "5px",
  width: "calc(13dvw)",
  textAlign: "center",
}));

const InputField = ({ value, onChange, label, children, ...other }) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <StyledInput
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          size="small"
          onChange={onChange}
          {...other}
        >
          {children}
        </StyledInput>
      </FormControl>
    </Box>
  );
};

export default InputField;
