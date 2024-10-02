import { ThemeProvider } from "@emotion/react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { auth } from "../../Firebase/firebase";
import { db } from "../../Firebase/firebase";

const SignUp = ({ currUser }) => {
  const navigate = useNavigate();
  const theme = createTheme();

  const [userData, setUserData] = useState({
    name: "",
    phoneNo: "",
    email: "",
    password: "",
    confirmPassword: "",
    departmentName: "",
    majorName: "",
    graduationYear: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (currUser) {
      navigate("/studentDashboard");
      return;
    }
  }, [currUser, navigate]);

  useEffect(()=>{setError("")},[])

  const signUpEmailFunction = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      await updateProfile(userCredential.user, {
        displayName: userData.name,
      });

      const newUserData = {
        //PERSONAL DETAILS
        uid: userCredential.user.uid,
        accountType: "Student",
        rollNo:"",
        name: userData.name,
        phoneNo: userData.phoneNo,
        email: userData.email,
        state:"",
        //SCHOOL DETAILS
        department: "BTech",
        major: userData.majorName,
        graduationYear: userData.graduationYear,
        //SKILLS
        skills:[],
        //LINKS
        github:"",
        linkedIn:"",
        //EXPERIENCE
        experience:[],
        //PREFERENCES
        location:[],
      };

      const result=await addDoc(collection(db, "users"), {
        ...newUserData,
      });
      console.log(result);
      console.log("Signed Up Successfully !");
      alert("Signed Up Successfully !", "success");
      navigate("/studentDashboard");
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    if (
      !userData.name ||
      !userData.phoneNo ||
      !userData.email ||
      !userData.password ||
      !userData.confirmPassword
    ) {
      setError("Please provide value in each field.");
      return;
    }
    if (userData.password.length < 6 || userData.confirmPassword.length < 6) {
      setError("Use minimum 6 charactres in password.");
      return;
    }
    if (userData.password !== userData.confirmPassword) {
      setError("Password does not match");
      return;
    }
    if (userData.phoneNo.length !== 10) {
      setError("Enter 10 digit Phone No.");
      return;
    }

    signUpEmailFunction();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Paper elevation={3} sx={{ margin: 4, padding: 3 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                onChange={handleChange}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="given-name"
                      name="name"
                      value={userData.name}
                      required
                      fullWidth
                      type="text"
                      id="name"
                      label="Full Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="phoneNo"
                      label="Phone No"
                      name="phoneNo"
                      type="text"
                      value={userData.phoneNo}
                      autoComplete="tel-national"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">+91-</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      type="email"
                      value={userData.email}
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      value={userData.password}
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="confirmPassword"
                      value={userData.confirmPassword}
                      label="Confirm Password"
                      type="password"
                      id="confirmPassword"
                      autoComplete="new-password"
                    />
                  </Grid>
                  {/* <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="Department Name">Department</InputLabel>
                      <Select
                        labelId="Department Name Select"
                        id="departmentName"
                        value={userData.departmentName}
                        label="Department Name"
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            departmentName: e.target.value,
                          })
                        }
                      >
                        <MenuItem value={"BTech"}>BTech</MenuItem>
                        <MenuItem value={"MTech"}>MTech</MenuItem>
                        <MenuItem value={"Mca"}>MCA</MenuItem>
                        <MenuItem value={"Bca"}>BCA</MenuItem>
                        <MenuItem value={"Bsc"}>BSC</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid> */}
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="Major Name">Major</InputLabel>
                      <Select
                        labelId="Major Name Select"
                        id="majorName"
                        value={userData.majorName}
                        label="Major Name"
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            majorName: e.target.value,
                          })
                        }
                      >
                        <MenuItem value={"Cse"}>Computer Science</MenuItem>
                        <MenuItem value={"It"}>Information Technology</MenuItem>
                        <MenuItem value={"Ece"}>
                          Electronics and Communication Engineering
                        </MenuItem>
                        <MenuItem value={"Eie"}>
                          Electrical and Intrumentation Engineering
                        </MenuItem>
                        <MenuItem value={"Me"}>Mechanical Engineering</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="graduationYear"
                      value={userData.graduationYear}
                      label="Graduation Year"
                      type="text"
                      id="graduationYear"
                    />
                  </Grid>
                  {error ? (
                    <>
                      <Grid item xs={12}>
                        <Alert severity="error">{error}</Alert>
                      </Grid>
                    </>
                  ) : (
                    <></>
                  )}
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link
                      href="#"
                      variant="body2"
                      onClick={() => navigate("/login")}
                    >
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Paper>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default SignUp;
