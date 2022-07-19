/* eslint-disable react/prop-types */
import axios from 'axios';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '60%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function SubmitReviewModal({
  loggedInUser,
  selectedRestaurant,
  setSubmitReviewModal,
  setRestaurantReviews,
}) {
  const [open, setOpen] = useState(true);
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');

  const handleClose = () => {
    setSubmitReviewModal(false);
    setOpen(false);
  };

  const handleSubmit = () => {
    const newReview = {
      title,
      review,
      user: loggedInUser,
      username: loggedInUser.username,
      restaurant: selectedRestaurant,
    };

    setRestaurantReviews((reviews) => [...reviews, newReview]);
    handleClose();

    axios
      .post('/reviews/submit', newReview)
      .then((res) => {
        console.log('successful review');
        console.log(res);
      })
      .catch((error) => {
        console.log('failed login');
        console.log(error);
      });
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
            Review
          </Typography>

          <TextField
            fullWidth
            variant="outlined"
            color="secondary"
            label="Review Title"
            value={title}
            sx={{ mt: 2 }}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <TextField
            fullWidth
            multiline
            maxRows={6}
            rows={4}
            variant="outlined"
            color="secondary"
            label="Your Review"
            value={review}
            sx={{ mt: 2 }}
            onChange={(event) => {
              setReview(event.target.value);
            }}
          />
          <Button
            fullWidth
            type="submit"
            variant="outlined"
            color="secondary"
            size="large"
            sx={{ mt: 2, height: '50px' }}
            onClick={handleSubmit}
          >
            Submit Review
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
