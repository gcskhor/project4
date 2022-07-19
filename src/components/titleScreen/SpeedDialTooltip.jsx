/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';

export default function SpeedDialTooltipOpen({ setTooltipName, loggedInUser }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const actions = [
    { icon: <LoginIcon />, name: 'Login' },
    { icon: <PersonAddIcon />, name: 'Signup' },
    { icon: <FavoriteIcon />, name: 'Favorites' },
  ];

  loggedInUser
    ? actions.push({ icon: <LogoutIcon />, name: 'Logout' })
    : console.log('no logged in user');

  return (
    <SpeedDial
      ariaLabel="SpeedDial tooltip example"
      sx={{ position: 'absolute', bottom: '5%', right: '10%' }}
      icon={<SpeedDialIcon />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          tooltipOpen
          onClick={() => {
            handleClose();
            setTooltipName(action.name);
          }}
        />
      ))}
    </SpeedDial>
  );
}
