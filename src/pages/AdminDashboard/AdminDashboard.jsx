import React, { useEffect, useState } from "react";
import MyInfo from "../../components/MyInfo";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import { useNavigate } from "react-router";
import UsersTable from "./UsersTable";
import { Paper } from "@mui/material";
import { toast } from "react-hot-toast";

const AdminDashboard = ({currUser}) => {
  const [myinfo, setmyinfo] = useState({});
  const navigate=useNavigate();

  useEffect(() => {
    if (!currUser) {
      navigate("/login");
      return;
    }

    const q = query(
      collection(db, "users"),
      where("uid", "==", currUser.uid)
    );
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
        <UsersTable currUser={currUser} myinfo={myinfo}  />
      </Paper>
    </>
  );
};

export default AdminDashboard;
