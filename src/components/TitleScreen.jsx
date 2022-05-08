/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable quotes */
/* eslint-disable react/prop-types */

import React, { useState, useEffect } from "react";
import { Box, Paper } from "@mui/material";
import axios from "axios";
import LoginModal from "./shared/LoginModal.jsx";
import SignupModal from "./shared/SignupModal.jsx";
import LogoutModal from "./shared/LogoutModal.jsx";
import PlaceSearch from "./PlaceSearch.jsx";
import SpeedDialTooltipOpen from "./titleScreen/SpeedDialTooltip.jsx";

const LOGIN = "Login";
const SIGNUP = "Signup";
const FAVOURITES = "Favorites";
const LOGOUT = "Logout";

export default function TitleScreen({
  setSelectedRestaurant,
  loggedInUser,
  setLoggedInUser,
}) {
  const [tooltipName, setTooltipName] = useState(null);
  const [checkedInRestaurantData, setCheckedInRestaurantData] = useState(null);

  // ON LOG IN, CHECK THE USER'S CHECKED IN RESTAURANT
  useEffect(() => {
    setCheckedInRestaurantData(null);
    if (loggedInUser && loggedInUser.restaurantId) {
      axios
        .post("/get-checked-in-restaurant", {
          restaurantId: loggedInUser.restaurantId,
        })
        .then((result) => {
          console.log(result);
          const checkedInRestaurantResult = result.data;

          setCheckedInRestaurantData(checkedInRestaurantResult);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedInUser]);

  const getActiveTooltip = () => {
    switch (tooltipName) {
      case LOGIN:
        return (
          <LoginModal
            setTooltipName={setTooltipName}
            setLoggedInUser={setLoggedInUser}
          />
        );

      case SIGNUP:
        return <SignupModal setTooltipName={setTooltipName} />;

      case FAVOURITES:
        return <div>Favorites!!!</div>;

      case LOGOUT:
        return (
          <LogoutModal
            setLoggedInUser={setLoggedInUser}
            setTooltipName={setTooltipName}
          />
        );

      default:
        break;
    }
  };

  return (
    <Box
      sx={{
        p: 5,
        m: 2,
        backgroundColor: "whitesmoke",
        borderRadius: 3,
        boxShadow: 15,
      }}
    >
      <h2 className="logo">whatSUP</h2>
      {loggedInUser && <h4>Welcome back, {loggedInUser.username}</h4>}
      {checkedInRestaurantData && (
        <h4>You are checked into {checkedInRestaurantData.name}</h4>
      )}
      <p>
        Looking for a place to find some good food? Search for a restaurant
        below.
      </p>
      <PlaceSearch setSelectedRestaurant={setSelectedRestaurant} />
      {getActiveTooltip()}
      <SpeedDialTooltipOpen
        setTooltipName={setTooltipName}
        loggedInUser={loggedInUser}
      />
    </Box>
  );
}
