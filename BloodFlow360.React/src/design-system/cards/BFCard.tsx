import type { ReactNode } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

interface BFCardProps {
  children: ReactNode;
}

export default function BFCard({
  children,
}: BFCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "24px",

        overflow: "hidden",

        border: "1px solid",

        borderColor: "divider",

        backgroundColor: "background.paper",

        boxShadow:
          "0 10px 35px rgba(15,23,42,.08)",

        transition: ".3s",

        "&:hover": {
          transform: "translateY(-6px)",

          boxShadow:
            "0 25px 55px rgba(15,23,42,.14)",
        },
      }}
    >
      <CardContent
        sx={{
          p: 3,
        }}
      >
        {children}
      </CardContent>
    </Card>
  );
}