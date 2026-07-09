import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  InputAdornment,
  Stack,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Popover,
  Divider,
} from "@mui/material";

import TextField from "@mui/material/TextField";
import toast from "react-hot-toast";

import {
  Bell,
  Search,
  Settings,
  LogOut,
  User as UserIcon,
} from "lucide-react";

import { useAuth } from "../../auth/AuthContext";

export default function BFNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Profile menu state
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);
  const isProfileOpen = Boolean(profileAnchor);

  // Notification popover state
  const [bellAnchor, setBellAnchor] = useState<null | HTMLElement>(null);
  const isBellOpen = Boolean(bellAnchor);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchor(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.success("Successfully logged out");
  };

  const handleBellClick = (event: React.MouseEvent<HTMLElement>) => {
    setBellAnchor(event.currentTarget);
  };

  const handleBellClose = () => {
    setBellAnchor(null);
  };

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      toast.success(`Searching for: "${searchQuery}"`);
    }
  };

  const notifications = [
    { id: 1, title: "Low Stock Alert", desc: "O- blood units are below critical threshold", time: "10 mins ago" },
    { id: 2, title: "New Request Submitted", desc: "Apollo Hospital requested 15 units O-", time: "25 mins ago" },
    { id: 3, title: "Donor Eligible", desc: "Dharneesh is now eligible for next donation", time: "1 hour ago" },
    { id: 4, title: "System Update", desc: "Database backup completed successfully", time: "2 hours ago" },
  ];

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      sx={{
        backdropFilter: "blur(20px)",
        background: "rgba(255,255,255,.75)",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          minHeight: "80px !important",
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
            }}
          >
            BloodFlow360
          </Typography>

          <Typography
            color="text.secondary"
            variant="body2"
          >
            Enterprise Blood Bank Platform
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: "center",
          }}
        >
          <TextField
            placeholder="Search..."
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchSubmit}
            sx={{
              width: 320,
              "& .MuiOutlinedInput-root": {
                borderRadius: "14px",
                bgcolor: "#fff",
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={18} />
                  </InputAdornment>
                ),
              },
            }}
          />

          <Badge
            badgeContent={notifications.length}
            color="error"
          >
            <IconButton
              onClick={handleBellClick}
              sx={{
                bgcolor: "#fff",
                border: "1px solid",
                borderColor: "divider",
                "&:hover": {
                  bgcolor: "#f8fafc",
                },
              }}
            >
              <Bell size={18} />
            </IconButton>
          </Badge>

          {/* Notifications Popover */}
          <Popover
            open={isBellOpen}
            anchorEl={bellAnchor}
            onClose={handleBellClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            slotProps={{
              paper: {
                sx: {
                  width: 320,
                  p: 2,
                  borderRadius: "16px",
                  boxShadow: "0 12px 30px rgba(0,0,0,.08)",
                }
              }
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5 }}>
              Notifications
            </Typography>
            <Divider sx={{ mb: 1 }} />
            <Stack spacing={1.5}>
              {notifications.map((n) => (
                <Box key={n.id}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    {n.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {n.desc}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
                    {n.time}
                  </Typography>
                  <Divider sx={{ mt: 1.5 }} />
                </Box>
              ))}
            </Stack>
          </Popover>

          <IconButton
            onClick={() => navigate("/settings")}
            sx={{
              bgcolor: "#fff",
              border: "1px solid",
              borderColor: "divider",
              "&:hover": {
                bgcolor: "#f8fafc",
              },
            }}
          >
            <Settings size={18} />
          </IconButton>

          <Stack
            direction="row"
            spacing={1.5}
            onClick={handleProfileClick}
            sx={{
              alignItems: "center",
              cursor: "pointer",
              p: 0.5,
              borderRadius: "12px",
              "&:hover": {
                bgcolor: "action.hover",
              }
            }}
          >
            <Avatar
              sx={{
                bgcolor: "primary.main",
              }}
            >
              {user?.username?.charAt(0).toUpperCase() || "U"}
            </Avatar>

            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography
                sx={{
                  fontWeight: 700
                }}
              >
                {user?.username || "Admin User"}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Administrator
              </Typography>
            </Box>
          </Stack>

          {/* Profile Dropdown Menu */}
          <Menu
            anchorEl={profileAnchor}
            open={isProfileOpen}
            onClose={handleProfileClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            slotProps={{
              paper: {
                sx: {
                  borderRadius: "16px",
                  boxShadow: "0 10px 25px rgba(0,0,0,.08)",
                  p: 1,
                  minWidth: 200,
                }
              }
            }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                {user?.username || "Admin User"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user?.email || "admin@bloodflow360.com"}
              </Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <MenuItem onClick={() => { handleProfileClose(); navigate("/settings"); }}>
              <Settings size={16} style={{ marginRight: 10 }} />
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
              <LogOut size={16} style={{ marginRight: 10 }} />
              Logout
            </MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}