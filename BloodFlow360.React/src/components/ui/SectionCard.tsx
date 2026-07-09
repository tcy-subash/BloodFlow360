import type { ReactNode } from "react";

import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

interface Props {
  title: string;
  children: ReactNode;
}

export default function SectionCard({
  title,
  children,
}: Props) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 5,
        border: "1px solid",
        borderColor: "divider",
        height: "100%",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 3,
          }}
        >
          {title}
        </Typography>

        {children}
      </CardContent>
    </Card>
  );
}