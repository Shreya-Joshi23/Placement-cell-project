import React, { useState } from "react";
import { db } from "../../Firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const AddCompany = ({ open, handleClose }) => {
  const [newCompany, setNewCompany] = useState({
    companyName: "",
    jobRole: "",
    description: "",
    eligibility: "",
    skills: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCompany((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, "companies"), newCompany);
      handleClose();
      setNewCompany({});
    } catch (error) {
      console.error("Error adding company: ", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Add New Company</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="companyName"
          label="Company Name"
          type="text"
          fullWidth
          value={newCompany.companyName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="jobRole"
          label="Job Role"
          type="text"
          fullWidth
          value={newCompany.jobRole}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          value={newCompany.description}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="eligibility"
          label="Eligibility"
          type="text"
          fullWidth
          value={newCompany.eligibility}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="skills"
          label="Skills"
          type="text"
          fullWidth
          value={newCompany.skills}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCompany;
