import Typography from "@mui/material/Typography";

export default function DashboardFooter() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{
        textAlign: "center",
        py: 2,
      }}
    >
      © 2026 BloodFlow360 • Enterprise Blood Bank Management Platform
    </Typography>
  );
}