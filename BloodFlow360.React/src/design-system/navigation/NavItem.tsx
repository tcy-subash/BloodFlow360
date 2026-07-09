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

              px: 2,
              py: 1.6,

              borderRadius: "16px",

              transition: ".25s",

              bgcolor: isActive
                ? "primary.main"
                : "transparent",

              color: isActive
                ? "#fff"
                : "text.primary",

              "&:hover": {
                bgcolor: isActive
                  ? "primary.main"
                  : "rgba(211,47,47,.08)",
              },
            }}
          >
            <Icon size={20} />

            <Typography
              sx={{
                fontWeight: isActive ? 700 : 600,
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