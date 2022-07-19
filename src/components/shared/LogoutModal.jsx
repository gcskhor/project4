/* eslint-disable object-shorthand */
/* eslint-disable react/prop-types */
/* eslint-disable quotes */
import axios from "axios";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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

export default function LogoutModal({ setTooltipName, setLoggedInUser }) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    if (setTooltipName) {
      setTooltipName(null);
    }
  };

  const handleLogout = () => {
    console.log("handling logout");
    axios
      .post("/logout")
      .then((res) => {
        console.log("successful logout");
        console.log(res);

        setLoggedInUser(null);
        handleClose();
      })
      .catch((error) => {
        console.log("failed logout???");
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
          <Typography
            variant="h5"
            display="block"
            fontFamily="Lilita One"
            elevation={5}
            m={1}
            align="center"
          >
            Logout
          </Typography>
          <Typography
            id="modal-modal-description"
            align="center"
            sx={{ mt: 2, m: 1 }}
          >
            Are you sure you wanna log out?
          </Typography>

          {/* LOGOUT */}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            sx={{ mt: 1, height: "50px" }}
            onClick={handleLogout}
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
            Nah
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
