import {
  Box,
  Typography,
} from "@mui/material";

import { CircleAlert } from "lucide-react";

import BFButton from "../buttons/BFButton";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title = "Something went wrong",
  description = "Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <Box
      sx={{
        py: 10,

        display: "flex",

        flexDirection: "column",

        alignItems: "center",

        gap: 3,
      }}
    >
      <CircleAlert
    size={72}
    color="#D32F2F"
/>

      <Typography
        sx={{
        variant:"h5",
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

      {onRetry && (
        <BFButton
          onClick={onRetry}
        >
          Retry
        </BFButton>
      )}
    </Box>
  );
}