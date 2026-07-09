import type { ReactNode } from "react";

import {
  Card,
  CardContent,
  Stack,
  Typography,
  Box,
} from "@mui/material";

interface Props {
  title: string;
  value: string | number;
  icon: ReactNode;
  color: string;
}

export default function StatCard({
  title,
  value,
  icon,
  color,
}: Props) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 5,
        border: "1px solid",
        borderColor: "divider",
        height: "100%",
        transition: "0.25s",
        backdropFilter: "blur(10px)",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 20px 45px rgba(0,0,0,.12)",
        },
      }}
    >
      <CardContent>
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
            >
              {title}
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mt: 1,
              }}
            >
              {value}
            </Typography>
          </Box>

          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "18px",
              bgcolor: color,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
            }}
          >
            {icon}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}