import type { ReactNode } from "react";

import {
  Box,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import { motion } from "framer-motion";

import BFCard from "./BFCard";

interface MetricCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  color: string;
  trend: string;
}

export default function MetricCard({
  title,
  value,
  icon,
  color,
  trend,
}: MetricCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: .25,
      }}
    >
      <BFCard>
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
              {title}
            </Typography>

            <Typography
              variant="h3"
              sx={{
                mt: 1,
                fontWeight: 800,
              }}
            >
              {value}
            </Typography>

            <Chip
              label={trend}
              color="success"
              size="small"
              sx={{
                mt: 2,
              }}
            />
          </Box>

          <Box
            sx={{
              width: 72,

              height: 72,

              borderRadius: "20px",

              bgcolor: color,

              display: "flex",

              justifyContent: "center",

              alignItems: "center",

              color: "#fff",

              flexShrink: 0,
            }}
          >
            {icon}
          </Box>
        </Stack>
      </BFCard>
    </motion.div>
  );
}