import { NavLink } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { motion } from "framer-motion";

import type { LucideIcon } from "lucide-react";

interface NavItemProps {
  title: string;
  path: string;
  icon: LucideIcon;
}

export default function NavItem({
  title,
  path,
  icon: Icon,
}: NavItemProps) {
  return (
    <NavLink
      to={path}
      style={{
        textDecoration: "none",
      }}
    >
      {({ isActive }) => (
        <motion.div
          whileHover={{
            x: 4,
          }}
          whileTap={{
            scale: 0.98,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              pl: 3, // Left padding to accommodate indicator
              pr: 2,
              py: 1.5,
              borderRadius: "12px",
              position: "relative",
              overflow: "hidden",
              transition: "all .2s ease-in-out",
              bgcolor: isActive
                ? "rgba(211, 47, 47, 0.06)"
                : "transparent",
              color: isActive
                ? "#D32F2F"
                : "#4B5563",
              "&:hover": {
                bgcolor: isActive
                  ? "rgba(211, 47, 47, 0.09)"
                  : "rgba(211, 47, 47, 0.04)",
                color: isActive
                  ? "#D32F2F"
                  : "#111827",
              },
            }}
          >
            {/* Sliding Active Indicator Line */}
            {isActive && (
              <Box
                component={motion.div}
                layoutId="navActiveIndicator"
                sx={{
                  position: "absolute",
                  left: 0,
                  top: "20%",
                  bottom: "20%",
                  width: "4px",
                  bgcolor: "#D32F2F",
                  borderRadius: "0 4px 4px 0",
                  boxShadow: "0 0 8px rgba(211, 47, 47, 0.4)",
                }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}

            <Icon size={18} style={{ strokeWidth: isActive ? 2.5 : 2 }} />

            <Typography
              sx={{
                fontWeight: isActive ? 700 : 600,
                fontSize: "0.95rem",
                letterSpacing: "0.2px",
              }}
            >
              {title}
            </Typography>
          </Box>
        </motion.div>
      )}
    </NavLink>
  );
}