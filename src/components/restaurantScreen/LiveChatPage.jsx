/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable quotes */

import axios from "axios";
import moment from "moment";
import React, { useState, useEffect } from "react";

import { Box, TextField, Button, Stack, Typography } from "@mui/material";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import socket from "../socket.js";
import { fontSize } from "@mui/system";

const CLIENT_TO_SERVER_MESSAGE = "client-to-server-message";
const SERVER_TO_CLIENT_MESSAGE = "server-to-client-message";

const style = {
  width: "100%",
  height: "60%",
  bgcolor: "background.paper",
  boxShadow: 10,
  p: 4,
  mt: 2,
  borderRadius: 3,
};

export default function LiveChatPage({
  loggedInUser,
  selectedRestaurant,
  prevChatMessages,
  setPrevChatMessages,
}) {
  const [chatMessage, setChatMessage] = useState("");

  // WHEN MESSAGE IS BEING SENT OUT FROM CLIENT
  const sendMessage = () => {
    console.log("sending message");
    const newMessage = {
      username: loggedInUser.username,
      userId: loggedInUser.id,
      message: chatMessage,
      likes: 0,
      restaurant: selectedRestaurant,
    };

    const room = selectedRestaurant.name;

    chatMessage
      ? socket.emit(CLIENT_TO_SERVER_MESSAGE, newMessage, room)
      : null;

    // CREATE MESSAGE IN DB MESSAGES TABLE
    axios
      .post("/send-message", newMessage)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));

    setPrevChatMessages((prevMessages) => [...prevMessages, newMessage]);
    setChatMessage("");
  };

  // WHEN MESSAGE IS BEING RECEIVED BY CLIENT
  const receiveMessage = (message) => {
    console.log("receiving:");
    console.log(message);

    const newMessage = {
      username: message.username,
      message: message.message,
      likes: 0,
    };

    const copyPrevMessages = [...prevChatMessages];
    setPrevChatMessages([...copyPrevMessages, newMessage]);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  function SubmitChatMessageButton() {
    return (
      <Button
        style={{
          maxWidth: "30px",
          maxHeight: "30px",
          minWidth: "30px",
          minHeight: "30px",
        }}
        onClick={() => {
          sendMessage();
        }}
      >
        <ArrowUpwardIcon />
      </Button>
    );
  }

  function Messages({ prevChatMessage }) {
    return (
      <Stack spacing={0}>
        <List>
          {prevChatMessages.map((prevMessage, index) => {
            return (
              <ListItem button key={index}>
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <ListItemText
                  primary={prevMessage.username}
                  secondary={
                    <Box>
                      <Box>{prevMessage.message}</Box>
                      <Box>
                        <Typography
                          sx={{ display: "inline", fontSize: 11 }}
                          component="span"
                          variant="body2"
                          color="text.secondary"
                        >
                          {moment(prevMessage.createdAt).calendar()}
                        </Typography>
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      </Stack>
    );
  }

  useEffect(() => {
    socket.on(SERVER_TO_CLIENT_MESSAGE, (m) => {
      console.log("received message");
      receiveMessage(m);
    });
  }, [prevChatMessages]);

  return (
    <Box sx={style}>
      <Box>
        {prevChatMessages && <Messages />}

        <TextField
          variant="outlined"
          fullWidth
          multiline
          color="secondary"
          label="Message"
          value={chatMessage}
          sx={{ m: 1 }}
          disabled={!loggedInUser}
          helperText={
            loggedInUser ? null : "You must be logged in to send a message."
          }
          InputProps={
            loggedInUser
              ? {
                  endAdornment: <SubmitChatMessageButton position="end" />,
                }
              : null
          }
          onChange={(event) => {
            setChatMessage(event.target.value);
          }}
          onKeyPress={handleKeyPress}
        />
      </Box>
    </Box>
  );
}
