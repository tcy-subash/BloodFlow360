import {
  Stack,
  Typography,
} from "@mui/material";

import dayjs from "dayjs";

interface Props {
  username?: string;
}

export default function DashboardHeader({
  username,
}: Props) {
  return (
    <Stack spacing={1}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
        }}
      >
        Good Morning, {username} 👋
      </Typography>

      <Typography color="text.secondary">
        Welcome back to BloodFlow360

        {" • "}

        {dayjs().format("DD MMM YYYY")}
      </Typography>
    </Stack>
  );
}