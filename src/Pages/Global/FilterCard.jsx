import { Box, Button, MenuItem, Paper, Stack, Typography } from "@mui/material";
import moment from "moment";
import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";
import Autocomplete from "../../components/global/AutoComplete";
import SelectField from "../../components/global/SelectField";
import Text from "../../components/global/TextField";
import Calendar from "./Calendar";

const List = [
  // { value: "name", label: "Name" },
  { value: "mobileNumber", label: "Mobile Number" },
  { value: "branch", label: "Branch" },
  { value: "district", label: "District" },
];
const FilterCard = ({
  setFromDate,
  setToDate,
  // setMobileNumber,
  branch,
  district,
  branchValue,
  setBranchValue,
  setSearch,
  selectValue,
  setselectValue,
}) => {
  const [fromDate2, setFromDate2] = useState("");
  const [toDate2, setToDate2] = useState("");
  const [districtValue, setDistrictValue] = useState(null);

  const handleSearchClick = useCallback(
    value => {
      setSearch(value);
    },
    [setSearch],
  );

  const handleSelectField = useCallback(
    e => {
      if (selectValue !== "branch") {
        setBranchValue(null);
      }
      if (selectValue !== "district") {
        setDistrictValue(null);
      }
      setselectValue(e.target.value);
    },
    [selectValue, setBranchValue, setselectValue],
  );

  // const handleMobileNumber = useCallback(
  //   e => {
  //     setMobileNumber(e.target.value);
  //   },
  //   [setMobileNumber],
  // );
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
          User List
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
            <SelectField value={selectValue} onChange={handleSelectField}>
              {List?.map(({ value, label }) => (
                <MenuItem value={value} key={label}>
                  {label}
                </MenuItem>
              ))}
            </SelectField>
            {selectValue === "mobileNumber" && (
              <>
                <Text label="Search Here" onChange={handleSearchClick} />
                <Button variant="outlined" sx={{ ml: 1 }}>
                  submit
                </Button>
              </>
            )}
            {selectValue === "branch" && (
              <Autocomplete
                options={branch}
                label="Select By Branch"
                value={branchValue}
                setValue={setBranchValue}
                getOptionLabel={option => option?.label}
                isOptionEqualToValue={(option, value) =>
                  option?.label === value?.label
                }
              />
            )}
            {selectValue === "district" && (
              <Autocomplete
                options={district}
                label="Select By District"
                value={districtValue}
                setValue={setDistrictValue}
                getOptionLabel={option => option?.label}
                isOptionEqualToValue={(option, value) =>
                  option?.label === value?.label
                }
              />
            )}
          </Stack>
          <Box>
            <Calendar
              fromDate2={fromDate2}
              toDate2={toDate2}
              setFromDate2={setFromDate2}
              setToDate2={setToDate2}
              submitDate={submitDate}
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default FilterCard;
