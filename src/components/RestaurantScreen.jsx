/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable quotes */
/* eslint-disable react/prop-types */

import React, { useState, useEffect } from "react";
import { Box, ListItem } from "@mui/material";
import axios from "axios";
import socket from "./socket.js";
import FixedBottomNavigation from "./restaurantScreen/FixedBottomNavigation.jsx";
import LiveChatPage from "./restaurantScreen/LiveChatPage.jsx";
import ProfileModal from "./restaurantScreen/ProfileModal.jsx";
import CheckInSwitch from "./restaurantScreen/CheckInSwitch.jsx";
import PlaceSearch from "./PlaceSearch.jsx";
import TopAppBar from "./restaurantScreen/TopAppBar.jsx";
import ReviewPage from "./restaurantScreen/ReviewPage.jsx";
import InfoPage from "./restaurantScreen/InfoPage.jsx";
import { testeraunt2 } from "../App.jsx";

// SOCKET STUFF //////////////////////////////////////////////////

const JOIN_ROOM = "join-room";

const testMessage = {
  username: "test_user",
  message: "hello i like chiecken",
  likes: 0,
};
const testMessage2 = {
  username: "test_user2",
  message: "wow i also like chiecken noice",
  likes: 5,
};

export default function RestaurantScreen({
  selectedRestaurant,
  setSelectedRestaurant,
  loggedInUser,
  setLoggedInUser,
  checkedIn,
  setCheckedIn,
}) {
  const [tabIndex, setTabIndex] = useState(0);
  const [showPlaceSearchInput, setShowPlaceSearchInput] = useState(false);
  const [prevChatMessages, setPrevChatMessages] = useState([
    testMessage,
    testMessage2,
  ]);
  const [restaurantReviews, setRestaurantReviews] = useState(null);

  const [vicinity, name, country] = selectedRestaurant.name.split(",");

  // UPDATE SELECTED RESTAURANT
  useEffect(() => {
    console.log(`useEffect at restaurantScreen: ${selectedRestaurant}`);

    // socket.on("connect", () => {
    //   console.log(`you connected with id: ${socket.id}`);
    //   console.log(`trying to join room: "${room}"`);
    // });

    // RETRIEVE ROOM MESSAGES ON LOAD
    axios
      .post("/restaurant-messages", selectedRestaurant)
      .then((response) => {
        const retrievedMessages = response.data.messages;
        console.log(retrievedMessages);
        setPrevChatMessages(retrievedMessages);
      })
      .catch((error) => {
        console.log(error);
        error ? setPrevChatMessages([]) : null;
      });

    // RETRIEVE REVIEWS ON LOAD
    axios
      .post("/restaurant-reviews", selectedRestaurant)
      .then((response) => {
        console.log(response);
        setRestaurantReviews(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // JOIN ROOM
    const room = selectedRestaurant.name;
    socket.emit(JOIN_ROOM, room);

    return () => {
      // unmount sockets
    };
  }, [selectedRestaurant]);

  const restaurantCheckInOut = () => {
    console.log("restaurant checking in/out");
    const data = {
      user: loggedInUser,
      restaurant: selectedRestaurant,
    };

    if (checkedIn) {
      axios
        .post("/check-in", data)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post("/check-out", data)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // UPDATE CHECKED-IN SWITCH IF USER IS LOGGED IN
  useEffect(() => {
    loggedInUser ? restaurantCheckInOut() : null;
  }, [checkedIn]);

  const handleChangeRestaurant = (event) => {
    // setSelectedRestaurant(testeraunt2);
    setShowPlaceSearchInput(true);
  };

  const getActiveTab = () => {
    switch (tabIndex) {
      case 0: // INFO
        return <InfoPage selectedRestaurant={selectedRestaurant} />;
      case 1: // REVIEWS
        return (
          <ReviewPage
            restaurantReviews={restaurantReviews}
            setRestaurantReviews={setRestaurantReviews}
            loggedInUser={loggedInUser}
            selectedRestaurant={selectedRestaurant}
          />
        );
      case 2: // CHAT
        return (
          <LiveChatPage
            tabIndex={tabIndex}
            setTabIndex={setTabIndex}
            loggedInUser={loggedInUser}
            selectedRestaurant={selectedRestaurant}
            prevChatMessages={prevChatMessages}
            setPrevChatMessages={setPrevChatMessages}
          />
        );
      case 3: // PROFILE
        return (
          <ProfileModal
            tabIndex={tabIndex}
            setTabIndex={setTabIndex}
            loggedInUser={loggedInUser}
            setLoggedInUser={setLoggedInUser}
          />
        );
      default:
        break;
    }
  };

  return (
    <div>
      <TopAppBar setSelectedRestaurant={setSelectedRestaurant} />
      <Box button fullWidth boxShadow={5} className="restaurant-name">
        <Box>
          <ListItem button onClick={handleChangeRestaurant}>
            <div className="header-text">{name}</div>
          </ListItem>
          <div>{vicinity}</div>
        </Box>
        {/* <PlaceSearch /> */}

        {loggedInUser && (
          <CheckInSwitch
            checkedIn={checkedIn}
            setCheckedIn={setCheckedIn}
            restaurantCheckInOut={restaurantCheckInOut}
          />
        )}
        <hr />
        <div>
          There are 3 users that you can say whatSUP to at this location.
        </div>
      </Box>

      {getActiveTab()}

      <FixedBottomNavigation tabIndex={tabIndex} setTabIndex={setTabIndex} />
    </div>
  );
}
