/* eslint-disable react/prop-types */
import moment from 'moment';
import React, { useState, useEffect, Fragment } from 'react';

import {
  Box,
  Button,
  Typography,
  Divider,
} from '@mui/material';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import AddIcon from '@mui/icons-material/Add';
import SubmitReviewModal from './SubmitReviewModal.jsx';

export default function ReviewPage({
  restaurantReviews,
  setRestaurantReviews,
  loggedInUser,
  selectedRestaurant,
}) {
  const [submitReviewModal, setSubmitReviewModal] = useState(false);

  const DisplayReviews = () => {
    if (restaurantReviews) {
      console.log(restaurantReviews);
      console.log('restaurantReviews exists');
      return (
        <List>
          {restaurantReviews.map((review, index) => (
            <Box>
              <ListItem button key={index}>
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <ListItemText
                  primary={(
                    <Typography
                      component="span"
                      variant="h6"
                      color="text.primary"
                    >
                      {review.title}
                    </Typography>
                    )}
                  secondary={(
                    <>
                      <Typography
                        sx={{ display: 'block' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {review.username}
                      </Typography>
                      {review.review}
                      <Typography
                        sx={{
                          display: 'block',
                          textAlign: 'right',
                          fontSize: 11,
                        }}
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        {moment(review.createdAt).calendar()}
                      </Typography>
                    </>
                    )}
                />
              </ListItem>
              <Divider fullwidth component="li" />
            </Box>
          ))}
        </List>
      );
    }
  };

  const SubmitReviewButton = () => (
    <Button
      startIcon={<AddIcon />}
      disabled={!loggedInUser}
      fullWidth
      variant="outlined"
      color="primary"
      size="large"
      sx={{ my: 1, height: '50px' }}
      onClick={() => {
        console.log('submit review button clicked');
        setSubmitReviewModal(true);
      }}
    >
      {loggedInUser
        ? 'Submit a Review'
        : 'You must be logged in to submit a review'}
    </Button>
  );

  return (
    <Box
      p={2}
      m={2}
      backgroundColor="whitesmoke"
      borderRadius={2}
      boxShadow={20}
    >
      <SubmitReviewButton />
      <DisplayReviews />
      {submitReviewModal && (
        <SubmitReviewModal
          loggedInUser={loggedInUser}
          selectedRestaurant={selectedRestaurant}
          setSubmitReviewModal={setSubmitReviewModal}
          setRestaurantReviews={setRestaurantReviews}
        />
      )}
    </Box>
  );
}
