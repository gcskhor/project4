/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable quotes */
import axios from "axios";
import moment from "moment";
import React, { useState, useEffect } from "react";

import { Box, TextField, Button, Stack, Typography } from "@mui/material";

import ImageDisplay from "./ImageDisplay.jsx";

export default function InfoPage({ selectedRestaurant }) {
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

  return (
    <Box
      p={2}
      m={2}
      backgroundColor="whitesmoke"
      borderRadius={2}
      boxShadow={20}
    >
      <Box m={1}>
        {/* ADDRESS HEADER */}
        <Typography
          sx={{ display: "block" }}
          fontFamily="Lilita One"
          component="span"
          variant="h6"
          color="text.primary"
        >
          Address
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
      </Box>
      <Box m={1}>
        {/* PHONE HEADER */}
        <Typography
          sx={{ display: "block" }}
          fontFamily="Lilita One"
          component="span"
          variant="h6"
          color="text.primary"
        >
          Phone
        </Typography>

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
      </Box>

      <Box m={1}>
        {/* OPENING HOURS HEADER */}
        <Typography
          sx={{ display: "block" }}
          fontFamily="Lilita One"
          component="span"
          variant="h6"
          color="text.primary"
        >
          Opening Hours
        </Typography>
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
      </Box>

      <Box m={1} mb={3}>
        {/* RATING HEADER */}
        <Typography
          sx={{ display: "block" }}
          fontFamily="Lilita One"
          component="span"
          variant="h6"
          color="text.primary"
        >
          Rating
        </Typography>
        {/* RATING */}
        {rating && (
          <Typography
            sx={{ display: "block" }}
            component="span"
            variant="body1"
            color="text.primary"
          >
            {rating} / 5 stars
          </Typography>
        )}
      </Box>

      <ImageDisplay selectedRestaurant={selectedRestaurant} />
    </Box>
  );
}
