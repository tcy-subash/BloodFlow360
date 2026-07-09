import {
  Box,
} from "@mui/material";

import { Outlet } from "react-router-dom";

import BFSidebar from "../../design-system/navigation/BFSidebar";
import BFNavbar from "../../design-system/navigation/BFNavbar";

export default function MainLayout() {
  return (
    <Box
      sx={{
        display: "flex",

        minHeight: "100vh",

        bgcolor: "#F7F9FC",
      }}
    >
      <BFSidebar />

      <Box
        sx={{
          flex: 1,

          display: "flex",

          flexDirection: "column",

          overflow: "hidden",
        }}
      >
        <BFNavbar />

        <Box
          component="main"
          sx={{
            flex: 1,

            p: 4,

            overflowY: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}