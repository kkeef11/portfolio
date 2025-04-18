import { Box, Grid, Typography } from "@mui/material";

export default function Home() {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "90%", width: "100%" }}
      spacing={2}
    >
      <Grid
        size={{ xs: 12, md: 8, lg: 6 }}
        sx={{ paddingLeft: "1rem", paddingRight: "1rem" }}
      >
        <Typography
          variant="h3"
          color="white"
          fontFamily="Open Sans"
          paddingBottom="3rem"
          textAlign="center"
        >
          Hey, my name&apos;s Kevin!
        </Typography>
      </Grid>
      <Grid
        size={{ xs: 12, md: 8, lg: 6 }}
        sx={{ paddingLeft: "1rem", paddingRight: "1rem" }}
      >
        <Typography variant="body1" color="white" fontFamily="Open Sans">
          I&apos;m a software engineer with six years of experience specializing
          in full-stack development, primarily focused on React.js and
          TypeScript for the frontend and Node.js for the backend. I have
          hands-on experience working with both the MERN (MongoDB, Express,
          React, Node.js) and PERN (PostgreSQL, Express, React, Node.js) stacks.
        </Typography>
        <Typography
          variant="body1"
          color="white"
          fontFamily="Open Sans"
          sx={{ mt: 2 }}
        >
          My current tech stack includes TypeScript, React.js, Node.js,
          PostgreSQL (RDBMS), Prisma ORM, and Elasticsearch (NoSQL). I also have
          experience working with AWS cloud infrastructure and managing CI/CD
          via GitHub actions. I&apos;m passionate about building scalable,
          efficient applications and as well as bringing UI/UX designs to life.
        </Typography>
        <Box display="flex" justifyContent="center" paddingTop="1.5rem">
          <Typography variant="body1" color="white" fontFamily="Open Sans">
            Thanks for swinging by!
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
