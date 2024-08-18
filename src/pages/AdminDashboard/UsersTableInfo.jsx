import * as React from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";

export default function UsersTableInfo({ currUser, notify }) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const usersRef = doc(db, "users", currUser.key);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        <DialogTitle id="responsive-dialog-title">
          {"Account Details "}
          {currUser.accountType === "Student" ? (
            <Chip label="Student" color="success" />
          ) : currUser.accountType === "Admin" ? (
            <Chip label="Admin" color="error" />
          ) : (
            <Chip label={currUser.accountType} color="warning" />
          )}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="subtitle2" sx={{ display: "inline" }}>
              Name:{" "}
            </Typography>
            <Typography variant="body2" sx={{ display: "inline" }}>
              {currUser.name}
              <br />
            </Typography>
            <Typography variant="subtitle2" sx={{ display: "inline" }}>
              Email:{" "}
            </Typography>
            <Typography variant="body2" sx={{ display: "inline" }}>
              {currUser.email}
              <br />
            </Typography>
            <Typography variant="subtitle2" sx={{ display: "inline" }}>
              Phone No:{" "}
            </Typography>
            <Typography variant="body2" sx={{ display: "inline" }}>
              +91-{currUser.phoneNo}
              <br />
            </Typography>
            <Typography variant="subtitle2" sx={{ display: "inline" }}>
              Department:{" "}
            </Typography>
            <Typography variant="body2" sx={{ display: "inline" }}>
              {currUser.Department}
              <br />
            </Typography>
            <Typography variant="subtitle2" sx={{ display: "inline" }}>
              Major{" "}
            </Typography>
            <Typography variant="body2" sx={{ display: "inline" }}>
              {currUser.Major}
              <br />
            </Typography>

            <Typography variant="h6" component="p" sx={{ marginY: 2 }}>
              Change Account Type -
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
                  await updateDoc(usersRef, { accountType: "Student" });
                  alert("Account Type Changed!");
                }}
              >
                Student
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={async () => {
                  await updateDoc(usersRef, { accountType: "Admin" });
                  alert("Account Type Changed!");
                }}
              >
                Admin
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
