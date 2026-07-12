import {
  Box,
  Stack,
  Typography,
  Divider,
  Avatar,
} from "@mui/material";

import { useAuth } from "../../auth/AuthContext";
import { Bloodtype } from "@mui/icons-material";

import { navigation } from "../../constants/navigation";

import NavItem from "./NavItem";

interface BFSidebarProps {
  onClose?: () => void;
}

export default function BFSidebar({ onClose }: BFSidebarProps) {
  const { user } = useAuth();

  return (
    <Box
      sx={{
        width: 280,
        height: "100vh",
        position: "sticky",
        top: 0,
        p: 2,
        bgcolor: "transparent",
      }}
    >
      <Box
        sx={{
          height: "100%",
          borderRadius: "28px",
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(20px)",
          border: "1px solid",
          borderColor: "rgba(211, 47, 47, 0.12)",
          boxShadow: "0 20px 50px rgba(128, 6, 25, 0.04)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Logo */}
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: "center",
            p: 3,
          }}
        >
          <Bloodtype
            sx={{
              fontSize: 40,
              color: "#ff3366",
              filter: "drop-shadow(0 0 8px rgba(255, 51, 102, 0.5))",
            }}
          />

          <Box>
            <Typography
              sx={{
                fontWeight: 800,
                color: "#111827",
                fontSize: "1.15rem",
                letterSpacing: "0.5px",
              }}
            >
              BloodFlow360
            </Typography>

            <Typography
              variant="caption"
              sx={{
                color: "#B71C1C",
                fontWeight: 700,
                letterSpacing: "1px",
                textTransform: "uppercase",
                display: "block",
                lineHeight: 1.2,
              }}
            >
              Enterprise
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ borderColor: "rgba(211, 47, 47, 0.08)" }} />

        {/* Navigation */}
        <Stack
          spacing={0.5}
          sx={{
            p: 2,
            flexGrow: 1,
            overflowY: "auto",
          }}
        >
          {navigation.map((item) => (
            <NavItem
              key={item.title}
              title={item.title}
              path={item.path}
              icon={item.icon}
              onClick={onClose}
            />
          ))}
        </Stack>

        <Divider sx={{ borderColor: "rgba(211, 47, 47, 0.08)" }} />

        {/* User Card */}
        <Box
          sx={{
            p: 2,
            m: 2,
            borderRadius: "20px",
            background: "rgba(255, 255, 255, 0.5)",
            border: "1px solid rgba(211, 47, 47, 0.08)",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.02)",
          }}
        >
          <Stack
            direction="row"
            spacing={1.5}
            sx={{
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                bgcolor: "primary.main",
                border: "2px solid #ffffff",
                boxShadow: "0 4px 10px rgba(211, 47, 47, 0.2)",
              }}
            >
              {user?.username?.charAt(0).toUpperCase() || "U"}
            </Avatar>

            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  color: "text.primary",
                }}
              >
                {user?.username || "Admin"}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontWeight: 500 }}
              >
                Administrator
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}