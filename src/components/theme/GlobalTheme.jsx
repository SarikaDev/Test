import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import moment from "moment";

import axios from "../../api/axios";
import PATHS, { URL } from "../../utils/constants";
import FiltersCard from "./FiltersCard";
import TableView from "./TableView";

const GlobalTheme = ({
  title,
  filterChannel,
  selectedValue,
  setselectedValue,
  mobileNumber,
  setMobileNumber,
  tableHeading,
  apiProps,
  root,
}) => {
  const { accessToken } = JSON?.parse(localStorage?.getItem("Port"));
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [branch, setBranch] = useState([]);
  const [branchValue, setBranchValue] = useState(null);
  const [district, setDistrict] = useState([]);
  const [districtValue, setDistrictValue] = useState(null);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [totalSize, setTotalSize] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);
  const [tableBody, setTableBody] = useState([]);

  const handleMobileNumber = useCallback(
    e => {
      setMobileNumber(e.target.value);
    },
    [setMobileNumber],
  );

  const searchText = useMemo(
    () => ({
      ...(search && {
        [selectedValue]:
          selectedValue === "mobileNumber" ? `+251${search}` : search,
      }),
    }),
    [search, selectedValue],
  );
  //! getBranches Request
  useEffect(() => {
    axios
      .get(URL.Ports.branch, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => {
        const { labelValues } = res?.data?.data;
        setBranch(labelValues.sort((a, b) => a?.label.localeCompare(b?.label)));
      })
      .catch(err => {
        console.error(err);
      });
  }, [accessToken]);

  //! getDistricts Request
  useEffect(() => {
    axios
      .get(URL.Ports.district, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => {
        const { labelValues } = res?.data?.data;
        setDistrict(labelValues.sort((a, b) => a.label.localeCompare(b.label)));
      })
      .catch(err => {
        console.error(err);
      });
  }, [accessToken]);

  useEffect(() => {
    apiProps({
      pageSize,
      pageNumber: pageNumber + 1,
      ...(root === PATHS.Ports.datasets.users ||
      root === PATHS.Ports.userManagement.root
        ? {
            fromLastUpdated:
              fromDate.length === 0
                ? "2022-01-01"
                : moment(fromDate).format("YYYY-MM-DD"),
            toLastUpdated:
              toDate.length === 0
                ? moment(new Date()).format("YYYY-MM-DD")
                : moment(toDate).format("YYYY-MM-DD"),
          }
        : {
            from:
              fromDate.length === 0
                ? "2022-01-01"
                : moment(fromDate).format("YYYY-MM-DD"),
            to:
              toDate.length === 0
                ? moment(new Date()).format("YYYY-MM-DD")
                : moment(toDate).format("YYYY-MM-DD"),
          }),
      ...searchText,
    })
      .then(res => {
        setIsLoading(false);
        const { totalSize } = res.data.data;
        setTotalSize(totalSize);
        return setTableBody(res.data.data.content);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, [apiProps, fromDate, pageNumber, pageSize, root, searchText, toDate]);

  useEffect(() => {
    setSearch("");
  }, [selectedValue, setSearch]);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      if (mobileNumber) {
        setSearch(mobileNumber);
      }
    },
    [mobileNumber],
  );

  const handleSelectField = useCallback(
    e => {
      if (selectedValue !== "branch") {
        setBranchValue(null);
      }
      if (selectedValue !== "district") {
        setDistrictValue(null);
      }
      setselectedValue(e.target.value);
      setSearch("");
    },
    [selectedValue, setselectedValue],
  );

  return (
    <Box>
      <FiltersCard
        title={title}
        selectedValue={selectedValue}
        filterChannel={filterChannel}
        branch={branch}
        branchValue={branchValue}
        district={district}
        districtValue={districtValue}
        setFromDate={setFromDate}
        setToDate={setToDate}
        handleSelectField={handleSelectField}
        handleMobileNumber={handleMobileNumber}
        handleSubmit={handleSubmit}
        setBranchValue={setBranchValue}
        setDistrictValue={setDistrictValue}
        setSearch={setSearch}
      />
      <TableView
        tableHeading={tableHeading}
        tableBody={tableBody}
        totalSize={totalSize}
        setPageSize={setPageSize}
        setPageNumber={setPageNumber}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        pageSize={pageSize}
        pageNumber={pageNumber}
        apiProps={apiProps}
        root={root}
      />
    </Box>
  );
};

export default GlobalTheme;
