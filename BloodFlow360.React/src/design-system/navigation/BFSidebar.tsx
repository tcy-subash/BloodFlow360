import {
  Box,
  Stack,
  Typography,
  Divider,
  Avatar,
} from "@mui/material";

import { useAuth } from "../../auth/AuthContext";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { navigation } from "../../constants/navigation";

import NavItem from "./NavItem";

export default function BFSidebar() {
  const { user } = useAuth();

  return (
    <Box
      sx={{
        width: 280,

        height: "100vh",

        position: "sticky",

        top: 0,

        p: 2,

        bgcolor: "transparent",
      }}
    >
      <Box
        sx={{
          height: "100%",

          borderRadius: "28px",

          background:
            "linear-gradient(180deg,#ffffff,#fafafa)",

          border: "1px solid",

          borderColor: "divider",

          boxShadow:
            "0 20px 50px rgba(15,23,42,.08)",

          display: "flex",

          flexDirection: "column",
        }}
      >
        {/* Logo */}

        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: "center",

            p: 3,
          }}
        >
          <Avatar
            sx={{
              bgcolor: "primary.main",

              width: 48,

              height: 48,
            }}
          >
            <FavoriteIcon />
          </Avatar>

          <Box>
            <Typography
               sx={{
                fontWeight:700
                }}
                >
              BloodFlow360
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Enterprise
            </Typography>
          </Box>
        </Stack>

        <Divider />

        {/* Navigation */}

        <Stack
          spacing={1}
          sx={{
            p: 2,

            flexGrow: 1,
          }}
        >
          {navigation.map((item) => (
            <NavItem
              key={item.title}
              title={item.title}
              path={item.path}
              icon={item.icon}
            />
          ))}
        </Stack>

        <Divider />

        {/* User */}

        <Stack
          direction="row"
          spacing={2}
          sx={{
            p: 3,

            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "primary.main",
            }}
          >
            {user?.username?.charAt(0).toUpperCase() || "U"}
          </Avatar>

          <Box>
            <Typography
              sx={{
                fontWeight:700
              }}
            >
              {user?.username || "Admin"}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Administrator
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}