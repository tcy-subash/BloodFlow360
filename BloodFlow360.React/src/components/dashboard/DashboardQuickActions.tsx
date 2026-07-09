import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import {
  UserPlus,
  Droplets,
  Hospital,
  ClipboardPlus,
  ChartColumn,
  Settings,
} from "lucide-react";

import { motion } from "framer-motion";

import GlassCard from "../../design-system/cards/GlassCard";

const actions = [
  {
    title: "New Donor",
    subtitle: "Register donor",
    color: "#E53935",
    icon: UserPlus,
    path: "/donors",
    state: { openForm: true },
  },
  {
    title: "Blood Unit",
    subtitle: "Add inventory",
    color: "#D81B60",
    icon: Droplets,
    path: "/inventory",
    state: { openForm: true },
  },
  {
    title: "Hospital",
    subtitle: "Manage hospitals",
    color: "#1976D2",
    icon: Hospital,
    path: "/hospitals",
    state: { openForm: true },
  },
  {
    title: "Request",
    subtitle: "Blood request",
    color: "#FB8C00",
    icon: ClipboardPlus,
    path: "/requests",
    state: { openForm: true },
  },
  {
    title: "Reports",
    subtitle: "Analytics",
    color: "#43A047",
    icon: ChartColumn,
    path: "/reports",
  },
  {
    title: "Settings",
    subtitle: "System",
    color: "#7B1FA2",
    icon: Settings,
    path: "/settings",
  },
];

export default function DashboardQuickActions() {
  const navigate = useNavigate();

  return (
    <GlassCard sx={{ height: "100%" }}>
      <Stack spacing={3}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
          }}
        >
          Quick Actions
        </Typography>

        <Grid container spacing={2}>
          {actions.map((item) => {
            const Icon = item.icon;

            return (
              <Grid
                key={item.title}
                size={6}
              >
                <motion.div
                  whileHover={{
                    y: -8,
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                >
                  <Box
                    onClick={() => navigate(item.path, { state: item.state })}
                    sx={{
                      p: 2.5,
                      borderRadius: "20px",
                      cursor: "pointer",
                      transition: ".3s",

                      background: `linear-gradient(135deg, ${item.color}, ${item.color}CC)`,

                      color: "#fff",

                      boxShadow: `0 18px 40px ${item.color}55`,

                      "&:hover": {
                        boxShadow: `0 28px 55px ${item.color}66`,
                      },
                    }}
                  >
                    <Icon size={34} />

                    <Typography
                      sx={{
                        mt: 2,
                        fontWeight: 700,
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        opacity: .85,
                      }}
                    >
                      {item.subtitle}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </Stack>
    </GlassCard>
  );
}