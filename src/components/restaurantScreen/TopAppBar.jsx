/* eslint-disable quotes */
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const TopAppBar = ({ setSelectedRestaurant }) => {
  const handleBackButton = () => {
    setSelectedRestaurant(null);
  };

  // return (
  //   <AppBar position="static">
  //     <Container maxWidth="xl">
  //       <Toolbar disableGutters>
  //         <Typography
  //           variant="h6"
  //           noWrap
  //           component="div"
  //           sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
  //         >
  //           whatSUP
  //         </Typography>

  //         <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
  //           <IconButton
  //             size="large"
  //             aria-label="account of current user"
  //             aria-controls="menu-appbar"
  //             aria-haspopup="true"
  //             onClick={handleBackButton}
  //             color="inherit"
  //           >
  //             <ArrowBackIosNewIcon />
  //           </IconButton>
  //         </Box>

  //         <Typography
  //           variant="h6"
  //           noWrap
  //           component="div"
  //           sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
  //         >
  //           whatSUP
  //         </Typography>
  //       </Toolbar>
  //     </Container>
  //   </AppBar>
  // );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
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
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            whatSUP
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default TopAppBar;
