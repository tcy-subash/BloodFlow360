import {
  Box,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import { BarChart } from "@mui/x-charts/BarChart";

import { motion } from "framer-motion";

import {
  Activity,
  TrendingUp,
} from "lucide-react";

import GlassCard from "../../design-system/cards/GlassCard";
import type { BloodChart } from "../../types/dashboard";

interface DashboardBloodChartProps {
  bloodChart?: BloodChart[];
}

export default function DashboardBloodChart({ bloodChart }: DashboardBloodChartProps) {
  const hasData = bloodChart && bloodChart.length > 0;

  const chartData = hasData
    ? bloodChart.map(item => item.units)
    : [];

  const chartLabels = hasData
    ? bloodChart.map(item => item.label)
    : [];

  const totalUnits = hasData
    ? bloodChart.reduce((sum, item) => sum + item.units, 0)
    : 0;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
    >
      <GlassCard
        sx={{
          height: "100%",
        }}
      >
        <Stack spacing={3}>
          {/* Header */}

          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                }}
              >
                Blood Inventory Analytics
              </Typography>

              <Typography
                color="text.secondary"
              >
                Available units per blood group
              </Typography>
            </Box>

            <Chip
              icon={<Activity size={16} />}
              label="Live"
              color="success"
            />
          </Stack>

          {/* KPI Banner */}

          <Box
            sx={{
              borderRadius: "22px",

              p: 3,

              background:
                "linear-gradient(135deg,#D32F2F,#F44336)",

              color: "#fff",
            }}
          >
            <Stack
              direction="row"
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    opacity: .9,
                  }}
                >
                  Total Inventory
                </Typography>

                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                  }}
                >
                  {totalUnits} Units
                </Typography>
              </Box>

              <Chip
                icon={<TrendingUp size={16} />}
                label="Live Stock"
                sx={{
                  bgcolor:
                    "rgba(255,255,255,.18)",

                  color: "#fff",

                  "& svg": {
                    color: "#fff",
                  },
                }}
              />
            </Stack>
          </Box>

          <Divider />

          {/* Chart */}

          {hasData ? (
            <BarChart
              height={320}
              xAxis={[
                {
                  scaleType: "band",
                  data: chartLabels,
                },
              ]}
              series={[
                {
                  data: chartData,
                  label: "Available Units",
                  color: "#D32F2F",
                },
              ]}
              borderRadius={8}
              grid={{
                horizontal: true,
              }}
            />
          ) : (
            <Box sx={{ py: 6, textAlign: "center" }}>
              <Typography color="text.secondary">
                No inventory data available
              </Typography>
            </Box>
          )}
        </Stack>
      </GlassCard>
    </motion.div>
  );
}