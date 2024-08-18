import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../Firebase/firebase";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import MyInfo from "../../components/MyInfo";
import MyCompanies from "./MyCompanies";
import  Paper  from "@mui/material/Paper";
import {toast} from 'react-hot-toast'

const StudentDashboard = ({ currUser }) => {
  const [myinfo, setmyinfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (myinfo && myinfo.accountType) {
      if (myinfo.accountType === "Student") {
        navigate("/studentDashboard");
        toast.success("Student Logged In")
      } else if (myinfo.accountType === "Admin") {
        navigate("/adminDashboard")
        toast.success("Admin Logged In")
      }
    }
  },[myinfo,navigate]);

  useEffect(() => {
    if (!currUser) {
      navigate("/login");
      return;
    }
    const q = query(collection(db, "users"), where("uid", "==", currUser.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let mytempinfo;
      querySnapshot.forEach((doc) => {
        mytempinfo = doc.data();
      });
      setmyinfo(mytempinfo);
    });
    return () => {
      unsubscribe();
    };
  }, [currUser, navigate]);

  return (
    <>
      <MyInfo currUser={currUser} myinfo={myinfo} />
      <Paper elevation={6} sx={{ my: 3, p: 3 }}>
        <MyCompanies currUser={currUser} myinfo={myinfo} />
      </Paper>
    </>
  );
};

export default StudentDashboard;
