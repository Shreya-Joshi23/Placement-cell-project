import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from 'firebase/auth';
import {auth} from '../Firebase/firebase'
import Box from "@mui/material/Box";
import {
  AppBar,
  Avatar,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Tooltip,
} from "@mui/material";
import favicon from "../assets/hnbgulogo.jpg";
import digiIndia from "../assets/digital-india.png";

import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import ReportIcon from "@mui/icons-material/Report";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AboutUs from "./NavigationBarComponents.jsx/AboutUs";
import PlacementStats from "./NavigationBarComponents.jsx/PlacementStats";
import Academics from "./NavigationBarComponents.jsx/Academics";
import People from "./NavigationBarComponents.jsx/People";

const NavigationBar = ({currUser}) => {
  const navigate=useNavigate();

  const signOutFunction = async () => {
    try {
      signOut(auth);
      console.log("Signed Out Successfully !");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const [navbar, setNavbar] = useState({
    left: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setNavbar({ ...navbar, [anchor]: open });
  };

    const list = (anchor) => (
      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        {anchor === "left" ? (
          <>
            <List>
              <ListItem button onClick={() => navigate("/")}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button onClick={() => navigate("/alumni")}>
                <ListItemIcon>
                  <ReportIcon />
                </ListItemIcon>
                <ListItemText primary="Alumni" />
              </ListItem>
              <ListItem button onClick={() => navigate("/contactus")}>
                <ListItemIcon>
                  <PermContactCalendarIcon />
                </ListItemIcon>
                <ListItemText primary="Contact Us" />
              </ListItem>
            </List>
          </>
        ) : (
          <>
            <List>
              <ListItem button onClick={() => navigate("/profile")}>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem button onClick={() => navigate("/studentDashboard")}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <Divider />
              <ListItem button onClick={signOutFunction}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </>
        )}
      </Box>
    );

  return (
    <>
      <Box>
        <AppBar position="static" sx={{ background: "white", color: "black" }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ paddingY: 2 }}>
              <img
                src={favicon}
                alt="HNBGU Logo"
                style={{ height: "100px", padding: "10px" }}
              />
              <Box
                sx={{ display: "flex", flexFlow: "column", cursor: "pointer" }}
                onClick={() =>
                  window.open("https://www.hnbgu.ac.in/home", "_blank")
                }
              >
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
                >
                  HEMVATI NANDAN BAHUGUNA GARHWAL UNIVERSITY
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: { xs: "start", md: "center" },
                    display: { xs: "block", md: "none" },
                  }}
                  component="h6"
                >
                  HNBGU
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ textAlign: { xs: "start", md: "center" } }}
                  component="p"
                >
                  A Central University
                </Typography>

                <Typography
                  variant="h5"
                  component="h5"
                  sx={{
                    display: { xs: "block", md: "none" },
                    fontWeight: "bolder",
                    color: "#008336",
                  }}
                >
                  Placement Cell 
                </Typography>
              </Box>
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  justifyContent: { xs: "center", md: "start" },
                  marginLeft: { xs: 0, md: 2 },
                  alignItems: "center",
                  borderLeft: "2px solid grey",
                }}
              >
                <Typography
                  variant="h4"
                  component="h4"
                  sx={{padding: 2, color: "#008336" }}
                >
                  <Typography variant="h4" sx={{fontWeight:"bolder"}}>Bachelor of Technology</Typography>
                  Placement Cell 
                </Typography>
              </Box>
              <Box
                component="img"
                src={digiIndia}
                alt="Digital India Logo"
                sx={{
                  marginLeft: "auto",
                  height: "100px",
                  padding: "10px",
                  display: { xs: "none", md: "block" },
                }}
              />
            </Toolbar>
          </Container>
        </AppBar>

        {/* 2nd navbar */}
        <AppBar position="sticky" sx={{ background: "#008336" }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={toggleDrawer("left", true)}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              </Box>

              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Button
                  sx={{
                    my: 2,
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                  }}
                    onClick={() => navigate("/")}
                >
                  <HomeIcon sx={{ marginRight: 1 }} />
                  Home
                </Button>
                <AboutUs/>
                <PlacementStats/>
                <Academics/>
                <People/>
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                {currUser ? (
                  <>
                    <Tooltip title="Open settings">
                      <IconButton
                        onClick={toggleDrawer("right", true)}
                        sx={{ p: 0 }}
                      >
                        <Avatar
                          alt={currUser.displayName}
                          src={currUser.photoURL}
                        />
                      </IconButton>
                    </Tooltip>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outlined"
                      color="inherit"
                        onClick={() => navigate("/login")}
                      startIcon={<LoginIcon />}
                    >
                      Sign In
                    </Button>
                  </>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>

      <Drawer
        anchor={"left"}
        open={navbar["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
      {/* right drawer */}
      <Drawer
        anchor={"right"}
        open={navbar["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
      </Drawer>
    </>
  );
};

export default NavigationBar;
