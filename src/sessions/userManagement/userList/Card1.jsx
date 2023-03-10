import React, { useState, useCallback, useEffect } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import Autocomplete from "../../../components/global/AutoComplete";
import SelectField from "../../../components/global/SelectField";
import Text from "../../../components/global/TextField";
import Calendar from "../../../Pages/Global/Calendar";
import { Box, Button, MenuItem, Paper, Stack, Typography } from "@mui/material";
import axios from "../../../api/axios";

const List = [
  { value: "name", label: "Name" },
  { value: "mobileNumber", label: "Mobile Number" },
  { value: "branchId", label: "Branch" },
  { value: "district", label: "District" },
];
const Card1 = ({
  setFromDate,
  setToDate,
  branch,
  district,
  districtValue,
  setDistrictValue,
  selectValue,
  setselectValue,
  setSearch,
}) => {
  const { accessToken } = JSON?.parse(localStorage?.getItem("Port"));
  const [mobileNumber, setMobileNumber] = useState("");
  const [name, setName] = useState("");
  const [fromDate2, setFromDate2] = useState("");
  const [toDate2, setToDate2] = useState("");
  const [displayName, setDisplayName] = useState([]);
  const [branchValue, setBranchValue] = useState(null);

  const handleMobileNumber = useCallback(e => {
    setMobileNumber(e.target.value);
  }, []);

  //! displayNames Request

  // const api = useCallback(() => {
  //   return;
  // }, [accessToken]);

  useEffect(() => {
    axios
      .get("user", {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        params: {
          pageSize: 10,
          pageNumber: 1,
          fromLastUpdated: "2022-01-01",
          toLastUpdated: moment(new Date()).format("YYYY-MM-DD"),
        },
      })
      .then(res => {
        const data = res.data.data.content;
        const name = data.map(el => el?.displayName);
        setDisplayName(
          [...new Set(name)]?.map(displayName => ({
            label: displayName,
            value: displayName,
          })),
        );
      });
  }, [accessToken]);

  const handleSelectField = useCallback(
    e => {
      if (selectValue !== "branch") {
        setBranchValue(null);
      }
      if (selectValue !== "district") {
        setDistrictValue(null);
      }
      setselectValue(e.target.value);
      setSearch("");
    },
    [selectValue, setBranchValue, setDistrictValue, setSearch, setselectValue],
  );

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

  const handleSubmit = useCallback(() => {
    if (mobileNumber) {
      setSearch(mobileNumber);
    }
  }, [mobileNumber, setSearch]);
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
            {selectValue === "name" && (
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
            )}
            {selectValue === "mobileNumber" && (
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
            {selectValue === "branchId" && (
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
            {selectValue === "district" && (
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

export default Card1;
