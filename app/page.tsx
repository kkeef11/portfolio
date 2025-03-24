import { Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box height="90%">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="80%"
      >
        <Typography variant="h3" color="white" fontFamily="Open Sans">
          Welcome
        </Typography>
      </Box>
    </Box>
  );
}
