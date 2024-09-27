import { Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Buildarelation = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <br />
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Build a relation with us
      </Typography>
      <br />
      <br />
      <Typography>
        We, at BTech HNBGU, believe in building long term mutually beneficial
        relationship with the organizations. This is evident from the fact that
        most of our recruiters wants to engage with us in activities beyond
        placements like conducting workshops, sessions and being knowledge
        partners for the student driven activities. The organizations engage
        with students to enhance their visibility among the students and
        mutually benefit from these engagements. We are open to discussion and
        suggestions from organizations of various domains for Summer
        Internships, Live Projects and Executive Placements. Interested
        companies can get in touch with us or leave us your contact details at{" "}
        <Link to=" chairpersonplacementcell.hnbgu@outlook.com.">
          {" "}
          chairpersonplacementcell.hnbgu@outlook.com.
        </Link>
      </Typography>
    </Container>
  );
};

export default Buildarelation;
