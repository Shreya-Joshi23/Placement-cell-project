import React, {  useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from './Firebase/firebase'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Home from './pages/Home/Home';
import NavigationBar from './components/NavigationBar';
import FooterBar from './components/FooterBar';
import SignUp from './pages/SignUpPage/SignUp';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard';
import Login from './pages/Login/Login';
import Contactus from './pages/ContactUs/Contactus';
import Profile from './pages/Profile/Profile';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import Placed from './pages/PlacedStudents/Placed';
import History from './pages/Home/AboutUs/History';
import Gallery from './pages/Home/AboutUs/Gallery';
import Facilities from './pages/Home/AboutUs/Facilities';
import Hodcorner from './pages/Home/AboutUs/Hodcorner';
import Buildarelation from './pages/Home/PlacementStats/Buildarelation';
import Whyrecruitus from './pages/Home/PlacementStats/Whyrecruitus';
import Admissions from './pages/Home/Academics/Admissions';
import Courses from './pages/Home/Academics/Courses';

const App = () => {
  const [currUser, setCurrUser] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrUser(user);
      console.log(user)
    } else {
      setCurrUser(null);
    }
  });

  console.log(currUser);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <NavigationBar currUser={currUser}/>
      <Container maxWidth="xl">
        <Routes>
          {/* Homepage component routes */}
          <Route path='/' element={<Home currUser={currUser} />} />
          <Route path='/facilities' element={<Facilities/>}/>
          <Route path='/history' element={<History/>}/>
          <Route path='/hodCorner' element={<Hodcorner/>}/>
          <Route path='/gallery' element={<Gallery/>}/>

          {/* Placement Stats */}
          <Route path='/buildarelation' element={<Buildarelation/>}/>
          <Route path='/whyrecruitus' element={<Whyrecruitus/>}/>

          {/* Academics */}
          <Route path='/admissions' element={<Admissions/>}/>
          <Route path='/courses' element={<Courses/>}/>

          <Route path='/studentDashboard' element={<StudentDashboard currUser={currUser} />} />
          <Route path='/signup' element={<SignUp currUser={currUser} />} />
          <Route path="/login" element={<Login currUser={currUser}/>}/>
          <Route path='/contactus' element={<Contactus/>}/>
          <Route path='/profile' element={<Profile currUser={currUser}/>}/>
          <Route path='/adminDashboard' element={<AdminDashboard currUser={currUser}/>}/>
          <Route path='/placedstudents' element={<Placed currUser={currUser}/>}/>
        </Routes>
      </Container>
      <FooterBar />
    </Box>
  );
};

export default App;
