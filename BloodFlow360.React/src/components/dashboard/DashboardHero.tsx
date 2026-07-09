import {
  Avatar,
  Box,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import {
  Activity,
  CalendarDays,
  HeartPulse,
} from "lucide-react";

import { motion } from "framer-motion";

import { useAuth } from "../../auth/AuthContext";

export default function DashboardHero() {
  const { user } = useAuth();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

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
        duration: .5,
      }}
    >
      <Box
        sx={{
          borderRadius: "32px",

          overflow: "hidden",

          position: "relative",

          p: 5,

          background:
            "linear-gradient(135deg,#D32F2F 0%,#E53935 35%,#EF5350 100%)",

          color: "#fff",

          boxShadow:
            "0 25px 60px rgba(211,47,47,.35)",
        }}
      >
        <Box
          sx={{
            position: "absolute",

            width: 320,

            height: 320,

            borderRadius: "50%",

            bgcolor: "rgba(255,255,255,.08)",

            right: -120,

            top: -120,
          }}
        />

        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",

            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
              }}
            >
              Welcome back,
              {" "}
              {user?.username}
            </Typography>

            <Typography
              sx={{
                mt: 1,

                opacity: .9,
              }}
            >
              Monitor your blood bank operations in real time.
            </Typography>

            <Stack
              direction="row"
              spacing={2}
              sx={{
                mt: 4,
              }}
            >
              <Chip
                icon={<CalendarDays size={16} />}
                label={today}
                sx={{
                  bgcolor:
                    "rgba(255,255,255,.18)",

                  color: "#fff",

                  backdropFilter:
                    "blur(12px)",

                  "& svg": {
                    color: "#fff",
                  },
                }}
              />

              <Chip
                icon={<Activity size={16} />}
                label="System Online"
                color="success"
              />
            </Stack>
          </Box>

          <Avatar
            sx={{
              width: 100,

              height: 100,

              bgcolor:
                "rgba(255,255,255,.18)",

              backdropFilter:
                "blur(15px)",
            }}
          >
            <HeartPulse
              size={52}
            />
          </Avatar>
        </Stack>
      </Box>
    </motion.div>
  );
}