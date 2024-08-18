import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  Chip,
  Link,
} from "@mui/material";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const Contactus = () => {
  const [form, setform] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setform({
      ...form,
      [name]: value,
    });
  };

  const SERVICE_ID = process.env.REACT_APP_SERVICE_ID;
  const TEMPLATE_ID = process.env.REACT_APP_TEMPLATE_ID;
  const API_KEY = process.env.REACT_APP_API_KEY;

  console.log(API_KEY);

  const handleSubmit = (e) => {
    e.preventDefault();
    // setloading(true);
    emailjs
      .send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Shreya Joshi",
          from_email: form.email,
          to_email: "joshi2003shreya@gmail.com",
          subject: form.subject,
          message: form.message,
        },
        API_KEY
      )
      .then(() => {
        // setloading(false);
        alert("Thank you. I will get back to you as soon as possible");
        setform(
          {
            name: "",
            email: "",
            subject: "",
            message: "",
          },
          (error) => {
            // setloading(false);
            console.log(error);
            alert("Something went wrong");
          }
        );
      });
  };

  return (
    <Box>
      <Box
        className="overflow-hidden  pb-[30%] relative h-0"
        sx={{
          position: "relative",
          paddingBottom: "30%",
          height: 0,
          overflow: "hidden",
        }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3447.324584880232!2d78.80097037560188!3d30.227819074831714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3909a57cd77b8f95%3A0xb995b03d1dd555b0!2sHemvati%20Nandan%20Bahuguna%20Garhwal%20University%20(HNBGU)%2C%20Srinagar!5e0!3m2!1sen!2sin!4v1717653036156!5m2!1sen!2sin"
          width="600"
          height="450"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="b-0 absolute h-full w-full ml-0 mt-0"
          style={{
            border: 0,
            position: "absolute",
            height: "100%",
            width: "100%",
          }}
        ></iframe>
      </Box>

      <Grid container spacing={2} sx={{ mt: 4, mx: 2 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, boxShadow: 3 }}>
            <Typography variant="h5" gutterBottom>
              Get in touch
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              PLACEMENT CELL HNBGU
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Location:
              </Typography>
              <Typography variant="body2">
                Hemvati Nandan Bahuguna Garhwal University (HNBGU), Srinagar
                6RH3+4CF, Madhi Chauras, Srinagar, Naur, Uttarakhand 246174
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Email:
              </Typography>
              <Typography variant="body2">
                {" "}
                <Link href="mailto:registrar.hnbgu@gmail.com">
                registrar.hnbgu@gmail.com
                </Link>
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                LinkedIn:
              </Typography>
              <Link href="https://www.linkedin.com/groups/14482522/">
                https://www.linkedin.com/groups/14482522/
              </Link>
            </Box>

            <br />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, boxShadow: 3 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    name="name"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                    variant="outlined"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Your Email"
                    name="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    variant="outlined"
                    margin="normal"
                  />
                </Grid>
              </Grid>
              <TextField
                fullWidth
                label="Subject"
                placeholder="Subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                sx={{ mt: 2 }}
              />
              <TextField
                fullWidth
                label="Message"
                name="message"
                placeholder="Enter your message"
                value={form.message}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                multiline
                rows={4}
                sx={{ mt: 2 }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Send Message
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contactus;
