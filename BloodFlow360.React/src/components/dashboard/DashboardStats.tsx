// import Grid from "@mui/material/Grid";

import { Grid } from "@mui/material";

import {
  Box,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import { motion } from "framer-motion";
// import CountUp from "react-countup";

import {
  Droplets,
  Users,
  Building2,
  ClipboardList,
  TrendingUp,
} from "lucide-react";

import GlassCard from "../../design-system/cards/GlassCard";

import type { DashboardStat } from "../../types/dashboard";

// const stats = [
//   {
//     title: "Blood Units",
//     value: 80,
//     trend: "+12%",
//     color: "#E53935",
//     icon: Droplets,
//   },
//   {
//     title: "Registered Donors",
//     value: 100,
//     trend: "+18%",
//     color: "#196cd2",
//     icon: Users,
//   },
//   {
//     title: "Hospitals",
//     value: 18,
//     trend: "+4%",
//     color: "#43A047",
//     icon: Building2,
//   },
//   {
//     title: "Pending Requests",
//     value: 12,
//     trend: "-2%",
//     color: "#FB8C00",
//     icon: ClipboardList,
//   },
// ];

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
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
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
                      color="text.secondary"
                    >
                      {item.title}
                    </Typography>

                    <Typography
                        variant="h3"
                        sx={{
                        mt: 1,
                        fontWeight: 800,
                    }}>
                    {item.value}
                    </Typography>

                    <Chip
                      icon={
                        <TrendingUp
                          size={14}
                        />
                      }
                      label={`${item.percentageChange}%`}
                      color="success"
                      size="small"
                      sx={{
                        mt: 1.5,
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      width: 60,
                      height: 62,

                      borderRadius: "22px",

                      bgcolor: item.color,

                      display: "flex",

                      justifyContent: "center",

                      alignItems: "center",

                      color: "#fff",

                      boxShadow:
                        `0 15px 35px ${item.color}55`,
                    }}
                  >
                    <Icon size={30} />
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