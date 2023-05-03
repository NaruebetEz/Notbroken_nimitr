import { NavigateNext } from "@mui/icons-material";
import { Box, Breadcrumbs, Grid, Link } from "@mui/material";
import { HeaderBar } from "./header-bar";

export const LandingLayout = (Props) => {
  return (
    <Grid sx={{ height: "100vh" }}>
      <HeaderBar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {Props.children}
      </Box>
    </Grid>
  );
};
