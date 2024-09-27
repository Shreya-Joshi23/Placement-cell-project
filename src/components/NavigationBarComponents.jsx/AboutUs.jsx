import React, { useState } from "react";
import SchoolIcon from "@mui/icons-material/School";
import { useNavigate } from "react-router";
import { Button, Menu, MenuItem } from "@mui/material";

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const AboutUs = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick=(event)=>{
    setAnchorEl(event.currentTarget)
  }

  const handleClose=()=>{
    setAnchorEl(null);
  }

  return (
    <>
    <Button
      sx={{
        my: 2,
        color: "white",
        display: "flex",
        alignItems: "center",
      }}
      onClick={handleClick}
    >
      <SchoolIcon sx={{ marginRight: 1 }} />
      About Us
      <ArrowDropDownIcon/>
    </Button>
    <Menu 
    anchorEl={anchorEl}
    open={open}
    onClose={handleClose}
    >
        <MenuItem onClick={()=>{handleClose();navigate("/history")}}>History</MenuItem>
        <MenuItem onClick={()=>{handleClose();navigate("/facilities")}}>Facilities</MenuItem>
        <MenuItem onClick={()=>{handleClose();navigate("/hodCorner")}}>HOD's Corner</MenuItem>
        <MenuItem onClick={()=>{handleClose();navigate("/gallery")}}>Gallery</MenuItem>
    </Menu>
    </>
  );
};

export default AboutUs;
