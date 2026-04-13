import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#00695c",
    },
    secondary: {
      main: "#ff6f00",
    },
    background: {
      default: "#f4f7f5",
      paper: "#ffffff",
    },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: "'Segoe UI', 'Noto Sans', sans-serif",
    h4: {
      letterSpacing: 0.2,
    },
  },
});
