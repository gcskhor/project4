/* eslint-disable max-len */
/* eslint-disable spaced-comment */
/* eslint-disable react/prop-types */
/* eslint-disable quotes */
import React, { useState, useEffect } from "react";
import { Button, TextField, ThemeProvider, createTheme } from "@mui/material";

// PLACES AUTOCOMPLETE
import TitleScreen from "./components/TitleScreen.jsx";
import RestaurantScreen from "./components/RestaurantScreen.jsx";

const testeraunt = {
  id: 13,
  name: "69 some road, test-restaurant, singapore",
  address: "69 some road",
  visited_count: 0,
};

export const testeraunt2 = {
  id: 14,
  name: "420 other road, test-restaurant2, singapore",
  address: "420 other road",
  visited_count: 0,
};

const theme = createTheme({
  typography: {
    fontFamily: "Varela Round, sans-serif",
  },
});

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const [selectedRestaurant, setSelectedRestaurant] = useState();
  const [checkedIn, setCheckedIn] = useState(false);

  console.log(loggedInUser);

  // RETRIEVE SELECTED RESTAURANT FROM LOCALSTORAGE ON MOUNT
  useEffect(() => {
    const restaurantFromStorage = localStorage.getItem("selectedRestaurant");

    // console.log(JSON.parse(restaurantFromStorage));

    restaurantFromStorage &&
      setSelectedRestaurant(JSON.parse(restaurantFromStorage));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div>
        {selectedRestaurant ? (
          <RestaurantScreen
            selectedRestaurant={selectedRestaurant}
            setSelectedRestaurant={setSelectedRestaurant}
            loggedInUser={loggedInUser}
            setLoggedInUser={setLoggedInUser}
            checkedIn={checkedIn}
            setCheckedIn={setCheckedIn}
          />
        ) : (
          <TitleScreen
            setSelectedRestaurant={setSelectedRestaurant}
            loggedInUser={loggedInUser}
            setLoggedInUser={setLoggedInUser}
          />
        )}
      </div>
    </ThemeProvider>
  );
}
