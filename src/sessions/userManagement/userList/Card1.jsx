import {
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Box } from "@mui/system";
import InputField from "../../../components/global/Input";
import Autocomplete from "../../../components/global/AutoComplete";
import Text from "../../../components/global/TextField";
import { toast } from "react-toastify";
import FilterCard from "../../../Pages/Global/FilterCard";
const Card1 = ({
  setFromDate,
  setToDate,
  // branchValue,
  // setBranchValue,
  // districtValue,
  // setDistrictValue,
  // filterOptions,
  // onChange,
  // fromDate,
  // toDate,
  // handleSearch,
  // branch,
  // district,
}) => {
  const [mobileNumber, setMobileNumber] = useState("");

  const focusRef = useRef(null);
  useEffect(() => {
    if (mobileNumber.length === 9) {
      focusRef.current.focus();
    }
  }, [mobileNumber.length]);

  return (
    <FilterCard
      setFromDate={setFromDate}
      setToDate={setToDate}
      setMobileNumber={setMobileNumber}
    ></FilterCard>
  );
};

export default Card1;
