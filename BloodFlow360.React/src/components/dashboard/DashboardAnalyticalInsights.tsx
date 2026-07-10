import {
  Box,
  CardContent,
  Chip,
  Divider,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Calendar,
  Sparkles,
  TrendingDown,
  UserCheck,
} from "lucide-react";
import GlassCard from "../../design-system/cards/GlassCard";

interface SupplyInsight {
  group: string;
  units: number;
  avgDailyDemand: number;
  daysOfSupply: number;
  status: "CRITICAL" | "STABLE" | "EXCESS";
}

const mockInsights: SupplyInsight[] = [
  { group: "O-", units: 8, avgDailyDemand: 5, daysOfSupply: 1.6, status: "CRITICAL" },
  { group: "O+", units: 74, avgDailyDemand: 18, daysOfSupply: 4.1, status: "STABLE" },
  { group: "A-", units: 14, avgDailyDemand: 6, daysOfSupply: 2.3, status: "CRITICAL" },
  { group: "A+", units: 98, avgDailyDemand: 22, daysOfSupply: 4.5, status: "STABLE" },
  { group: "B-", units: 5, avgDailyDemand: 4, daysOfSupply: 1.2, status: "CRITICAL" },
  { group: "B+", units: 42, avgDailyDemand: 10, daysOfSupply: 4.2, status: "STABLE" },
  { group: "AB-", units: 18, avgDailyDemand: 2, daysOfSupply: 9.0, status: "EXCESS" },
  { group: "AB+", units: 56, avgDailyDemand: 8, daysOfSupply: 7.0, status: "STABLE" },
];

export default function DashboardAnalyticalInsights() {
  const criticalGroups = mockInsights.filter((i) => i.status === "CRITICAL");

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <GlassCard>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3}>
            {/* Header */}
            <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827", letterSpacing: "-0.5px" }}>
                  Predictive & Analytical Insights
                </Typography>
                <Typography color="text.secondary" variant="body2" sx={{ fontWeight: 500 }}>
                  Smart supply forecasting and critical stock notifications
                </Typography>
              </Box>
              <Chip
                icon={<Sparkles size={14} />}
                label="AI Forecasting Enabled"
                size="small"
                sx={{
                  bgcolor: "rgba(128, 6, 25, 0.08)",
                  color: "#800619",
                  fontWeight: 700,
                  border: "1px solid rgba(128, 6, 25, 0.15)",
                  "& .MuiChip-icon": { color: "#800619 !important" },
                }}
              />
            </Stack>

            <Divider sx={{ borderColor: "rgba(211, 47, 47, 0.08)" }} />

            <Grid container spacing={4}>
              {/* Left Column: Days of Supply */}
              <Grid size={{ xs: 12, md: 7 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                  <TrendingDown size={18} color="#800619" /> Days of Supply Forecast
                </Typography>
                <Stack spacing={2}>
                  {mockInsights.map((insight) => {
                    let progressColor: "error" | "warning" | "success" = "success";
                    let statusLabel = "Stable";
                    let labelBg = "rgba(22, 163, 74, 0.08)";
                    let labelColor = "#16a34a";

                    if (insight.status === "CRITICAL") {
                      progressColor = "error";
                      statusLabel = "Critical Shortage";
                      labelBg = "rgba(220, 38, 38, 0.08)";
                      labelColor = "#dc2626";
                    } else if (insight.status === "EXCESS") {
                      progressColor = "warning";
                      statusLabel = "Overstocked";
                      labelBg = "rgba(217, 119, 6, 0.08)";
                      labelColor = "#d97706";
                    }

                    // Map days of supply to 0-100 progress (cap at 10 days = 100%)
                    const progressValue = Math.min((insight.daysOfSupply / 10) * 100, 100);

                    return (
                      <Box key={insight.group}>
                        <Stack direction="row" sx={{ mb: 0.5, alignItems: "center", justifyContent: "space-between" }}>
                          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                            <Typography sx={{ fontWeight: 750, minWidth: 32 }}>{insight.group}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              ({insight.units} Units available • Daily demand ~{insight.avgDailyDemand})
                            </Typography>
                          </Stack>
                          <Chip
                            label={`${insight.daysOfSupply.toFixed(1)} Days (${statusLabel})`}
                            size="small"
                            sx={{
                              bgcolor: labelBg,
                              color: labelColor,
                              fontWeight: 700,
                              fontSize: "11px",
                              height: "22px",
                            }}
                          />
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={progressValue}
                          color={progressColor}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: "rgba(0,0,0,0.05)",
                          }}
                        />
                      </Box>
                    );
                  })}
                </Stack>
              </Grid>

              {/* Right Column: Alerts & Reorder Recommendation */}
              <Grid size={{ xs: 12, md: 5 }}>
                <Stack spacing={3} sx={{ height: "100%", justifyContent: "space-between" }}>
                  {/* Expiration warning box */}
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: "16px",
                      border: "1px solid rgba(217, 119, 6, 0.2)",
                      bgcolor: "rgba(217, 119, 6, 0.03)",
                    }}
                  >
                    <Stack direction="row" spacing={1.5} sx={{ alignItems: "flex-start" }}>
                      <Calendar color="#d97706" size={20} style={{ marginTop: 2 }} />
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#b45309" }}>
                          Expiration Risk Alert
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, lineHeight: 1.4 }}>
                          **3 bags** of **O+** and **1 bag** of **A-** are expiring in less than 5 days. Ensure these are prioritized for pending cross-matching workflows.
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>

                  {/* Reorder/Donor Campaign Action box */}
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: "16px",
                      border: "1px solid rgba(220, 38, 38, 0.2)",
                      bgcolor: "rgba(220, 38, 38, 0.03)",
                    }}
                  >
                    <Stack direction="row" spacing={1.5} sx={{ alignItems: "flex-start" }}>
                      <AlertTriangle color="#dc2626" size={20} style={{ marginTop: 2 }} />
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#991b1b" }}>
                          Critical Stock Actions
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, lineHeight: 1.4, mb: 1 }}>
                          Inventory levels for **{criticalGroups.map((cg) => cg.group).join(", ")}** are below safety margins.
                        </Typography>
                        <Chip
                          icon={<UserCheck size={12} />}
                          label="Notify Registered Donors"
                          size="small"
                          clickable
                          onClick={() => alert("Campaign emails dispatched to matched donors!")}
                          sx={{
                            bgcolor: "#800619",
                            color: "#fff",
                            fontWeight: 700,
                            "& svg": { color: "#fff !important" },
                            "&:hover": { bgcolor: "#b71c1c" },
                          }}
                        />
                      </Box>
                    </Stack>
                  </Box>

                  {/* Quick System Summary */}
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: "16px",
                      bgcolor: "rgba(113, 113, 122, 0.05)",
                      border: "1px solid rgba(113, 113, 122, 0.1)",
                    }}
                  >
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block", textAlign: "center" }}>
                      System analysis updated: **Just now** • Model accuracy: **98.4%** based on 90-day consumption pattern.
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </CardContent>
      </GlassCard>
    </motion.div>
  );
}
