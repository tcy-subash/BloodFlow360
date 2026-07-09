import type { ReactNode } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import type { SxProps, Theme } from "@mui/material/styles";

interface GlassCardProps {
  children: ReactNode;
   sx?: SxProps<Theme>;
}

export default function GlassCard({
  children,
  sx = {},
}: GlassCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "24px",

        backdropFilter: "blur(18px)",

        background:
          "linear-gradient(135deg,rgba(255,255,255,.82),rgba(255,255,255,.65))",

        border:
          "1px solid rgba(255,255,255,.55)",

        boxShadow:
          "0 20px 45px rgba(15,23,42,.08)",

        transition: ".3s",

        "&:hover": {
          transform: "translateY(-6px)",

          boxShadow:
            "0 35px 70px rgba(15,23,42,.15)",
        },
        ...sx,
      }}
    >
      <CardContent
        sx={{
          p: 3.5,
        }}
      >
        {children}
      </CardContent>
    </Card>
  );
}