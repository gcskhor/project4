/* eslint-disable object-shorthand */
/* eslint-disable react/prop-types */
/* eslint-disable quotes */
import axios from "axios";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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

export default function LoginModal({ setTooltipName, setLoggedInUser }) {
  const [open, setOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => {
    setOpen(false);

    setTooltipName ? setTooltipName(null) : null;
  };

  const handleSubmit = () => {
    const loginDetails = {
      email: email,
      password: password,
    };

    console.log(loginDetails);

    axios
      .post("/login", loginDetails)
      .then((res) => {
        console.log("successful login");
        console.log(res);
        const { id, email, username, restaurantId } = res.data;
        const userData = {
          id: id,
          email: email,
          username: username,
          restaurantId: restaurantId,
        };

        console.log(userData);
        setLoggedInUser(userData);
        handleClose();
      })
      .catch((error) => {
        console.log("failed login");
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
            Login
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, m: 1 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            color="secondary"
            label="Your email"
            value={email}
            sx={{ mt: 2 }}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <TextField
            fullWidth
            type="password"
            variant="outlined"
            color="secondary"
            label="Your password"
            value={password}
            sx={{ mt: 1 }}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            sx={{ mt: 1, height: "50px" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
