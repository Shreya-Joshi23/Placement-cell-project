import {
  Avatar,
  Box,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  Autocomplete,
} from "@mui/material";
import { collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {db} from "../../Firebase/firebase"

const predefinedSkills = [
  "JavaScript",
  "Python",
  "Java",
  "C++",
  "C#",
  "Ruby",
  "Go",
  "Swift",
  "Kotlin",
  "PHP",
  "TypeScript",
  "SQL",
  "HTML",
  "CSS",
  "React",
  "Angular",
  "Vue",
  "Node.js",
  "Django",
  "Flask",
  "Spring",
  "Hibernate",
  "TensorFlow",
  "PyTorch",
];

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const Profile = ({ currUser }) => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [userData, setUserData] = useState({
    // Personal details
    accountType: "",
    rollNo: "",
    email: "",
    name: "",
    phoneNo: "",
    state: "",
    // School details
    department: "",
    major: "",
    graduationYear: "",
    // Skills
    skills: [],
    //Links
    linkedIn:"",
    github:"",
    // Experience
    experience: [],
    // Preferences
    location: [],
    uid: "",
  });

  const [newExperience, setNewExperience] = useState({
    companyName: "",
    position: "",
  });

  const [showExperienceInput, setShowExperienceInput] = useState(false);

  useEffect(() => {
    setError("");
  }, []);

  useEffect(() => {
    if (!currUser) {
      navigate("/login");
      return;
    }

    const q = query(collection(db, "users"), where("uid", "==", currUser.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let mytempinfo;
      querySnapshot.forEach((doc) => {
        mytempinfo = { ...doc.data(), key: doc.id };
      });
      setUserData(mytempinfo);
    });

    return () => {
      unsubscribe();
    };

  }, [currUser, navigate]);

  const updateProfileFunction = async (e) => {
    e.preventDefault();
    try {
      // Handle the profile update logic here
      const userRef = doc(db, "users", userData.key);
      await updateDoc(userRef, {
        // Personal details
        rollNo: userData.rollNo,
        email: userData.email,
        name: userData.name,
        phoneNo: userData.phoneNo,
        state: userData.state,
        // School details
        department: userData.department,
        major: userData.major,
        graduationYear: userData.graduationYear,
        //Links
        linkedIn:userData.linkedIn,
        github:userData.github,
        // Skills
        skills: userData.skills,
        // Experience
        experience: userData.experience,
        // Preferences
        location: userData.location,
      });
      alert("Profile Updated !","success");
      navigate("/studentDashboard");
    } catch (error) {
      setError(
        error.code.substring(error.code.indexOf("/") + 1).replaceAll("-", " ")
      );
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleExperienceChange = (e) => {
    const { name, value } = e.target;
    setNewExperience({
      ...newExperience,
      [name]: value,
    });
  };

  const handleSkillsChange = (event, value) => {
    setUserData({
      ...userData,
      skills: value,
    });
  };

  const handlestateChange = (event, value) => {
    setUserData({
      ...userData,
      location: value,
    });
  };

  const addExperience = () => {
    setUserData({
      ...userData,
      experience: [...userData.experience, newExperience],
    });
    setNewExperience({ companyName: "", position: "" });
    setShowExperienceInput(false);
  };

  return (
    <>
      <Container component="main" maxWidth="md">
        <Paper
          sx={{
            my: 3,
            p: 3,
            marginTop: 8,
            marginBottom: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 3,
          }}
        >
          <Avatar
            alt={currUser ? currUser.displayName : ""}
            src={currUser ? currUser.photoURL : ""}
            sx={{ width: "100px", height: "100px", margin: 3 }}
          />
          <Typography component="h1" variant="h5">
            Update Profile
          </Typography>
          <Box component="form" sx={{ mt: 3 }} onSubmit={updateProfileFunction}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography component="h1" variant="h5">
                  Personal Details
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="accountType"
                  value={userData.accountType}
                  label="Account Type"
                  id="accountType"
                  disabled
                  onChange={handleChange}
                  sx={{ mt: 2, mb: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="rollNo"
                  value={userData.rollNo}
                  label="Roll No"
                  id="rollNo"
                  onChange={handleChange}
                  sx={{ mt: 2, mb: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="email"
                  value={userData.email}
                  label="Email"
                  id="email"
                  disabled
                  onChange={handleChange}
                  sx={{ mt: 2, mb: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="name"
                  value={userData.name}
                  label="Name"
                  disabled
                  id="name"
                  onChange={handleChange}
                  sx={{ mt: 2, mb: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="phoneNo"
                  value={userData.phoneNo}
                  label="Phone No"
                  id="phoneNo"
                  onChange={handleChange}
                  sx={{ mt: 2, mb: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  id="state"
                  options={states}
                  onChange={handleChange}
                  renderInput={(params) => (
                    <TextField {...params} name="state" label="state" />
                  )}
                />
              </Grid> */}

              <>
                <Grid item xs={12}>
                  <Typography component="h1" variant="h5">
                    School Details
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="department"
                    value={userData.department}
                    label="Department"
                    id="department"
                    onChange={handleChange}
                    sx={{ mt: 2, mb: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="major"
                    value={userData.major}
                    label="Major"
                    id="major"
                    onChange={handleChange}
                    sx={{ mt: 2, mb: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="graduationYear"
                    value={userData.graduationYear}
                    label="Graduation Year"
                    id="graduationYear"
                    onChange={handleChange}
                    sx={{ mt: 2, mb: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}
                  />
                </Grid>
              </>

              <Grid item xs={12}>
                <Typography component="h1" variant="h5">
                  Skills
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  options={predefinedSkills}
                  getOptionLabel={(option) => option}
                  value={userData.skills}
                  onChange={handleSkillsChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Skills"
                      placeholder="Select your skills"
                      sx={{ mt: 2, mb: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography component="h1" variant="h5">
                  Links
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                    fullWidth
                    name="linkedIn"
                    value={userData.linkedIn}
                    label="LinkedIn"
                    id="linkedIn"
                    onChange={handleChange}
                    sx={{ mt: 2, mb: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    fullWidth
                    name="github"
                    value={userData.github}
                    label="Github"
                    id="github"
                    onChange={handleChange}
                    sx={{ mt: 2, mb: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography component="h1" variant="h5">
                  Experience
                </Typography>
              </Grid>
              { userData.experience.map((exp, index) => (
                <Grid item xs={12} key={index}>
                  <Typography>{`Company: ${exp.companyName}, Position: ${exp.position}`}</Typography>
                </Grid>
              ))}
              {showExperienceInput && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="companyName"
                      value={newExperience.companyName}
                      label="Company Name"
                      id="companyName"
                      onChange={handleExperienceChange}
                      sx={{ mt: 2, mb: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="position"
                      value={newExperience.position}
                      label="Position"
                      id="position"
                      onChange={handleExperienceChange}
                      sx={{ mt: 2, mb: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={addExperience}
                      sx={{ mt: 2, mb: 2 }}
                    >
                      Add
                    </Button>
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={() => setShowExperienceInput(true)}
                  sx={{ mt: 2, mb: 2 }}
                >
                  Add Experience
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography component="h1" variant="h5">
                  Preferences
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  options={states}
                  getOptionLabel={(option) => option}
                  value={userData.location}
                  onChange={handlestateChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Location"
                      placeholder="Select your preferred locations"
                      sx={{ mt: 2, mb: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}
                    />
                  )}
                />
              </Grid>

              {/* <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <Typography variant="h5">Upload Your Resume</Typography>
                </Grid>
                <Grid item xs={12}>
                  <input
                    type="file"
                    onChange={handleChange}
                    style={{ display: "none" }}
                    id="upload-file"
                  />
                  <label htmlFor="upload-file">
                    <Button variant="outlined" component="span">
                      Choose File
                    </Button>
                  </label>
                  {file && <Typography variant="body1">{file.name}</Typography>}
                </Grid>
                <Grid item xs={12}>
                  {error && (
                    <Typography variant="body2" color="error">
                      {error}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpload}
                    disabled={!file}
                  >
                    Upload
                  </Button>
                </Grid>
              </Grid> */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Update Profile
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Profile;
