/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable quotes */
import axios from "axios";
import moment from "moment";
import React, { useState, useEffect } from "react";

import { Box, TextField, Button, Stack, Typography } from "@mui/material";

import ImageDisplay from "./ImageDisplay.jsx";

export default function InfoPage({ selectedRestaurant }) {
  console.log(selectedRestaurant);
  const { address } = selectedRestaurant;
  const {
    business_status,
    formatted_phone_number,
    geometry,
    name,
    opening_hours,
    photos,
    rating,
  } = selectedRestaurant.place_data;

  console.log(opening_hours);

  return (
    <Box>
      {/* HEADER */}
      <Typography
        sx={{ display: "block" }}
        component="span"
        variant="h5"
        color="text.primary"
      >
        Restaurant Information
      </Typography>

      {/* ADDRESS */}
      {address && (
        <Typography
          sx={{ display: "block" }}
          component="span"
          variant="body1"
          color="text.primary"
        >
          {address}
        </Typography>
      )}

      {/* PHONE NUMBER */}
      {formatted_phone_number && (
        <Typography
          sx={{ display: "block" }}
          component="span"
          variant="body1"
          color="text.primary"
        >
          {formatted_phone_number}
        </Typography>
      )}

      {/* OPENING HOURS */}
      {opening_hours?.weekday_text && (
        <Typography
          sx={{ display: "block" }}
          component="span"
          variant="body1"
          color="text.primary"
        >
          {opening_hours.weekday_text.map((day) => {
            return <Box>{day}</Box>;
          })}
        </Typography>
      )}

      {/* RATING */}
      {rating && (
        <Typography
          sx={{ display: "block" }}
          component="span"
          variant="body1"
          color="text.primary"
        >
          {rating}
        </Typography>
      )}
      <ImageDisplay selectedRestaurant={selectedRestaurant} />
    </Box>
  );
}
