import Grid from "@mui/material/Grid";
import {
  Box,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import { motion } from "framer-motion";
import CountUp from "react-countup";

import {
  Droplets,
  Users,
  Building2,
  ClipboardList,
  TrendingUp,
} from "lucide-react";

import GlassCard from "../../design-system/cards/GlassCard";
import type { DashboardStat } from "../../types/dashboard";

// Safe CountUp component reference to handle bundler interop
const CountUpComponent = (CountUp as any).default || CountUp;

interface DashboardStatsProps {
  stats: DashboardStat[];
}

export default function DashboardStats({
  stats,
}: DashboardStatsProps) {
  return (
    <Grid container spacing={3}>
      {stats.map((item, index) => {
        const Icon =
          item.icon === "blood"
            ? Droplets
            : item.icon === "users"
            ? Users
            : item.icon === "hospital"
            ? Building2
            : ClipboardList;

        return (
          <Grid
            key={item.title}
            size={{ xs: 12, sm: 6, lg: 3 }}
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.08,
                duration: 0.4,
              }}
              whileHover={{
                y: -6,
                scale: 1.01,
              }}
            >
              <GlassCard>
                <Stack
                  direction="row"
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontWeight: 600, letterSpacing: "0.2px" }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      variant="h3"
                      sx={{
                        mt: 1,
                        fontWeight: 850,
                        color: "#111827",
                        letterSpacing: "-1px",
                      }}
                    >
                      <CountUpComponent end={item.value} duration={1.5} separator="," />
                    </Typography>

                    <Chip
                      icon={<TrendingUp size={14} />}
                      label={`${item.percentageChange > 0 ? "+" : ""}${item.percentageChange}% this month`}
                      size="small"
                      sx={{
                        mt: 1.5,
                        bgcolor: "rgba(22, 163, 74, 0.08)",
                        color: "#16A34A",
                        fontWeight: 700,
                        border: "1px solid rgba(22, 163, 74, 0.15)",
                        "& .MuiChip-icon": {
                          color: "#16A34A !important",
                        }
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: "18px",
                      bgcolor: `${item.color}15`,
                      color: item.color,
                      border: `1px solid ${item.color}25`,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: `0 8px 20px ${item.color}15`,
                    }}
                  >
                    <Icon size={24} style={{ strokeWidth: 2.2 }} />
                  </Box>
                </Stack>
              </GlassCard>
            </motion.div>
          </Grid>
        );
      })}
    </Grid>
  );
}