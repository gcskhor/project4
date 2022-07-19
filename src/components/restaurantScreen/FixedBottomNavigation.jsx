/* eslint-disable react/prop-types */
/* eslint-disable quotes */

import React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";

import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";
import ReviewsIcon from "@mui/icons-material/Reviews";
import ChatIcon from "@mui/icons-material/Chat";

export default function FixedBottomNavigation({ tabIndex, setTabIndex }) {
  return (
    <Box sx={{ pb: 7 }}>
      <Paper
        sx={{
          position: "fixed", bottom: 0, left: 0, right: 0,
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={tabIndex}
          onChange={(event, newValue) => {
            setTabIndex(newValue);
          }}
        >
          <BottomNavigationAction label="Info" icon={<InfoIcon />} />
          <BottomNavigationAction label="Reviews" icon={<ReviewsIcon />} />
          <BottomNavigationAction label="Chat" icon={<ChatIcon />} />
          <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
