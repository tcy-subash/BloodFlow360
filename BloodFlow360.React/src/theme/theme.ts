import { createTheme } from "@mui/material/styles";

import { palette } from "./palette";
import { typography } from "./typography";

const theme = createTheme({
  palette: palette.palette,

  typography,

  shape: {
    borderRadius: 24,
  },

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,

          boxShadow:
            "0 10px 35px rgba(15,23,42,.08)",

          border: "1px solid #E5E7EB",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,

          paddingLeft: 24,

          paddingRight: 24,

          height: 46,

          fontWeight: 600,
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

export default theme;