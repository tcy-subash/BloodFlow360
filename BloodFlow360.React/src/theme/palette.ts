import { createTheme } from "@mui/material/styles";

export const palette = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#D32F2F",
      light: "#EF5350",
      dark: "#B71C1C",
    },

    secondary: {
      main: "#1976D2",
    },

    success: {
      main: "#16A34A",
    },

    warning: {
      main: "#F59E0B",
    },

    error: {
      main: "#DC2626",
    },

    info: {
      main: "#0EA5E9",
    },

    background: {
      default: "#F7F9FC",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#111827",
      secondary: "#6B7280",
    },

    divider: "#E5E7EB",
  },
});