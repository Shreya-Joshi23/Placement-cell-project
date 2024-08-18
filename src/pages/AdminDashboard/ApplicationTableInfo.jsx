import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function ApplicationTableInfo({ currapplication }) {
  const [open, setOpen] = useState(false);
  const [scheduleOpen, setscheduleOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  if (!currapplication.key) {
    console.log("current application key not present");
    return null;
  }
  const applicationsRef = doc(db, "applications", currapplication.key);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setscheduleOpen(false);
  };

  const handleSchedule=async ()=>{
    if(selectedDate && selectedTime){
      console.log(selectedDate);
      console.log(typeof(selectedDate));
      const interviewDate = selectedDate.toDate();
      const interviewTime = selectedTime.toDate();
      const interviewDateTime = new Date(
        interviewDate.getFullYear(),
        interviewDate.getMonth(),
        interviewDate.getDate(),
        interviewTime.getHours(),
        interviewTime.getMinutes()
      );
      await updateDoc(applicationsRef,{interviewStatus:"Scheduled",interviewDateTime})
      alert(`Interview Status Changed to scheduled at ${selectedDate} ${selectedTime}`)
      handleClose();
      }else{
        alert("Please select both Date and Time");
      }
  };

  return (
    <>
      <IconButton aria-label="Info" color="primary" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>

      <Dialog
        fullScreen={fullScreen}
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <DialogContentText>
            <Typography variant="subtitle2" sx={{ display: "inline" }}>
              Applicant name:{" "}
            </Typography>
            <Typography variant="body2" sx={{ display: "inline" }}>
              {currapplication.studentName}
              <br />
            </Typography>
            <Typography variant="subtitle2" sx={{ display: "inline" }}>
              CompanyName:{" "}
            </Typography>
            <Typography variant="body2" sx={{ display: "inline" }}>
              {currapplication.companyName}
              <br />
            </Typography>
            <Typography variant="subtitle2" sx={{ display: "inline" }}>
              JobRole:{" "}
            </Typography>
            <Typography variant="body2" sx={{ display: "inline" }}>
              {currapplication.jobRole}
              <br />
            </Typography>
            <Typography variant="subtitle2" sx={{ display: "inline" }}>
              Interview Status:{" "}
            </Typography>
            <Typography variant="body2" sx={{ display: "inline" }}>
              {currapplication.interviewStatus}
              <br />
            </Typography>
            <Typography variant="subtitle2" sx={{ display: "inline" }}>
              Placement Status:{" "}
            </Typography>
            <Typography variant="body2" sx={{ display: "inline" }}>
              {currapplication.placementStatus}
            </Typography>

            <Typography variant="h6" component="p" sx={{ marginY: 2 }}>
              Change Interview Status -
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexFlow: "row wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
              }}
            >
              <Button
                variant="outlined"
                color="success"
                onClick={() => {
                  setscheduleOpen(true)
                  
                }}
              >
                Schedule
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={async () => {
                  await updateDoc(applicationsRef, {
                    interviewStatus: "pending",
                    interviewDateTime:"",
                  });
                  handleClose();
                  alert("Interview Status Changed to pending!");
                }}
              >
                pending
              </Button>
            </Box>

            {scheduleOpen && (
              <Box sx={{ marginY: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker 
                    label="Select interview date"
                    sx={{ margin: 2, width: "100%" }}
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    />
                  </DemoContainer>
                  <TimePicker
                    label="Select interview time"
                    sx={{ marginTop: 2, width: "100%" }}
                    value={selectedTime}
                    onChange={(newValue) => setSelectedTime(newValue)}
                  />
                </LocalizationProvider>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSchedule}
                  sx={{ marginTop: 2 }}
                >
                  Confirm Schedule
                </Button>
              </Box>
            )}

            <Typography variant="h6" component="p" sx={{ marginY: 2 }}>
              Change Placement Status -
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexFlow: "row wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
              }}
            >
              <Button
                variant="outlined"
                color="success"
                onClick={async () => {
                  await updateDoc(applicationsRef, {
                    placementStatus: "Placed",
                  });
                  alert("Placed Status Changed!");
                }}
              >
                Placed
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={async () => {
                  await updateDoc(applicationsRef, {
                    placementStatus: "NotPlaced",
                  });
                  alert("Placement Status Changed!");
                }}
              >
                NotPlaced
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={async () => {
                  await updateDoc(applicationsRef, {
                    placementStatus: "pending",
                  });
                  alert("Placement Status Changed!");
                }}
              >
                Pending
              </Button>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
