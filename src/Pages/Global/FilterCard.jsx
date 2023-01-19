import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useCallback, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { toast } from "react-toastify";

const FilterCard = ({ setFromDate, setToDate, setMobileNumber }) => {
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
    <Stack
      direction="column"
      justifyContent="space-between"
      component={Paper}
      margin={2}
      elevation={5}
      height={"20dvh"}
      border="2px solid blue"
    >
      <Typography
        align="left"
        variant="h6"
        paddingX={2.5}
        paddingY={1.5}
        fontStyle="normal"
        fontWeight={600}
      >
        User List
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding={1.2}
      >
        {/* <Box p={1.5} display="flex">
          <InputField value={filterOptions} label="" onChange={onChange}>
            <MenuItem value={"district"}>District</MenuItem>
            <MenuItem value={"mobileNumber"}>Mobile Number</MenuItem>
            <MenuItem value={"branch"}>Branch</MenuItem>
          </InputField>
          {filterOptions === "branch" ? (
            <Autocomplete
              options={branch}
              label="Select By Branch"
              value={branchValue}
              setValue={setBranchValue}
              getOptionLabel={option => option?.label}
              isOptionEqualToValue={(option, selected) =>
                option?.label === selected?.label
              }
            />
          ) : filterOptions === "district" ? (
            <Autocomplete
              options={district}
              label="Select By District"
              value={districtValue}
              setValue={setDistrictValue}
              getOptionLabel={option => option?.label}
              isOptionEqualToValue={(option, selected) =>
                option?.label === selected?.label
              }
            />
          ) : (
            <>
              <Text
                sx={{
                  "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
                    borderRadius: "0px",
                  },
                }}
                onChange={handleMobileNumber}
                width={220}
                value={mobileNumber}
                label="MobileNumber"
                inputProps={{ maxLength: 9 }}
              />
              <Button
                ref={focusRef}
                variant="contained"
                size="small"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </>
          )}
        </Box> */}

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
      </Box>
    </Stack>
  );
};

export default FilterCard;
