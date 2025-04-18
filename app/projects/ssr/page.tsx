import { Box, Grid, Typography } from "@mui/material";
import { fetchCryptoDataSSR } from "@/app/api/ssr/crypto";
import ClientDataGrid from "./DataGrid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonDigging } from "@fortawesome/free-solid-svg-icons";
import SyncSSRCacheFlag from "@/app/components/SyncSSRCacheFlag";

const getCryptoData = async () => {
  return await fetchCryptoDataSSR();
};

export default async function CryptoTableSSR() {
  const { data, timestamp: timeTaken, wasCached } = await getCryptoData();

  return data.length ? (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      padding="1rem"
    >
      <SyncSSRCacheFlag wasCached={wasCached} />
      <Grid
        size={{ xs: 12, md: 8, lg: 6 }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        paddingBottom="1rem"
      >
        <Typography variant="h5" color="white">
          Crypto Assets - Coin Cap
        </Typography>
        <Typography variant="h6" color="white">
          Server Side Rendered Table
        </Typography>
        <Typography variant="subtitle1" color="white">
          Time to response: {timeTaken.toFixed()}ms
        </Typography>
      </Grid>
      <Grid
        size={{ xs: 12, md: 10, lg: 8.5 }}
        overflow="scroll"
        display="flex"
        justifyContent="center"
      >
        <ClientDataGrid rows={data} wasCached={wasCached} />
      </Grid>
    </Grid>
  ) : (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      height="100%"
      padding="1rem"
    >
      <Grid
        size={{ xs: 12, md: 10, lg: 8.5 }}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box display="flex" height="5rem" width="100%" paddingBottom="1rem">
          <FontAwesomeIcon icon={faPersonDigging} size="xl" color="white" />
        </Box>{" "}
        <Typography variant="subtitle1" color="white" textAlign="center">
          Oh no! Looks like the CoinCap API has been upgraded,
          <br /> so for now this page is under construction until we get a
          access key!
        </Typography>
      </Grid>
    </Grid>
  );
}
