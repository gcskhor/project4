/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Box, Paper, Typography,
} from '@mui/material';
import axios from 'axios';
import socket from './socket.js';
import FixedBottomNavigation from './restaurantScreen/FixedBottomNavigation.jsx';
import LiveChatPage from './restaurantScreen/LiveChatPage.jsx';
import ProfileModal from './restaurantScreen/ProfileModal.jsx';
import CheckInSwitch from './restaurantScreen/CheckInSwitch.jsx';
import TopAppBar from './restaurantScreen/TopAppBar.jsx';
import ReviewPage from './restaurantScreen/ReviewPage.jsx';
import InfoPage from './restaurantScreen/InfoPage.jsx';

const JOIN_ROOM = 'join-room';

export default function RestaurantScreen({
  selectedRestaurant,
  setSelectedRestaurant,
  loggedInUser,
  setLoggedInUser,
  checkedIn,
  setCheckedIn,
}) {
  const [tabIndex, setTabIndex] = useState(0);
  const [prevChatMessages, setPrevChatMessages] = useState([]);
  const [restaurantReviews, setRestaurantReviews] = useState(null);

  const [vicinity, name, country] = selectedRestaurant.name.split(',');

  // UPDATE SELECTED RESTAURANT
  useEffect(() => {
    // RETRIEVE ROOM MESSAGES ON LOAD
    axios
      .post('/restaurant-messages', selectedRestaurant)
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
      .post('/restaurant-reviews', selectedRestaurant)
      .then((response) => {
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
    console.log('restaurant checking in/out');
    const data = {
      user: loggedInUser,
      restaurant: selectedRestaurant,
    };

    if (checkedIn) {
      axios
        .post('/check-in', data)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post('/check-out', data)
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
    <Box>
      <TopAppBar
        setSelectedRestaurant={setSelectedRestaurant}
        sx={{ position: 'relative', zIndex: 1000 }}
      />
      <Paper elevation={3}>
        <Box fullWidth boxShadow={5} mt={5} p={2} backgroundColor="whitesmoke">
          <Box>
            <Typography
              variant="h4"
              display="block"
              fontFamily="Lilita One"
              elevation={5}
              m={1}
              align="center"
            >
              {name}
            </Typography>
            <Typography
              variant="body1"
              display="block"
              component="div"
              m={1}
              align="center"
            >
              {vicinity}
            </Typography>

            {loggedInUser && (
              <CheckInSwitch
                checkedIn={checkedIn}
                setCheckedIn={setCheckedIn}
                restaurantCheckInOut={restaurantCheckInOut}
                justifyContent="center"
              />
            )}
          </Box>

        </Box>
      </Paper>

      {getActiveTab()}

      <FixedBottomNavigation tabIndex={tabIndex} setTabIndex={setTabIndex} />
    </Box>
  );
}
