import {
  Box,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import { BarChart } from "@mui/x-charts/BarChart";

import { motion } from "framer-motion";
import CountUp from "react-countup";

import {
  Activity,
  TrendingUp,
} from "lucide-react";

import GlassCard from "../../design-system/cards/GlassCard";
import type { BloodChart } from "../../types/dashboard";

// Safe CountUp component reference to handle bundler interop
const CountUpComponent = (CountUp as any).default || CountUp;

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
      style={{ height: "100%" }}
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
                  color: "#111827",
                  letterSpacing: "-0.5px",
                }}
              >
                Blood Inventory Analytics
              </Typography>

              <Typography
                color="text.secondary"
                variant="body2"
                sx={{ fontWeight: 500 }}
              >
                Available units per blood group
              </Typography>
            </Box>

            <Chip
              icon={<Activity size={14} />}
              label="Live Status"
              size="small"
              sx={{
                bgcolor: "rgba(22, 163, 74, 0.08)",
                color: "#16A34A",
                fontWeight: 700,
                border: "1px solid rgba(22, 163, 74, 0.15)",
                "& .MuiChip-icon": {
                  color: "#16A34A !important",
                }
              }}
            />
          </Stack>

          {/* KPI Banner */}
          <Box
            sx={{
              borderRadius: "22px",
              p: 3,
              background: "linear-gradient(135deg, #800619 0%, #d32f2f 100%)",
              color: "#fff",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 10px 25px rgba(211, 47, 47, 0.25)",
              "&::before": {
                content: '""',
                position: "absolute",
                top: "-50%",
                right: "-20%",
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
                filter: "blur(20px)",
                pointerEvents: "none",
              }
            }}
          >
            <Stack
              direction="row"
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    opacity: .85,
                    fontWeight: 600,
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}
                >
                  Total Inventory
                </Typography>

                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 850,
                    letterSpacing: "-1px",
                    mt: 0.5,
                  }}
                >
                  <CountUpComponent end={totalUnits} duration={1.5} separator="," /> Units
                </Typography>
              </Box>

              <Chip
                icon={<TrendingUp size={14} />}
                label="Live Stock"
                sx={{
                  bgcolor: "rgba(255,255,255,0.18)",
                  color: "#fff",
                  fontWeight: 700,
                  border: "1px solid rgba(255,255,255,0.1)",
                  "& svg": {
                    color: "#fff !important",
                  },
                }}
              />
            </Stack>
          </Box>

          <Divider sx={{ borderColor: "rgba(211, 47, 47, 0.08)" }} />

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
              sx={{
                "& .MuiChartsAxis-line": {
                  stroke: "rgba(211, 47, 47, 0.15) !important",
                },
                "& .MuiChartsAxis-tick": {
                  stroke: "rgba(211, 47, 47, 0.15) !important",
                },
                "& .MuiChartsGrid-line": {
                  stroke: "rgba(0, 0, 0, 0.04) !important",
                },
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