import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Button, TextField } from "@mui/material";
import moment from "moment";
const Calendar = ({
  fromDate2,
  toDate2,
  setFromDate2,
  setToDate2,
  submitDate,
}) => {
  return (
    <>
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
      <Button variant="contained" sx={{ marginLeft: 1 }} onClick={submitDate}>
        Search
      </Button>
    </>
  );
};

export default Calendar;
