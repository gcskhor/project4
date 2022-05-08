/* eslint-disable operator-linebreak */
/* eslint-disable arrow-body-style */
/* eslint-disable object-shorthand */
/* eslint-disable react/prop-types */
/* eslint-disable quotes */
import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  Modal,
  List,
  ListItem,
  Button,
} from "@mui/material";

export const REWARD_LIKES = "SUPerb Helper";
export const REWARD_REVIEWS = "Reviewer SUPreme";
export const REWARD_VISITS = "SUPer Explorer";

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

export default function RewardsModal({
  setTooltipName,
  loggedInUser,
  setLoggedInUser,
}) {
  const [open, setOpen] = useState(true);
  const [rewards, setRewards] = useState([]);
  const [numLikes, setNumLikes] = useState(0);
  const [numVisits, setNumVisits] = useState(0);
  const [numReviews, setNumReviews] = useState(0);

  console.log(loggedInUser);

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

  const userHasReward = (rewardName) => {
    loggedInUser.rewards.forEach((rewardObj) => {
      console.log(rewardName);
      console.log(rewardObj.name === rewardName);
      return rewardObj.name === rewardName;
    });
  };

  const RewardDisplay = ({ reward }) => {
    const [collectRewardButton, setCollectRewardButton] = useState(true);

    const handleCollectReward = (rewardName) => {
      const userAddReward = { ...loggedInUser };
      userAddReward.rewards.push({ name: rewardName });
      console.log(rewardName);
      setLoggedInUser(userAddReward);

      axios
        .post("/rewards/collect", {
          rewardName: rewardName,
          user: loggedInUser,
        })
        .then((response) => {
          console.log(response);
          console.log(`collected reward: ${rewardName}`);
        })
        .catch((err) => {
          console.log(err);
        });

      setCollectRewardButton(false);
    };

    return (
      <ListItem key={reward.id + reward.name}>
        <Box width="100%" backgroundColor="whitesmoke" p={2} borderRadius={2}>
          <Typography
            sx={{ display: "inline", fontSize: 15 }}
            component="div"
            variant="h6"
            color="text.primary"
          >
            {reward.name}
          </Typography>
          <Box>
            <Box>
              <Typography
                sx={{ display: "inline", fontSize: 11 }}
                component="div"
                variant="body2"
                color="text.secondary"
              >
                {reward.name === REWARD_LIKES &&
                  "Receive a total of 40 likes across all your chat messages."}
                {reward.name === REWARD_VISITS && "Check into 20 restaurants."}
                {reward.name === REWARD_REVIEWS &&
                  "Write a total of 5 reviews."}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{ display: "inline", fontSize: 11 }}
                component="div"
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
            {reward.name === REWARD_LIKES &&
              numLikes >= 40 &&
              collectRewardButton &&
              !userHasReward(REWARD_LIKES) && (
                <Button
                  variant="outlined"
                  size="small"
                  rewardName={REWARD_LIKES}
                  onClick={() => {
                    handleCollectReward(reward.name);
                  }}
                >
                  Collect Reward
                </Button>
              )}
            {reward.name === REWARD_VISITS &&
              numVisits >= 20 &&
              collectRewardButton &&
              !userHasReward(REWARD_VISITS) && (
                <Button
                  variant="outlined"
                  size="small"
                  rewardName={REWARD_VISITS}
                  onClick={() => {
                    handleCollectReward(reward.name);
                  }}
                >
                  Collect Reward
                </Button>
              )}
            {reward.name === REWARD_REVIEWS &&
              numReviews >= 5 &&
              collectRewardButton &&
              !userHasReward(REWARD_REVIEWS) && (
                <Button
                  variant="outlined"
                  size="small"
                  rewardName={REWARD_LIKES}
                  onClick={() => {
                    handleCollectReward(reward.name);
                  }}
                >
                  Collect Reward
                </Button>
              )}
          </Box>
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
          <Typography
            variant="h4"
            display="block"
            fontFamily="Lilita One"
            elevation={5}
            m={1}
            align="center"
          >
            {" "}
            Rewards
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
