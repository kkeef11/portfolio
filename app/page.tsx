import { Box, Grid2, Typography } from "@mui/material";

export default function Home() {
  return (
    <Grid2
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "90%", width: "100%" }}
      spacing={2}
    >
      <Grid2
        size={{ xs: 12, md: 8, lg: 6 }}
        sx={{ paddingLeft: "1rem", paddingRight: "1rem" }}
      >
        <Typography
          variant="h3"
          color="white"
          fontFamily="Open Sans"
          padding="3rem"
          textAlign="center"
        >
          Hey, my name&apos;s Kevin!
        </Typography>
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
          via GitHub actions. I thrive in collaborative environments and have
          experience mentoring junior developers, contributing not only through
          code but also through team growth and leadership. I&apos;ve helped
          build and scale data-intensive applications, including dashboards that
          visualize real-time energy data, supporting business-critical
          workflows. Lastly, I&apos;m passionate about building scalable,
          efficient applications and as well as bringing UI/UX designs to life.
          Check out my Github or LinkedIn in the top right, or download my
          resume while you&apos;re there!
        </Typography>
        <Box display="flex" justifyContent="center" paddingTop="1.5rem">
          <Typography variant="body1" color="white" fontFamily="Open Sans">
            Thanks for swinging by!
          </Typography>
        </Box>
      </Grid2>
    </Grid2>
  );
}
