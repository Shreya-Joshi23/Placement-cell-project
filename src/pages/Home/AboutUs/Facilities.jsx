import { Container, Divider, Grid, Typography } from "@mui/material";
import React from "react";

const Facilities = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Facilities
      </Typography>

      <Typography variant="body1">
        The university has three Campuses - Srinagar with extension Campus
        Chauras, SRT Campus, Badshahithaul, Tehri and BGR Campus Pauri. In all
        the campuses most of the Departments have separate space comprising of
        class rooms, laboratories, Faculty rooms, seminar rooms, administrative
        space etc. In addition to this, Library, Hostels, Common
        Hall/Auditorium, Guest House, Sports and other support facilities and
        Residences of faculty and administrative staff are also available. The
        University has a Construction and Maintenance Section comprising of
        civil and electrical wings headed by Executive Engineer to maintain the
        physical infrastructure of the University
      </Typography>

      <Typography variant="h5" mt={"30px"}gutterBottom>
        IT INFRASTRUCTURE
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="body1">
            Over 50 networked nodes through TCP/IP based high-speed LAN
          </Typography>
          <Divider sx={{ my: 2 , backgroundColor:"blue"}} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1">
            45 Mbps leased line, 5.2 VSAT line with internet connectivity in a distributed environment
          </Typography>
          <Divider sx={{ my: 2, backgroundColor:"blue" }} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1">
            All nodes connected through 10/100 Ethernet LAN SCO UNIX open server, which includes licenses for software 
            (SCO Xvision 97, Sun JAVA, JDK, Netscape Enterprise Server etc.)
          </Typography>
          <Divider sx={{ my: 2, backgroundColor:"blue" }} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1">
            Application Development Software (Visual Basic 6.0, Power Builder 6.0, Visual C++ 5.0, Designer/Developer 2000 
            and Visual J++)
          </Typography>
          <Divider sx={{ my: 2 , backgroundColor:"blue"}} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1">
            All Hostels are Wi-Fi enabled for internet and intranet connectivity. In addition, Cyber Cafe equipped with 
            20 computers are functional in all hostels
          </Typography>
          <Divider sx={{ my: 2 , backgroundColor:"blue"}} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1">
            Library & Information Centre, E-Notice Board, online registration and online placement portals
          </Typography>
          <Divider sx={{ my: 2 , backgroundColor:"blue"}} />
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        LIBRARY COMPUTER & INFORMATION CENTRE
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="body1">
            Latest books and journals
          </Typography>
          <Divider sx={{ my: 2, backgroundColor:"blue" }} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1">
            Extensive Internet surfing facility
          </Typography>
          <Divider sx={{ my: 2 , backgroundColor:"blue"}} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1">
            Access to over 1000 journals, updated monthly
          </Typography>
          <Divider sx={{ my: 2, backgroundColor:"blue" }} />
        </Grid>

      </Grid>
      <Typography variant="h5" mt={"30px"}gutterBottom>
      SPORTING LOOKOUTS
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>

            
        <Grid item xs={12}>
          <Typography variant="body1">
            20 rupee vala Gym
          </Typography>
          <Divider sx={{ my: 2, backgroundColor:"blue" }} />
        </Grid>

          <Typography variant="body1">
            Badminton
          </Typography>
          <Divider sx={{ my: 2, backgroundColor:"blue" }} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1">
            Basketball
          </Typography>
          <Divider sx={{ my: 2 , backgroundColor:"blue"}} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1">
            Lawn tennis
          </Typography>
          <Divider sx={{ my: 2, backgroundColor:"blue" }} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1">
            Table Tennis
          </Typography>
          <Divider sx={{ my: 2, backgroundColor:"blue" }} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1">
            Rock Climbing
          </Typography>
          <Divider sx={{ my: 2 , backgroundColor:"blue"}} />
        </Grid>

        
        <Grid item xs={12}>
          <Typography variant="body1">
            Boxing
          </Typography>
          <Divider sx={{ my: 2, backgroundColor:"blue"}} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Facilities;
