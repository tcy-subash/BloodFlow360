import {
  Box,
  Typography,
} from "@mui/material";

import InboxIcon from "@mui/icons-material/Inbox";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export default function EmptyState({
  title = "No Data",
  description = "Nothing to display.",
}: EmptyStateProps) {
  return (
    <Box
      sx={{
        py: 10,

        display: "flex",

        flexDirection: "column",

        alignItems: "center",

        gap: 2,
      }}
    >
      <InboxIcon
        sx={{
          fontSize: 70,

          color: "text.secondary",
        }}
      />

      <Typography
    variant="h5"
    sx={{
        fontWeight:700
    }}
>
        {title}
      </Typography>

      <Typography
        color="text.secondary"
      >
        {description}
      </Typography>
    </Box>
  );
}