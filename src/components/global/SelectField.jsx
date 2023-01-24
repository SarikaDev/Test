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

const SelectField = ({ value, onChange, children, ...other }) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <StyledInput
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
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

export default SelectField;
