import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";

import { useAuth } from "../../auth/AuthContext";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={1}
      sx={{
        zIndex: 1300,
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
          }}
        >
          🩸 BloodFlow360
        </Typography>

        <IconButton>
          <NotificationsIcon />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            ml: 2,
          }}
        >
          <Typography>
            {user?.username}
          </Typography>

          <Avatar>
            {user?.username?.charAt(0)}
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}