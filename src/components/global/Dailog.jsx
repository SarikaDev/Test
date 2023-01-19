import React, { useCallback, useState } from "react";
import {
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
const Dailog = ({ id, setId }) => {
  const [value, setValue] = useState("");
  const handleChange = useCallback(e => {
    setValue(e.target.value);
  }, []);
  const handleClose = useCallback(() => {
    setValue("");
    setId("");
  }, [setId]);
  const handleUpdate = useCallback(() => {
    if (!!value) {
      console.log(value);
      setValue("");
      setId("");
    } else {
      console.log("NEED TO FILL");
    }
  }, [setId, value]);
  return (
    <Dialog open={!!id} onClose={handleClose}>
      <DialogTitle>You are About To Update ID {id}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          multiline
          rows={3}
          onChange={handleChange}
          value={value}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="success"
          autoFocus
          onClick={handleUpdate}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Dailog;
