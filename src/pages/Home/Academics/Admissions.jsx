import { Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Admissions = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Admissions
      </Typography>
      <Container>
        <Typography variant="h5"  sx={{ mt: 4, mb: 4 }}>BTech Admissions 2024-25</Typography>
        <Link to="https://www.hnbgu.ac.in/sites/default/files/2024-08/Prospectus%20%282024-25%29.pdf">
          Click Here for Prospectus for Academic Session 2024-25
        </Link>
      </Container>
    </Container>
  );
};

export default Admissions;
