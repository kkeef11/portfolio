import { Box, Divider, Fade, Typography } from "@mui/material";
import { ContentDrop } from "./components/ContentDrop";
import { SkillsLoop } from "./components/SkillsLoop";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import { SkillsLogos } from "./components/SkillsLogos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="auto"
      paddingX="2rem"
      sx={{
        "@media (max-width: 900px)": {
          paddingX: "1rem",
        },
      }}
    >
      <ContentDrop
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "8rem",
        }}
      >
        <Typography
          variant="h2"
          color="white"
          textAlign="center"
          sx={{
            display: "flex",
            alignItems: "center",
            paddingBottom: "1rem",
            "@media (max-width: 900px)": {
              fontSize: "1.8rem",
            },
          }}
        >
          Hey
          <EmojiPeopleIcon fontSize="inherit" sx={{ color: "white" }} />{" "}
          I&apos;m Kevin Keefer
        </Typography>
      </ContentDrop>
      <SkillsLoop />
      <Fade in={true} timeout={1000}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="60%"
          paddingTop="2rem"
          sx={{
            "@media (max-width: 900px)": {
              width: "100%", // Full width for mobile screens
              paddingX: "1rem", // Reduce padding for mobile
            },
          }}
        >
          <Typography fontSize="20px" color="#aaaaaa" paddingBottom="4rem">
            I&apos;m a software engineer with six years of experience
            specializing in full-stack development, primarily focused on
            React.js and TypeScript for the frontend and Node.js for the
            backend. I have hands-on experience working with both the MERN
            (MongoDB, Express, React, Node.js) and PERN (PostgreSQL, Express,
            React, Node.js) stacks.
          </Typography>
          <Box
            sx={{
              borderRadius: "20px",
              border: "1px solid #865bec",
              padding: "1rem",
              marginBottom: "2rem",
            }}
          >
            <Typography variant="subtitle1" color="#aaaaaa">
              Want to get in touch? I&apos;d love to hear from you! Shoot me an{" "}
              <a
                href="mailto:keeferk11@gmail.com"
                style={{
                  textDecoration: "none",
                  color: "#865bec",
                }}
              >
                email
              </a>
              !
            </Typography>
          </Box>
          <Divider
            sx={{
              backgroundColor: "white",
              height: "2px",
              width: "100%",
              marginTop: "5rem",
              marginBottom: "5rem",
            }}
          />

          <Typography
            variant="h4"
            color="white"
            paddingTop="2rem"
            paddingBottom="1rem"
            sx={{
              background: "linear-gradient(90deg, #865bec, white)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Skills
          </Typography>
          <Typography
            variant="subtitle1"
            color="#aaaaaa"
            textAlign="center"
            sx={{
              fontSize: "1.2rem",
              "@media (max-width: 900px)": {
                fontSize: "1rem", // Reduce font size for mobile
              },
            }}
          >
            Commonly used frameworks, libraries and other tools I use to develop
            applications and build out features!
          </Typography>
          <SkillsLogos />

          <Divider
            sx={{
              backgroundColor: "white",
              height: "2px",
              width: "100%",
              marginTop: "5rem",
              marginBottom: "5rem",
            }}
          />

          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="1.5rem"
            paddingBottom="3rem"
          >
            <Box
              alignItems="center"
              display="flex"
              height="1.5rem"
              width="2rem"
              paddingRight="1rem"
            >
              <FontAwesomeIcon icon={faArrowCircleDown} color="#aaaaaa" />
            </Box>
            <Typography
              variant="h4"
              sx={{
                background: "linear-gradient(90deg, #865bec, white)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              A little more about me
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              height="1.5rem"
              width="2rem"
              paddingLeft="1rem"
            >
              <FontAwesomeIcon icon={faArrowCircleDown} color="#aaaaaa" />
            </Box>
          </Box>

          <Typography variant="subtitle1" color="#aaaaaa">
            My current tech stack includes TypeScript, React.js, Node.js,
            PostgreSQL (RDBMS), Prisma ORM, and Elasticsearch (NoSQL). I also
            have experience working with AWS cloud infrastructure and managing
            CI/CD via GitHub actions. I thrive in collaborative environments and
            have experience mentoring junior developers, contributing not only
            through code but also through team growth and leadership. I&apos;ve
            helped build and scale data-intensive applications, including
            dashboards that visualize real-time energy data, supporting
            business-critical workflows. Lastly, I&apos;m passionate about
            building scalable, efficient applications and as well as bringing
            UI/UX designs to life. Check out my Github or LinkedIn in the top
            right, or download my resume while you&apos;re there!
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            paddingTop="1.5rem"
            paddingBottom="3rem"
          >
            <Typography variant="body1" color="#aaaaaa">
              Thanks for swinging by!
            </Typography>
          </Box>
        </Box>
      </Fade>
    </Box>
  );
}
