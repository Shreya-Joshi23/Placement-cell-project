import { Container, ImageList, ImageListItem, Typography } from "@mui/material";
import React from "react";

import record1 from "../../../assets/records/record1.jpeg";
import record2 from "../../../assets/records/record2.jpeg";

const Whyrecruitus = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <br />
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Why Recruit from HNBGU?
      </Typography>
      <br />
      <br />
      <Typography>
        Recruiting from Hemvati Nandan Bahuguna Garhwal University (HNBGU)
        offers access to a diverse pool of talented and highly motivated
        individuals equipped with a robust foundation in technical skills,
        problem-solving, and innovative thinking. HNBGU fosters a holistic
        learning environment that combines academic excellence with practical
        experience, ensuring that its graduates are well-prepared to meet the
        evolving challenges of the professional world. With a focus on hands-on
        learning, interdisciplinary approaches, and a strong work ethic,
        students from HNBGU bring a unique blend of creativity, technical
        proficiency, and a growth mindset to any organization.
      </Typography>
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Excellent previous records
      </Typography>
      <ImageList sx={{ width: 1000, height: 500 }} cols={2} rowHeight={500}>
        {itemData.map((item) => (
          <ImageListItem key={item.title}>
            <img
              src={item.img}
              alt={item.title}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  );
};

const itemData = [
  {
    img: record1,
    title: "img1",
  },
  {
    img: record2,
    title: "img2",
  },
];

export default Whyrecruitus;
