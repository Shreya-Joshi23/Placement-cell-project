import { Button, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';

import SchoolIcon from '@mui/icons-material/School';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Academics = () => {
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
        <SchoolIcon  sx={{ marginRight: 1 }}/>
        Academics
        <ArrowDropDownIcon/>
      </Button>
      <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      >
          <MenuItem onClick={()=>{handleClose();navigate("/admissions")}}>Admissions</MenuItem>
          <MenuItem onClick={()=>{handleClose();navigate("/courses")}}>Courses</MenuItem>
      </Menu>
      </>
    );
}

export default Academics
