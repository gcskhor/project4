/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-shorthand */
/* eslint-disable react/prop-types */
/* eslint-disable quotes */
import axios from "axios";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import { TextField, InputAdornment } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "90%",
//   height: "70%",
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

export default function SignupModal({ setTooltipName }) {
  const [open, setOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [telegramHandle, setTelegramHandle] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const invalidLogin = password !== confirmedPassword ? true : null;

  const handleClose = () => {
    setOpen(false);
    setTooltipName(null);
  };

  const handleSubmit = () => {
    const signupDetails = {
      email: email,
      username: username,
      telegram: telegramHandle,
      password: password,
    };

    console.log(signupDetails);

    axios
      .post("/signup", signupDetails)
      .then((result) => {
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        console.log("failed signup");
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
            Signup
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>

          {/* EMAIL */}
          <TextField
            required
            fullWidth
            size="small"
            variant="outlined"
            color="secondary"
            label="Your email"
            value={email}
            sx={{ mt: 2 }}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />

          {/* USERNAME */}
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            color="secondary"
            label="Your username"
            value={username}
            sx={{ mt: 2 }}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />

          {/* TELEGRAM HANDLE */}
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            color="secondary"
            label="Your telegram handle"
            value={telegramHandle}
            sx={{ mt: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">@</InputAdornment>
              ),
            }}
            onChange={(event) => {
              setTelegramHandle(event.target.value);
            }}
          />

          {/* PASSWORD */}
          <TextField
            fullWidth
            size="small"
            type="password"
            variant="outlined"
            color="secondary"
            label="Your password"
            value={password}
            sx={{ mt: 2 }}
            error={invalidLogin}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />

          {/* CONFIRMED PASSWORD */}
          <TextField
            fullWidth
            size="small"
            type="password"
            variant="outlined"
            color="secondary"
            label="Confirm your password"
            value={confirmedPassword}
            sx={{ mt: 2 }}
            onChange={(event) => {
              setConfirmedPassword(event.target.value);
            }}
            error={invalidLogin}
            helperText={
              password !== confirmedPassword ? "Passwords do not match" : null
            }
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            sx={{ mt: 2, height: "50px" }}
            onClick={handleSubmit}
            disabled={invalidLogin}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
