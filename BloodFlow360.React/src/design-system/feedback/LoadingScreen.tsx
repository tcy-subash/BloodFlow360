import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";

export default function LoadingScreen() {
  return (
    <Box
      sx={{
        height: "70vh",

        display: "flex",

        flexDirection: "column",

        justifyContent: "center",

        alignItems: "center",

        gap: 3,
      }}
    >
      <CircularProgress
        size={60}
      />

      <Typography
        variant="h6"
      >
        Loading...
      </Typography>
    </Box>
  );
} 