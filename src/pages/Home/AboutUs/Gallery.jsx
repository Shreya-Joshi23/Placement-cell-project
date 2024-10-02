import { Container, Typography } from "@mui/material";
import React from "react";
import Slider from "react-slick";

import cse1 from "../../../assets/cse/cse1.jpg";
import cse2 from "../../../assets/cse/cse2.jpeg";
import cse3 from "../../../assets/cse/cse3.jpg";

import ece1 from "../../../assets/ece/ece1.jpeg";
import ece2 from "../../../assets/ece/ece2.jpeg";
import ece3 from "../../../assets/ece/ece3.jpeg";

import eie1 from "../../../assets/eie/eie1.jpg";
import eie2 from "../../../assets/eie/eie2.jpg";

import it1 from "../../../assets/it/it1.jpeg";
import it2 from "../../../assets/it/it2.jpeg";

import me1 from "../../../assets/me/me1.jpg";
import me2 from "../../../assets/me/me2.jpg";
import me3 from "../../../assets/me/me3.jpeg";
import me4 from "../../../assets/me/me4.jpeg";

const departments = [
  {
    name: "Department of Computer Science and Engineering",
    images: [cse1, cse2, cse3],
  },
  {
    name: "Department of Electronics and Electrical Engineering",
    images: [ece1, ece2, ece3],
  },
  {
    name: "Department of Instrumentation Engineering",
    images: [eie1, eie2],
  },
  {
    name: "Department of Mechanical Engineering",
    images: [me1, me2, me3, me4],
  },
  {
    name: "Department of Information Technology",
    images: [it1, it2],
  },
];

const Gallery = () => (
  <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
      Gallery
    </Typography>
    {departments.map((department, index) => (
      <Container key={index}>
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          {department.name}
        </Typography>
        <SimpleSlider images={department.images} />
      </Container>
    ))}
  </Container>
);

const SimpleSlider = ({ images }) => {
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    adaptiveHeight: true,
  };

  return (
    <Slider {...settings}>
      {images.map((img, index) => (
        <div key={index}>
          <img
            src={img}
            alt={`slide-${index}`}
            style={{ width: "100%", height: "70vw", maxHeight: "60vh" }}
          />
        </div>
      ))}
    </Slider>
  );
};

export default Gallery;
