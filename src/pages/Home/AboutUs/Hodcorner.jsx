import { CardMedia, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import hod from "../../../assets/hod.png"

const Hodcorner = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>HOD's Corner</Typography>
      <Grid container spacing={4}>

        <Grid item xs={12} sm={4}>
          <CardMedia
            component="img"
            image=  {hod}
            alt="Dr. MP Thapliyal"
            sx={{ width: "100%", borderRadius: "8px" }}
          />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Dr. MP Thapliyal
          </Typography>
        </Grid>

        <Grid item xs={12} sm={8}>
          <Typography variant="body1" paragraph>
Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium quae enim veritatis nesciunt eligendi et, id quia fuga dolor sit sequi deleniti, error odio quas esse inventore, sed nobis magnam!          </Typography>

          <Typography variant="body1" paragraph>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa doloribus repellat quo? Explicabo, quibusdam neque saepe excepturi laborum eum commodi dolorum est deleniti? Ullam, nemo sequi nesciunt facere perspiciatis mollitia.          </Typography>

          <Typography variant="body1" paragraph>
Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis voluptatum tempore animi vel aliquam, earum incidunt beatae doloribus officiis inventore ex ipsum illo sunt voluptatibus? Cupiditate aperiam expedita architecto blanditiis.          </Typography>

          <Typography variant="body1" paragraph>
Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam placeat quod cumque odio, perspiciatis officia voluptatum maiores error ab nulla porro obcaecati ea culpa nihil. Impedit placeat sed architecto aperiam.          </Typography>

          <Typography variant="body1" paragraph>
Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id voluptatibus maxime consectetur dolor vero a quos placeat delectus repudiandae accusamus ipsum debitis non sapiente repellat, velit in fugiat consequatur pariatur.          </Typography>

          <Typography variant="body1" paragraph>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, ipsa doloremque ut at magni ex minus hic earum unde ipsam nemo dolor. Natus facere amet quod ipsa, ducimus officia velit!          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Hodcorner
