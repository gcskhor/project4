/* eslint-disable react/prop-types */
import axios from 'axios';
import moment from 'moment';
import React, { useState, useEffect } from 'react';

import {
  Box,
  TextField,
  Button,
  Stack,
  Typography,
  Divider,
  Chip,
} from '@mui/material';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import socket from '../socket.js';

import {
  REWARD_LIKES,
  REWARD_VISITS,
  REWARD_REVIEWS,
} from '../shared/RewardsModal.jsx';

const CLIENT_TO_SERVER_MESSAGE = 'client-to-server-message';
const SERVER_TO_CLIENT_MESSAGE = 'server-to-client-message';

const style = {
  width: '100%',
  height: '60%',
  bgcolor: 'background.paper',
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
  const [chatMessage, setChatMessage] = useState('');

  const scrollToBottom = () => {
    console.log('scrolling to botttom');
    console.log(document.documentElement.scrollHeight);
    window.scrollTo({
      top: document.documentElement.scrollHeight + 1000,
      behavior: 'smooth',
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  console.log(loggedInUser);

  // WHEN MESSAGE IS BEING SENT OUT FROM CLIENT
  const sendMessage = () => {
    console.log('sending message');
    const newMessage = {
      username: loggedInUser.username,
      userId: loggedInUser.id,
      message: chatMessage,
      likes: 0,
      restaurant: selectedRestaurant,
      user_rewards: loggedInUser.rewards,
    };

    const room = selectedRestaurant.name;

    chatMessage
      ? socket.emit(CLIENT_TO_SERVER_MESSAGE, newMessage, room)
      : null;

    // CREATE MESSAGE IN DB MESSAGES TABLE
    axios
      .post('/send-message', newMessage)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));

    scrollToBottom();

    setPrevChatMessages((prevMessages) => [...prevMessages, newMessage]);
    setChatMessage('');
  };

  // WHEN MESSAGE IS BEING RECEIVED BY CLIENT
  const receiveMessage = (message) => {
    console.log('receiving:');
    console.log(message);

    const newMessage = {
      username: message.username,
      message: message.message,
      likes: message.likes,
      user_rewards: message.user_rewards,
    };

    const copyPrevMessages = [...prevChatMessages];
    setPrevChatMessages([...copyPrevMessages, newMessage]);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  function SubmitChatMessageButton() {
    return (
      <Button
        style={{
          maxWidth: '30px',
          maxHeight: '30px',
          minWidth: '30px',
          minHeight: '30px',
        }}
        onClick={() => {
          sendMessage();
        }}
      >
        <ArrowUpwardIcon />
      </Button>
    );
  }

  function OtherMessages({ prevMessage, index }) {
    const [displayLikeButton, setDisplayLikeButton] = useState(false);
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(prevMessage.likes);

    const clickLikeButton = () => {
      setLikes((numLikes) => numLikes + 1);
      setLiked(true);

      axios
        .get(`/like-message/${prevMessage.id}`)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const handleShowLike = (event) => {
      setDisplayLikeButton(true);
    };

    const handleHideLike = (event) => {
      setDisplayLikeButton(false);
    };

    const rewardToColor = (rewardName) => {
      switch (rewardName) {
        case REWARD_LIKES:
          return 'primary';
        case REWARD_VISITS:
          return 'secondary';
        case REWARD_REVIEWS:
          return 'warning';
        default:
          return 'secondary';
      }
    };

    return (
      <Box>
        <ListItem
          button
          key={index}
          onMouseEnter={handleShowLike}
          onMouseLeave={handleHideLike}
        >
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText
            primary={(
              <Box>
                {prevMessage.username}
                <Stack direction="row" spacing={1}>
                  {prevMessage.user_rewards.map((reward) => (
                    <Chip
                      label={reward.name}
                      size="small"
                      color={rewardToColor(reward.name)}
                      variant="outlined"
                    />
                  ))}
                </Stack>
              </Box>
            )}
            secondary={(
              <Box>
                <Box mt={2}>{prevMessage.message}</Box>
                <Box sx={{ position: 'relative' }}>
                  <Typography
                    sx={{ display: 'inline', fontSize: 11 }}
                    component="span"
                    variant="body2"
                    color="text.secondary"
                  >
                    {moment(prevMessage.createdAt).calendar()}
                  </Typography>
                  {loggedInUser && !liked && displayLikeButton && (
                    <Button
                      variant="outlined"
                      onClick={clickLikeButton}
                      sx={{
                        position: 'absolute',
                        bottom: '95%',
                        left: '75%',
                        right: 0,
                      }}
                    >
                      Like
                    </Button>
                  )}
                  {likes > 0 && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: 13,
                        position: 'absolute',
                        top: '0',
                        left: '80%',
                        right: 0,
                      }}
                    >
                      {`${likes} likes`}
                    </Typography>
                  )}
                </Box>
              </Box>
            )}
          />
        </ListItem>
      </Box>
    );
  }

  function YourMessage({ prevMessage, index }) {
    const [likes, setLikes] = useState(prevMessage.likes);

    const rewardToColor = (rewardName) => {
      switch (rewardName) {
        case REWARD_LIKES:
          return 'primary';
        case REWARD_VISITS:
          return 'secondary';
        case REWARD_REVIEWS:
          return 'warning';
        default:
          return 'secondary';
      }
    };

    return (
      <Box>
        <ListItem
          button
          key={index}
          sx={{ backgroundColor: 'rgba(250,227,217,0.4)' }}
        >
          <ListItemText
            sx={{ textAlign: 'right' }}
            primary={(
              <Box>
                You
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  {prevMessage.user_rewards.map((reward) => (
                    <Chip
                      label={reward.name}
                      size="small"
                      color={rewardToColor(reward.name)}
                      variant="outlined"
                      justifyContent="flex-end"
                    />
                  ))}
                </Stack>
              </Box>
            )}
            secondary={(
              <Box mt={2}>
                <Box>{prevMessage.message}</Box>
                <Box>
                  <Typography
                    sx={{
                      display: 'inline',
                      textAlign: 'right',
                      fontSize: 11,
                    }}
                    component="span"
                    variant="body2"
                    color="text.secondary"
                  >
                    {moment(prevMessage.createdAt).calendar()}
                  </Typography>
                </Box>
                <Box sx={{ position: 'relative' }}>
                  {likes > 0 && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: 13,
                        position: 'absolute',
                        bottom: '30%',
                        left: 0,
                        right: '80%',
                      }}
                    >
                      {`${likes} likes`}
                    </Typography>
                  )}
                </Box>
              </Box>
            )}
          />
          <ListItemAvatar sx={{ ml: 2, mr: 0 }}>
            <Avatar />
          </ListItemAvatar>
        </ListItem>
        <Divider fullwidth component="li" />
      </Box>
    );
  }

  function Messages() {
    return (
      <Stack spacing={0}>
        <List>
          {loggedInUser
            && prevChatMessages.map((prevMessage, index) => {
              if (prevMessage.username !== loggedInUser.username) {
                return (
                  <OtherMessages prevMessage={prevMessage} index={index} />
                );
              }
              return <YourMessage prevMessage={prevMessage} index={index} />;
            })}

          {!loggedInUser
            && prevChatMessages.map((prevMessage, index) => <OtherMessages prevMessage={prevMessage} index={index} />)}
        </List>
      </Stack>
    );
  }

  useEffect(() => {
    socket.on(SERVER_TO_CLIENT_MESSAGE, (m) => {
      console.log('received message');
      receiveMessage(m);
    });
  }, [prevChatMessages]);

  return (
    <Box>
      {/* CHAT MESSAGES */}
      <Box
        p={2}
        m={2}
        mb={16}
        backgroundColor="whitesmoke"
        borderRadius={2}
        boxShadow={20}
      >
        {prevChatMessages.length ? (
          <Messages />
        ) : (
          'There are no messages available'
        )}
      </Box>

      {/* INPUT BOX */}
      <Box
        p={2}
        mb={7}
        backgroundColor="whitesmoke"
        boxShadow={20}
        sx={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
        }}
      >
        <TextField
          variant="outlined"
          fullWidth
          multiline
          size="small"
          color="secondary"
          label="Message"
          value={chatMessage}
          sx={{ m: 1 }}
          disabled={!loggedInUser}
          helperText={
            loggedInUser ? null : 'You must be logged in to send a message.'
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
