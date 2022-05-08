/* eslint-disable spaced-comment */
/* eslint-disable object-shorthand */
/* eslint-disable react/prop-types */
/* eslint-disable quotes */
import axios from "axios";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LoginModal from "../shared/LoginModal.jsx";
import LogoutModal from "../shared/LogoutModal.jsx";
import RewardsModal from "../shared/RewardsModal.jsx";
import SignupModal from "../shared/SignupModal.jsx";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "90%",
//   height: "60%",
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
//   borderRadius: 5,
// };

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

export default function ProfileModal({
  loggedInUser,
  setLoggedInUser,
  setTabIndex,
}) {
  const [open, setOpen] = useState(true);
  const [loggingOutModal, setLoggingOutModal] = useState(false);
  const [loggingInModal, setLoggingInModal] = useState(false);
  const [signingUpModal, setSigningUpModal] = useState(false);
  const [rewardsModal, setRewardsModal] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setTabIndex(0);
  };

  function ProfileLoggedIn() {
    return (
      <div>
        <Typography
          className="header-text"
          id="modal-modal-title"
          sx={{ mb: 4 }}
        >
          {`${loggedInUser.username}'s Profile`}
        </Typography>

        {/* REWARDS */}
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="secondary"
          size="large"
          sx={{ mt: 1, height: "50px" }}
          onClick={() => setRewardsModal(true)}
        >
          Rewards
        </Button>

        {/* EDIT PROFILE */}
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="secondary"
          size="large"
          sx={{ mt: 1, height: "50px" }}
          onClick={() => handleClose()}
        >
          Edit Profile
        </Button>

        {/* REDIRECT TO LOGOUT MODAL*/}
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="secondary"
          size="large"
          sx={{ mt: 1, height: "50px" }}
          onClick={() => {
            setLoggingOutModal(true);
          }}
        >
          Logout
        </Button>

        {/* DON'T LOGOUT */}
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="secondary"
          size="large"
          sx={{ mt: 1, height: "50px" }}
          onClick={() => handleClose()}
        >
          Back
        </Button>
        {rewardsModal && (
          <RewardsModal
            loggedInUser={loggedInUser}
            setLoggedInUser={setLoggedInUser}
          />
        )}
        {loggingOutModal && <LogoutModal setLoggedInUser={setLoggedInUser} />}
      </div>
    );
  }

  function ProfileNotLoggedIn() {
    return (
      <>
        <Typography
          className="header-text"
          id="modal-modal-title"
          sx={{ mb: 4 }}
        >
          You are not logged in.
        </Typography>

        {/* LOGIN */}
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="secondary"
          size="large"
          sx={{ mt: 1, height: "50px" }}
          onClick={() => {
            console.log("login modal");
            setLoggingInModal(true);
          }}
        >
          Login
        </Button>

        {/* SIGNUP */}
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="secondary"
          size="large"
          sx={{ mt: 1, height: "50px" }}
          onClick={() => {
            console.log("signup modal");
            setSigningUpModal(true);
          }}
        >
          Signup
        </Button>

        {/* BACK */}
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="secondary"
          size="large"
          sx={{ mt: 1, height: "50px" }}
          onClick={() => handleClose()}
        >
          Back
        </Button>

        {loggingInModal && <LoginModal setLoggedInUser={setLoggedInUser} />}
        {signingUpModal && <SignupModal setLoggedInUser={setLoggedInUser} />}
      </>
    );
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <ProfileLoggedIn /> */}
          {loggedInUser ? <ProfileLoggedIn /> : <ProfileNotLoggedIn />}
        </Box>
      </Modal>
    </div>
  );
}
