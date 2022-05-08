/* eslint-disable quotes */
import * as React from "react";

import {
  AppBar,
  Paper,
  Toolbar,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const TopAppBar = ({ setSelectedRestaurant }) => {
  const handleBackButton = () => {
    setSelectedRestaurant(null);
    localStorage.removeItem("selectedRestaurant");
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
      }}
      elevation={0}
    >
      <Box sx={{}}>
        <AppBar position="static">
          <Toolbar maxHeight="20px" sx={{ maxHeight: "20px" }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleBackButton}
              color="inherit"
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              fontFamily="Lilita One"
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
              }}
            >
              whatSUP
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </Paper>
  );
};
export default TopAppBar;
