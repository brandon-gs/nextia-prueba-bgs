import { Inter } from "@next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#748BF8",
    },
    secondary: {
      main: "#9BD2DA",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
});

export default theme;
