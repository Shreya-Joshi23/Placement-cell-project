import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

//images
import img1 from "../../assets/CarouselImg/img1.jpg";
import img2 from "../../assets/CarouselImg/img2.webp";
import img3 from "../../assets/CarouselImg/img3.avif";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ margin: "0 10px" }}>
        <SimpleSlider />
      </Box>
      <Paper
        elevation={5}
        sx={{ width: "95%", marginY: 4, marginX: "auto", padding: 0 }}
      >
        <Box
          sx={{
            padding: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            flexFlow: "wrap row",
          }}
        >
          <Button
            color="success"
            variant="contained"
            sx={{ px: 3, py: 1 }}
            onClick={() => navigate("/signup")}
          >
            New User
          </Button>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ padding: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  marginBottom: 3,
                  textDecoration: "underline",
                  textAlign: "center",
                }}
              >
                Instruction to Applicants
              </Typography>
              <ul>
                <li>
                  <Typography variant="body1" sx={{ marginBottom: 3 }}>
                    Ensure you have a valid email ID and mobile number for
                    registration and communication purposes.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" sx={{ marginBottom: 3 }}>
                    Enter all your educational qualifications accurately. Upload
                    your recent photograph and signature in the specified
                    formats.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" sx={{ marginBottom: 3 }}>
                    Only full-time regular students of various university
                    departments of study and research are eligible for
                    placement.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" sx={{ marginBottom: 3 }}>
                    The allotment is based on the details provided in your
                    online application. Any discrepancies between the online
                    information and original documents at the time of
                    verification will lead to the cancellation of your
                    allotment.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" sx={{ marginBottom: 3 }}>
                    Failure to report at the stipulated time and date will
                    result in the forfeiture of your placement opportunity.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" sx={{ marginBottom: 3 }}>
                    Any discrepancy in the online details furnished by the
                    candidates with the original documents submitted at the time
                    of admissions will lead to the cancellation of allotment.
                  </Typography>
                </li>
              </ul>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

const SimpleSlider = () => {
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    adaptiveHeight: true,
  };
  return (
    <Slider {...settings}>
      <div>
        <img
          src={img1}
          alt=""
          style={{ width: "100%", height: "70vw", maxHeight: "60vh" }}
        />
      </div>
      <div>
        <img
          src={img2}
          alt=""
          style={{ width: "100%", height: "70vw", maxHeight: "60vh" }}
        />
      </div>
      <div>
        <img
          src={img3}
          alt=""
          style={{ width: "100%", height: "70vw", maxHeight: "60vh" }}
        />
      </div>
    </Slider>
  );
};

export default Home;
