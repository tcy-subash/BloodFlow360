import { createTheme } from "@mui/material/styles";
import type {} from "@mui/x-data-grid/themeAugmentation";

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
          borderRadius: 20,

          background: "rgba(255, 255, 255, 0.8)",

          backdropFilter: "blur(12px)",

          border: "1px solid rgba(211, 47, 47, 0.08)",

          boxShadow: "0 10px 30px rgba(128, 6, 25, 0.03)",

          transition: "transform 0.25s ease, box-shadow 0.25s ease",

          "&:hover": {
            boxShadow: "0 15px 35px rgba(128, 6, 25, 0.06)",
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,

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

    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "rgba(255, 255, 255, 0.65)",

          backdropFilter: "blur(20px) saturate(120%)",

          borderLeft: "1px solid rgba(211, 47, 47, 0.1)",

          boxShadow: "-10px 0 40px rgba(128, 6, 25, 0.05)",
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,

          backgroundColor: "rgba(255, 255, 255, 0.4)",

          transition: "all 0.2s",

          "& fieldset": {
            borderColor: "rgba(211, 47, 47, 0.12)",
          },

          "&:hover fieldset": {
            borderColor: "rgba(211, 47, 47, 0.25) !important",
          },

          "&.Mui-focused fieldset": {
            borderColor: "rgba(211, 47, 47, 0.4) !important",

            borderWidth: "1px !important",
          },
        },
      },
    },

    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: "none",

          borderRadius: 16,

          backgroundColor: "transparent",

          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "rgba(211, 47, 47, 0.03) !important",

            borderBottom: "1px solid rgba(211, 47, 47, 0.08)",

            fontWeight: 700,
          },

          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid rgba(211, 47, 47, 0.04)",
          },

          "& .MuiDataGrid-row:hover": {
            backgroundColor: "rgba(211, 47, 47, 0.02) !important",
          },

          "& .MuiDataGrid-footerContainer": {
            borderTop: "1px solid rgba(211, 47, 47, 0.08)",
          },
        },
      },
    },
  },
});

export default theme;