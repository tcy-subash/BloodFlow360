import {
  Avatar,
  Box,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import {
  Activity as ActivityIcon,
  Droplets,
  Hospital,
  UserPlus,
  Package,
  AlertTriangle,
  Settings,
  Shield,
} from "lucide-react";

import { motion } from "framer-motion";

import GlassCard from "../../design-system/cards/GlassCard";
import type { Activity } from "../../types/dashboard";

interface DashboardActivityProps {
  activities?: Activity[];
}

const getActivityDetails = (type: string) => {
  switch (type?.toLowerCase()) {
    case "donor":
      return { icon: UserPlus, color: "#43A047", label: "Donor" };
    case "donation":
      return { icon: Droplets, color: "#E53935", label: "Donation" };
    case "hospital":
      return { icon: Hospital, color: "#1976D2", label: "Hospital" };
    case "blood request":
      return { icon: ActivityIcon, color: "#FB8C00", label: "Request" };
    case "blood issue":
      return { icon: Package, color: "#7B1FA2", label: "Issue" };
    case "inventory":
      return { icon: Droplets, color: "#00838F", label: "Inventory" };
    case "emergency":
      return { icon: AlertTriangle, color: "#D32F2F", label: "Emergency" };
    case "patient":
      return { icon: Shield, color: "#0288D1", label: "Patient" };
    case "settings":
      return { icon: Settings, color: "#546E7A", label: "Settings" };
    default:
      return { icon: ActivityIcon, color: "#757575", label: "System" };
  }
};

const formatTimeAgo = (dateStr: string): string => {
  if (!dateStr) return "Just now";
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  } catch {
    return "Recently";
  }
};

const formatActionTitle = (action: string, tableName: string): string => {
  const table = tableName?.replace(/s$/, "") || "Record";
  return `${action} ${table}`;
};

export default function DashboardActivity({ activities }: DashboardActivityProps) {
  // Only show real database data — no mock fallback
  const displayActivities = activities && activities.length > 0 ? activities : [];

  return (
    <GlassCard sx={{ height: "100%" }}>
      <Stack spacing={2.5}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
          }}
        >
          Recent Activity
        </Typography>

        {displayActivities.length === 0 ? (
          <Box sx={{ py: 4, textAlign: "center" }}>
            <Typography color="text.secondary">
              No recent activity — actions will appear here as you use the app
            </Typography>
          </Box>
        ) : (
          displayActivities.map((item) => {
            const details = getActivityDetails(item.activityType);
            const Icon = details.icon;

            return (
              <motion.div
                key={item.id}
                whileHover={{
                  x: 4,
                }}
              >
                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: details.color,
                      width: 36,
                      height: 36,
                    }}
                  >
                    <Icon size={16} />
                  </Avatar>

                  <Box
                    sx={{
                      flex: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "0.9rem",
                      }}
                    >
                      {formatActionTitle(item.title, item.description)}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      {details.label}
                    </Typography>
                  </Box>

                  <Chip
                    size="small"
                    label={formatTimeAgo(item.createdAt)}
                    variant="outlined"
                    sx={{ flexShrink: 0 }}
                  />
                </Stack>
              </motion.div>
            );
          })
        )}
      </Stack>
    </GlassCard>
  );
}