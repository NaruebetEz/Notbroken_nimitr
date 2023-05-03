import { createTheme } from "@mui/material/styles";
import "@fontsource/koho";

export const theme = createTheme({

  palette: {
    primary: {
      main: "#ffd012",
      white: "#ffffff",
      black: "#000000",
      blue: "#004aad",
      darkGray: "#545454",
      midGray: "#737373",
      lightGray: "#ebebeb",
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif",],
  }
});
