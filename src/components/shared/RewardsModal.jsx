/* eslint-disable arrow-body-style */
/* eslint-disable object-shorthand */
/* eslint-disable react/prop-types */
/* eslint-disable quotes */
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Box, Typography, Divider, Modal, List, ListItem } from "@mui/material";

const REWARD_LIKES = "SUPerb Helper";
const REWARD_REVIEWS = "Reviewer SUPreme";
const REWARD_VISITS = "SUPer Explorer";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "60%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function RewardsModal({ setTooltipName, loggedInUser }) {
  const [open, setOpen] = useState(true);
  const [rewards, setRewards] = useState([]);
  const [numLikes, setNumLikes] = useState(0);
  const [numVisits, setNumVisits] = useState(0);
  const [numReviews, setNumReviews] = useState(0);

  useEffect(() => {
    const results = Promise.all([
      axios.get("/rewards"),
      axios.get(`/rewards/likes/${loggedInUser.id}`),
      axios.get(`/rewards/visits/${loggedInUser.id}`),
      axios.get(`/rewards/reviews/${loggedInUser.id}`),
    ])
      .then((allResults) => {
        setRewards(allResults[0].data);
        setNumLikes(allResults[1].data.likes);
        setNumVisits(allResults[2].data.visited);
        setNumReviews(allResults[3].data.reviews);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClose = () => {
    setOpen(false);
    if (setTooltipName) {
      setTooltipName(null);
    }
  };

  const RewardDisplay = ({ reward }) => {
    return (
      <ListItem key={reward.id}>
        <Typography
          sx={{ display: "inline", fontSize: 11 }}
          component="span"
          variant="body2"
          color="text.secondary"
        >
          {reward.name}
        </Typography>
        <Box>
          <Typography
            sx={{ display: "inline", fontSize: 11 }}
            component="span"
            variant="body2"
            color="text.secondary"
          >
            {reward.name === REWARD_LIKES &&
              "Receive a total of 40 likes across all your chat messages."}
            {reward.name === REWARD_VISITS && "Check into 20 restaurants."}
            {reward.name === REWARD_REVIEWS && "Write a total of 5 reviews."}
          </Typography>
          <Typography
            sx={{ display: "inline", fontSize: 11 }}
            component="span"
            variant="body2"
            color="text.secondary"
          >
            {reward.name === REWARD_LIKES &&
              `You have:
            ${numLikes}
            /40 likes`}
            {reward.name === REWARD_VISITS &&
              `You have:
              ${numVisits}
              /20 visits`}
            {reward.name === REWARD_REVIEWS &&
              `You have:
              ${numReviews}
              /5 reviews`}
          </Typography>
        </Box>
      </ListItem>
    );
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography className="header-text" id="modal-modal-title">
            Rewards
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, m: 1 }}>
            Here are some rewards.
          </Typography>
          {/* {LIST OUT ALL REWARDS} */}
          <List>
            {rewards.map((reward) => {
              return <RewardDisplay reward={reward} />;
            })}
          </List>
        </Box>
      </Modal>
    </div>
  );
}
