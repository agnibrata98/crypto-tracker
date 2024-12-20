import { Container, Typography } from '@mui/material'
import React from 'react'
import Carousel from './Carousel';

// const useStyles = makeStyles((theme) => ({
//     banner: {
//       backgroundImage: "url(./banner2.jpg)",
//     },
//     bannerContent: {
//       height: 400,
//       display: "flex",
//       flexDirection: "column",
//       paddingTop: 25,
//       justifyContent: "space-around",
//     },
//     tagline: {
//       display: "flex",
//       height: "40%",
//       flexDirection: "column",
//       justifyContent: "center",
//       textAlign: "center",
//     },
//     carousel: {
//       height: "50%",
//       display: "flex",
//       alignItems: "center",
//     },
//   }));

const Banner = () => {
  return (
    <div style={{ backgroundImage: "url(./banner2.jpg)" }}>
      <Container style={{ height: 400, display: "flex", flexDirection: "column", paddingTop: 25, justifyContent: "space-around",}}>
        <div style={{ display: "flex", height: "40%", flexDirection: "column", justifyContent: "center", textAlign: "center",}}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            Crypto Hunter
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </div>
        <Carousel style={{ height: "50%", display: "flex", alignItems: "center"}}/>
      </Container>
    </div>
  )
}

export default Banner