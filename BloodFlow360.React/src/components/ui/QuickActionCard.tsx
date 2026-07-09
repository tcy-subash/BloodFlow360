import type { ReactNode } from "react";

import {
  Card,
  CardActionArea,
  Stack,
  Typography,
} from "@mui/material";

interface Props {
  title: string;
  icon: ReactNode;
}

export default function QuickActionCard({
  title,
  icon,
}: Props) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 5,
      }}
    >
      <CardActionArea
        sx={{
          p: 3,
        }}
      >
        <Stack
        spacing={2}
            sx={{
            alignItems: "center",
            }}
>
          {icon}

          <Typography
                sx={{
                fontWeight: 600,
            }}
            >
            {title}
          </Typography>
        </Stack>
      </CardActionArea>
    </Card>
  );
}