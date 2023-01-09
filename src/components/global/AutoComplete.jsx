import { TextField, Autocomplete as MuiAuto } from "@mui/material";

const Autocomplete = ({
  options,
  label,
  value,
  setValue,
  getOptionLabel,
  isOptionEqualToValue,
}) => {
  return (
    <MuiAuto
      clearOnBlur
      sx={{ width: "20dvw" }}
      size="small"
      options={options}
      getOptionLabel={getOptionLabel}
      value={value}
      isOptionEqualToValue={isOptionEqualToValue}
      onChange={(_event, newValue) => {
        setValue(newValue);
      }}
      renderInput={params => <TextField {...params} label={label} />}
    />
  );
};

export default Autocomplete;
