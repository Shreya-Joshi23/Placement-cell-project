import  {useState,useEffect} from "react";
import { db } from "../../Firebase/firebase"; // Import your Firestore instance
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";

export default function CompanyInfo({ currUser,companyData }) {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isAdmin,setisAdmin]=useState(false);
  const [editedCompanyData, setEditedCompanyData] = useState({
    companyName: companyData.companyName,
    jobRole: companyData.jobRole,
    description: companyData.description,
    eligibility: companyData.eligibility,
    skills: companyData.skills,
  });

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const fetchUserRole = async () => {
      if(currUser){
      const userDoc = await getDoc(doc(db, "users", currUser.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.accountType === "Student") {
          setisAdmin(false);
        }
      }
    }
    };

    fetchUserRole();
  }, [currUser]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    const companyDocRef = doc(db, "companies", companyData.key); 
    await updateDoc(companyDocRef, editedCompanyData);
    setEditMode(false);
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCompanyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <IconButton aria-label="Info" color="primary" onClick={handleClickOpen}>
        <InfoIcon />
      </IconButton>

      <Dialog
        fullScreen={fullScreen}
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {editMode ? "Edit Company" : "Company Information"}
        </DialogTitle>
        <DialogContent>
          {editMode ? (
            <>
              <TextField
                name="companyName"
                label="Company Name"
                fullWidth
                margin="dense"
                required
                value={editedCompanyData.companyName}
                onChange={handleChange}
              />
              <TextField
                name="jobRole"
                label="Job Role"
                fullWidth
                required
                margin="dense"
                value={editedCompanyData.jobRole}
                onChange={handleChange}
              />
              <TextField
                name="description"
                label="Description"
                fullWidth
                required
                margin="dense"
                value={editedCompanyData.description}
                onChange={handleChange}
              />
              <TextField
                name="eligibility"
                label="Eligibility"
                fullWidth
                margin="dense"
                required
                value={editedCompanyData.eligibility}
                onChange={handleChange}
              />
              <TextField
                name="skills"
                label="Skills"
                fullWidth
                required
                margin="dense"
                value={editedCompanyData.skills}
                onChange={handleChange}
              />
            </>
          ) : (
            <DialogContentText>
              <Typography variant="subtitle2" sx={{ display: "inline" }}>
                Name:{" "}
              </Typography>
              <Typography variant="body2" sx={{ display: "inline" }}>
                {companyData.companyName}
                <br />
              </Typography>
              <Typography variant="subtitle2" sx={{ display: "inline" }}>
                Job Role:{" "}
              </Typography>
              <Typography variant="body2" sx={{ display: "inline" }}>
                {companyData.jobRole}
                <br />
              </Typography>
              <Typography variant="subtitle2" sx={{ display: "inline" }}>
                Description:{" "}
              </Typography>
              <Typography variant="body2" sx={{ display: "inline" }}>
                {companyData.description}
                <br />
              </Typography>
              <Typography variant="subtitle2" sx={{ display: "inline" }}>
                Eligibility:{" "}
              </Typography>
              <Typography variant="body2" sx={{ display: "inline" }}>
                {companyData.eligibility}
                <br />
              </Typography>
              <Typography variant="subtitle2" sx={{ display: "inline" }}>
                Skills Required:{" "}
              </Typography>
              <Typography variant="body2" sx={{ display: "inline" }}>
                {companyData.skills}
                <br />
              </Typography>
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          {editMode ? (
            <Button onClick={handleSave}>Save</Button>
          ) : (
            <Button disabled={!isAdmin} onClick={handleEdit}>Edit</Button>
          )}
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
