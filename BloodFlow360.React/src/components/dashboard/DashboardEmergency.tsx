import {
  Avatar,
  Box,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import {
  AlertTriangle,
  Clock3,
  Hospital,
} from "lucide-react";

import { motion } from "framer-motion";

import GlassCard from "../../design-system/cards/GlassCard";
import type { Emergency } from "../../types/dashboard";

interface DashboardEmergencyProps {
  emergencies?: Emergency[];
}

const getPriorityColor = (priority: string): string => {
  const colors: Record<string, string> = {
    "Critical": "#E53935",
    "High": "#FB8C00",
    "Medium": "#1976D2",
    "Low": "#43A047",
  };
  return colors[priority] || "#757575";
};

const formatTimeAgo = (dateStr: string): string => {
  if (!dateStr) return "Just now";
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} mins ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  } catch {
    return "Recently";
  }
};

export default function DashboardEmergency({ emergencies }: DashboardEmergencyProps) {
  const displayAlerts = emergencies && emergencies.length > 0
    ? emergencies
    : [
        {
          id: 1,
          hospitalName: "Apollo Hospital",
          bloodGroup: "O-",
          unitsRequired: 15,
          priority: "Critical",
          requestedAt: new Date(Date.now() - 15 * 60000).toISOString(),
        },
        {
          id: 2,
          hospitalName: "AIIMS Chennai",
          bloodGroup: "AB+",
          unitsRequired: 30,
          priority: "High",
          requestedAt: new Date(Date.now() - 30 * 60000).toISOString(),
        },
        {
          id: 3,
          hospitalName: "Fortis Hospital",
          bloodGroup: "A+",
          unitsRequired: 10,
          priority: "Medium",
          requestedAt: new Date(Date.now() - 60 * 60000).toISOString(),
        },
      ];

  return (
    <GlassCard sx={{ height: "100%" }}>
      <Stack spacing={3}>

        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800
            }}
          >
            Emergency Alerts
          </Typography>

          <Chip
            color="error"
            icon={<AlertTriangle size={16} />}
            label={`${displayAlerts.length} Active`}
          />
        </Stack>

        {displayAlerts.map((alert) => {
          const color = getPriorityColor(alert.priority);
          return (
            <motion.div
              key={alert.id}
              whileHover={{
                scale: 1.02,
                x: 5,
              }}
            >
              <Box
                sx={{
                  borderRadius: 4,
                  p: 2.5,
                  borderLeft: `6px solid ${color}`,
                  bgcolor: "background.paper",
                  boxShadow: "0 8px 25px rgba(0,0,0,.06)",
                }}
              >
                <Stack
                  direction="row"
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: "center"
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: color,
                      }}
                    >
                      <Hospital size={20} />
                    </Avatar>

                    <Box sx={{ ml: 2 }}>
                      <Typography
                        sx={{
                          fontWeight: 700
                        }}
                      >
                        {alert.hospitalName}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        Requires {alert.unitsRequired} Units of {alert.bloodGroup}
                      </Typography>
                    </Box>
                  </Stack>

                  <Chip
                    label={alert.priority}
                    color={
                      alert.priority === "Critical"
                        ? "error"
                        : alert.priority === "High"
                        ? "warning"
                        : alert.priority === "Medium"
                        ? "primary"
                        : "default"
                    }
                  />
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Stack
                  direction="row"
                  sx={{
                    alignItems: "center"
                  }}
                >
                  <Clock3
                    size={16}
                    color="#888"
                  />

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ ml: 1 }}
                  >
                    {formatTimeAgo(alert.requestedAt)}
                  </Typography>
                </Stack>
              </Box>
            </motion.div>
          );
        })}
      </Stack>
    </GlassCard>
  );
}