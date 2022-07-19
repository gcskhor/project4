/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/prop-types */
/* eslint-disable quotes */

import * as React from "react";

import { Switch, FormControlLabel, FormGroup } from "@mui/material";

const CheckInSwitch = ({ checkedIn, setCheckedIn }) => {
  const handleChange = (event) => {
    checkedIn ? setCheckedIn(false) : setCheckedIn(true);
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            color="warning"
            onChange={(event) => {
              handleChange(event);
            }}
          />
        }
        label="Check In"
      />
    </FormGroup>
  );
};

export default CheckInSwitch;
