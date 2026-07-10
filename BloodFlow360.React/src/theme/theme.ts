import { createTheme } from "@mui/material/styles";
import type {} from "@mui/x-data-grid/themeAugmentation";

import { typography } from "./typography";

export const getTheme = (mode: "light" | "dark") => {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,
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
        default: isDark ? "#0A0A0C" : "#F7F9FC",
        paper: isDark ? "#121216" : "#FFFFFF",
      },
      text: {
        primary: isDark ? "#F9FAFB" : "#111827",
        secondary: isDark ? "#9CA3AF" : "#6B7280",
      },
      divider: isDark ? "rgba(211, 47, 47, 0.15)" : "#E5E7EB",
    },

    typography,

    shape: {
      borderRadius: 24,
    },

    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            background: isDark ? "rgba(30, 30, 42, 0.55)" : "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(12px)",
            border: isDark ? "1px solid rgba(211, 47, 47, 0.15)" : "1px solid rgba(211, 47, 47, 0.08)",
            boxShadow: isDark ? "0 10px 30px rgba(0, 0, 0, 0.25)" : "0 10px 30px rgba(128, 6, 25, 0.03)",
            transition: "transform 0.25s ease, box-shadow 0.25s ease",
            "&:hover": {
              boxShadow: isDark ? "0 15px 35px rgba(0, 0, 0, 0.35)" : "0 15px 35px rgba(128, 6, 25, 0.06)",
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
            background: isDark ? "rgba(15, 15, 22, 0.72)" : "rgba(255, 255, 255, 0.65)",
            backdropFilter: "blur(20px) saturate(120%)",
            borderLeft: isDark ? "1px solid rgba(211, 47, 47, 0.2)" : "1px solid rgba(211, 47, 47, 0.1)",
            boxShadow: isDark ? "-10px 0 40px rgba(0, 0, 0, 0.4)" : "-10px 0 40px rgba(128, 6, 25, 0.05)",
          },
        },
      },

      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            backgroundColor: isDark ? "rgba(20, 20, 30, 0.4)" : "rgba(255, 255, 255, 0.4)",
            transition: "all 0.2s",
            "& fieldset": {
              borderColor: isDark ? "rgba(211, 47, 47, 0.2)" : "rgba(211, 47, 47, 0.12)",
            },
            "&:hover fieldset": {
              borderColor: isDark ? "rgba(211, 47, 47, 0.4) !important" : "rgba(211, 47, 47, 0.25) !important",
            },
            "&.Mui-focused fieldset": {
              borderColor: isDark ? "rgba(211, 47, 47, 0.6) !important" : "rgba(211, 47, 47, 0.4) !important",
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
              backgroundColor: isDark ? "rgba(211, 47, 47, 0.08) !important" : "rgba(211, 47, 47, 0.03) !important",
              borderBottom: isDark ? "1px solid rgba(211, 47, 47, 0.2)" : "1px solid rgba(211, 47, 47, 0.08)",
              fontWeight: 700,
            },
            "& .MuiDataGrid-cell": {
              borderBottom: isDark ? "1px solid rgba(211, 47, 47, 0.1)" : "1px solid rgba(211, 47, 47, 0.04)",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: isDark ? "rgba(211, 47, 47, 0.05) !important" : "rgba(211, 47, 47, 0.02) !important",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: isDark ? "1px solid rgba(211, 47, 47, 0.2)" : "1px solid rgba(211, 47, 47, 0.08)",
            },
          },
        },
      },
    },
  });
};

const defaultTheme = getTheme("light");
export default defaultTheme;