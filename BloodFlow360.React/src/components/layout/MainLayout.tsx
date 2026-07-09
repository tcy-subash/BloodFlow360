import {
  Box,
} from "@mui/material";

import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import BFSidebar from "../../design-system/navigation/BFSidebar";
import BFNavbar from "../../design-system/navigation/BFNavbar";

export default function MainLayout() {
  const location = useLocation();

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
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              style={{ display: "flex", flexDirection: "column", flexGrow: 1, gap: "inherit" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </Box>
      </Box>
    </Box>
  );
}