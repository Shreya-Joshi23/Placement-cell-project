import { Button, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const PlacementStats = () => {
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
        Placement Stats
        <ArrowDropDownIcon/>
      </Button>
      <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      >
          <MenuItem onClick={()=>{handleClose();navigate("/buildarelation")}}>Build a relation with us</MenuItem>
          <MenuItem onClick={()=>{handleClose();navigate("/whyrecruitus")}}>Why Recruit from us</MenuItem>
          <MenuItem onClick={()=>{handleClose();navigate("/contactus")}}>Contact Us</MenuItem>
      </Menu>
      </>
    );
}

export default PlacementStats
