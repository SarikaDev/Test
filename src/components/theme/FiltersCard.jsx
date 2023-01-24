import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import moment from "moment";
import React, { useCallback, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Autocomplete from "../global/AutoComplete";
import SelectField from "../global/SelectField";
import Text from "../global/TextField";
import { toast } from "react-toastify";
const FiltersCard = ({
  title,
  selectedValue,
  filterChannel,
  handleSelectField,
  handleMobileNumber,
  handleSubmit,
  branch,
  branchValue,
  district,
  districtValue,
  setBranchValue,
  setDistrictValue,
  setFromDate,
  setToDate,
  setSearch,
}) => {
  const [fromDate2, setFromDate2] = useState("");
  const [toDate2, setToDate2] = useState("");

  const submitDate = useCallback(
    e => {
      e.preventDefault();
      if (!fromDate2) {
        return toast.error("Please Enter  From Date");
      }
      if (!toDate2) {
        return toast.error("Please Enter  To Date");
      }
      if (
        moment(fromDate2, "DD/MM/YYYY").unix() >
        moment(toDate2, "DD/MM/YYYY").unix()
      ) {
        return toast.error(`From Date must be smaller than To Date`);
      }
      setFromDate(fromDate2);
      setToDate(toDate2);
    },
    [fromDate2, setFromDate, setToDate, toDate2],
  );
  return (
    <Box
      component={Paper}
      margin={2}
      elevation={5}
      height={"auto"}
      minHeight="20dvh"
    >
      <Box>
        <Typography
          align="left"
          variant="h6"
          paddingX={2.5}
          paddingY={1.5}
          fontStyle="normal"
          fontWeight={600}
        >
          {title}
        </Typography>
      </Box>
      <Box width={1}>
        <Stack
          display="flex"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="nowrap"
          padding={2}
        >
          <Stack flexDirection="row">
            <SelectField value={selectedValue} onChange={handleSelectField}>
              {filterChannel?.map(({ value, label }) => (
                <MenuItem value={value} key={label}>
                  {label}
                </MenuItem>
              ))}
            </SelectField>
            {/* {selectedValue === "name" && (
                <Autocomplete
                  options={displayName}
                  label="Select By Name"
                  value={setSearch(name?.label)}
                  setValue={setName}
                  getOptionLabel={option => option?.label}
                  isOptionEqualToValue={(option, value) =>
                    option?.label === value?.label
                  }
                />
              )} */}
            {selectedValue === "mobileNumber" && (
              <>
                <Text label="Search Here" onChange={handleMobileNumber} />
                <Button
                  variant="outlined"
                  sx={{ ml: 1 }}
                  onClick={handleSubmit}
                >
                  submit
                </Button>
              </>
            )}
            {selectedValue === "branchId" && (
              <Autocomplete
                options={branch}
                label="Select By Branch"
                value={setSearch(branchValue?.value)}
                setValue={setBranchValue}
                getOptionLabel={option => option?.label}
                isOptionEqualToValue={(option, value) =>
                  option?.label === value?.label
                }
              />
            )}
            {selectedValue === "district" && (
              <Autocomplete
                options={district}
                label="Select By District"
                value={setSearch(districtValue?.value)}
                setValue={setDistrictValue}
                getOptionLabel={option => option?.label}
                isOptionEqualToValue={(option, value) =>
                  option?.label === value?.label
                }
              />
            )}
          </Stack>
          <Box>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                inputFormat="DD/MM/YYYY"
                label="From Date"
                value={fromDate2}
                disableFuture
                onChange={newValue => {
                  setFromDate2(newValue);
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    size="small"
                    error={false}
                    sx={{
                      "& .MuiInputBase-input": {
                        width: 85,
                      },
                      "& .MuiOutlinedInput-input": {
                        borderRadius: "0",
                      },
                    }}
                  />
                )}
              />
              <DatePicker
                inputFormat="DD/MM/YYYY"
                label="To Date"
                value={toDate2}
                disableFuture
                shouldDisableDate={date =>
                  moment(fromDate2, "DD/MM/YYYY", true).diff(date) > 0
                }
                onChange={newValue => {
                  setToDate2(newValue);
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    size="small"
                    error={false}
                    sx={{
                      "& .MuiInputBase-input": {
                        width: 85,
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
            <Button
              variant="contained"
              sx={{ marginLeft: 1 }}
              onClick={submitDate}
            >
              Search
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default FiltersCard;
