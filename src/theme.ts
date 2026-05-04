import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0b7a6c",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#d56c11",
      contrastText: "#ffffff",
    },
    background: {
      default: "#eef3f0",
      paper: "#ffffff",
    },
    text: {
      primary: "#132226",
      secondary: "#4a5a61",
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: "'Segoe UI', 'Noto Sans', sans-serif",
    h4: {
      letterSpacing: 0.2,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          border: "1px solid #d8e2dd",
          boxShadow: "0 6px 16px rgba(16, 24, 40, 0.08)",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
  },
});
