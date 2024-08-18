import * as React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Grid } from "@mui/material";

export default function MyInfo({ currUser, myinfo, open }) {
  return (
    <Card
      sx={{
        background: "rgba(255,255,255,0.9)",
        marginY: 3,
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        flexFlow: { xs: "column", md: "row" },
      }}
    >
      <Avatar
        alt={currUser ? currUser.displayName : ""}
        src={currUser ? currUser.photoURL : ""}
        sx={{ width: "100px", height: "100px", margin: 3 }}
      />

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {myinfo && myinfo.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {`${myinfo && myinfo.email} | +91-${myinfo && myinfo.phoneNo}`}
          </Typography>
          {myinfo && myinfo.accountType === "Student" ? (
            <>
              <Typography variant="subtitle2" sx={{ display: "inline" }}>
                Department:{" "}
              </Typography>
              <Typography variant="body2" sx={{ display: "inline" }}>
                {myinfo && myinfo.department}
                <br />
              </Typography>
              <Typography variant="subtitle2" sx={{ display: "inline" }}>
                Major:{" "}
              </Typography>
              <Typography variant="body2" sx={{ display: "inline" }}>
                {myinfo && myinfo.major}
                <br />
              </Typography>
              <Typography variant="subtitle2" sx={{ display: "inline" }}>
                Graduation Year:{" "}
              </Typography>
              <Typography variant="body2" sx={{ display: "inline" }}>
                {myinfo && myinfo.graduationYear}
                <br />
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="subtitle2" sx={{ display: "inline" }}>
                Account Type:{" "}
              </Typography>
              <Typography variant="body2" sx={{ display: "inline" }}>
                {myinfo && myinfo.accountType}
                <br />
              </Typography>
            </>
          )}
          {open ? (
            <>
              <Typography component="div" variant="h5">
                Skills
              </Typography>
              <Grid>
                {myinfo.skills.map((skill) => (
                  <Typography>{skill}</Typography>
                ))}
              </Grid>
              <Typography component="div" variant="h5">
                Links
              </Typography>
              <Grid>
                <Typography>LinkedIn: {myinfo.linkedIn}</Typography>
                <Typography>Github: {myinfo.github}</Typography>
              </Grid>
              <Typography component="div" variant="h5">
                Experience
              </Typography>
              <Grid>
                {myinfo.experience.map((exp) => (
                  <>
                    <Typography>CompanyName:{exp.companyName}</Typography>
                    <Typography>
                      {" "}
                      Position Of responsibility:{exp.position}
                    </Typography>
                  </>
                ))}
              </Grid>
              <Typography component="div" variant="h5">
                Locations Preferred
              </Typography>
              <Grid>
                {myinfo.location.map((loc) => (
                  <>
                    <Typography>{loc}</Typography>
                  </>
                ))}
              </Grid>
            </>
          ) : (
            <></>
          )}
        </CardContent>
      </Box>
    </Card>
  );
}
