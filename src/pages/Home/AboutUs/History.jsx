import { Container, Grid, Typography } from "@mui/material";
import React from "react";

const History = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        History
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="body1" paragraph>
            IHemvati Nandan Bahuguna Garhwal University, was established as a
            State University vide U. P. State Government notification no.
            (10)/(865)/15/(75)(85)/64 dated 23 November 1973. It has a rare
            distinction of taking birth through a powerful and popular movement
            during the early 1970s. This movement symbolized the hopes and
            aspirations of the masses for the development of higher education
            institutions in the Garhwal region. The people of this remote
            mountain region struggled for opening a University in the small but
            historic semi-rural town of Srinagar, Garhwal. It was an expression
            of the quest for empowering their future generations to overcome
            endemic economic and social backwardness, geographic and
            environmental constraints, preserving cultural identity, and
            harnessing the human resources for development.
            Proof-of-year-of-establishment.pdf The HNBGU was converted to a
            Central University on 15th January 2009 by an Act of Parliament i.e.
            The Central Universities Act 2009. The University has thus been
            entrusted with new responsibilities to guide its students, faculty
            and all other stakeholders to achieve excellence in academics and
            strive for the all-round development of the students. Since its
            inception, the University has shown commitment towards regional and
            community development inherent in its teaching courses, research
            agenda and other outreach and extension initiatives. The synergy
            derived from the circumstances of its genesis still inspires and
            promotes its vision for the future. However, being a Central
            University, HNBGU has a Pan-India appeal and draws students from
            various pockets of the country. The University, nestled in the lap
            of Himalaya, ranges in the Garhwal region of Uttarakhand, is a
            residential cum affiliating institution of higher learning. It has
            jurisdiction over seven districts of the Garhwal region of
            Uttarakhand. The University has three Campuses distantly located
            from each other - Birla Campus with its extension at Chauras Campus
            Srinagar Garhwal, B. Gopal Reddy (BGR) Campus Pauri and Swami Ram
            Teerth (SRT) Campus Badshahithaul, Tehri. In addition there are 121
            colleges and institutes affiliated with HNBGU, spreading over seven
            districts of the Garhwal region of Uttarakhand. On University
            Campuses, Undergraduate, Post-Graduate and Doctoral programmes are
            offered in various disciplines. Besides conventional courses, the
            University has introduced some regionally relevant courses of
            greater significance for the mountainous areas.
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Area and people served
          </Typography>
          <Typography variant="body1" paragraph>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Natural Environment
            </Typography>
            From cities and industrial centres to the blessed Himalayas, HNBGU
            creates a fertile ground for the innovative thoughts to flourish.
            The serenity here acts as a catalyst that drives the pursuit of
            knowledge.
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Socio-Cultural
            </Typography>
            Ranging from rural to urban and traditional to modern social
            environment, the University acts as a point of confluence of a
            diverse socio-cultural mix. HNBGU promotes unity in diversity.
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Economic
            </Typography>
            Being a Central University, HNBGU predominantly serves undergraduate
            and post graduate students at subsidized tuition fee. The University
            has provisions for scholarships/ stipends/ fellowships to
            meritorious students and scholars under various schemes notified by
            the Government of India time to time.
          </Typography>

          <br />
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Vision
          </Typography>
          <Typography variant="body1" paragraph>
            To achieve excellence by empowering all stakeholders through
            promotion of innovations in the field of higher education by
            imparting training and education, and encouraging research for the
            development of the country with specific attention to the mountain
            region.
          </Typography>

          <br />
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Mission
          </Typography>
          <Typography variant="body1" paragraph>
            To stimulate the academic environment for promotion of holistic
            learning and research and contribute to the nation’s growth. To
            inculcate values and impart skills for shaping able and responsible
            individuals committed towards the intellectual, academic and
            cultural development of society.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default History;
