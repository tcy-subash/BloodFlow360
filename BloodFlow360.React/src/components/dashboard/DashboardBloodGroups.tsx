import {
  Box,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import { PieChart } from "@mui/x-charts/PieChart";

import { motion } from "framer-motion";

import GlassCard from "../../design-system/cards/GlassCard";
import type { BloodGroup as DbBloodGroup } from "../../types/dashboard";

interface DashboardBloodGroupsProps {
  bloodGroups?: DbBloodGroup[];
}

const getGroupColor = (group: string): string => {
  const colors: Record<string, string> = {
    "A+": "#E53935",
    "A-": "#E57373",
    "B+": "#1976D2",
    "B-": "#64B5F6",
    "O+": "#43A047",
    "O-": "#81C784",
    "AB+": "#8E24AA",
    "AB-": "#BA68C8",
  };
  return colors[group] || "#FB8C00";
};

export default function DashboardBloodGroups({ bloodGroups }: DashboardBloodGroupsProps) {
  const displayGroups = bloodGroups && bloodGroups.length > 0
    ? bloodGroups.map((group, index) => ({
        id: index,
        value: group.units,
        label: group.bloodGroup,
        color: group.color || getGroupColor(group.bloodGroup),
      }))
    : [
        { id: 0, value: 42, label: "A+", color: "#E53935" },
        { id: 1, value: 35, label: "B+", color: "#1976D2" },
        { id: 2, value: 88, label: "O+", color: "#43A047" },
        { id: 3, value: 18, label: "AB+", color: "#8E24AA" },
        { id: 4, value: 24, label: "Others", color: "#FB8C00" },
      ];

  const total = displayGroups.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: .95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <GlassCard sx={{ height: "100%" }}>
        <Stack spacing={3}>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
            }}
          >
            Blood Group Distribution
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <PieChart
              height={280}
              series={[
                {
                  innerRadius: 70,
                  outerRadius: 105,
                  paddingAngle: 3,
                  cornerRadius: 8,
                  data: displayGroups,
                },
              ]}
            />
          </Box>

          <Box
            sx={{
              textAlign: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
              }}
            >
              {total}
            </Typography>

            <Typography color="text.secondary">
              Total Units
            </Typography>
          </Box>

          <Stack spacing={1.5}>
            {displayGroups.map((group) => (
              <Stack
                key={group.id}
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    alignItems: "center"
                  }}
                >
                  <Box
                    sx={{
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      bgcolor: group.color,
                    }}
                  />

                  <Typography>
                    {group.label}
                  </Typography>
                </Stack>

                <Chip
                  label={`${group.value} Units`}
                  size="small"
                />
              </Stack>
            ))}
          </Stack>

        </Stack>
      </GlassCard>
    </motion.div>
  );
}