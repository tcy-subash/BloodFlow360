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
  Sun,
  Moon,
  Menu,
} from "lucide-react";

import { useAuth } from "../../auth/AuthContext";
import { useColorMode } from "../../theme/ColorModeContext";

interface BFNavbarProps {
  onMenuClick?: () => void;
}

export default function BFNavbar({ onMenuClick }: BFNavbarProps) {
  const { user, logout } = useAuth();
  const { mode, toggleColorMode } = useColorMode();
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
        background: "rgba(255, 255, 255, 0.45)",
        borderBottom: "1px solid",
        borderColor: "rgba(211, 47, 47, 0.08)",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          minHeight: "80px !important",
        }}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          {onMenuClick && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={onMenuClick}
              sx={{
                display: { md: "none" },
                p: 1,
                mr: 0.5,
                border: "1px solid rgba(211, 47, 47, 0.1)",
                borderRadius: "12px",
                bgcolor: "rgba(255, 255, 255, 0.5)",
                "&:hover": {
                  bgcolor: "rgba(211, 47, 47, 0.05)",
                },
              }}
            >
              <Menu size={20} />
            </IconButton>
          )}
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: "#111827",
                letterSpacing: "-0.5px",
              }}
            >
              BloodFlow360
            </Typography>

            <Typography
              color="text.secondary"
              variant="body2"
              sx={{ fontSize: "0.85rem", fontWeight: 500 }}
            >
              Enterprise Blood Bank Platform
            </Typography>
          </Box>
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: "center",
          }}
        >
          <TextField
            placeholder="Search transactions, donors..."
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchSubmit}
            sx={{
              width: 320,
              "& .MuiOutlinedInput-root": {
                borderRadius: "14px",
                bgcolor: "rgba(255, 255, 255, 0.6)",
                border: "1px solid rgba(211, 47, 47, 0.08)",
                transition: "all 0.2s",
                "& fieldset": {
                  border: "none",
                },
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.8)",
                  boxShadow: "0 4px 12px rgba(128, 6, 25, 0.02)",
                },
                "&.Mui-focused": {
                  bgcolor: "#ffffff",
                  boxShadow: "0 4px 20px rgba(128, 6, 25, 0.04)",
                  border: "1px solid rgba(211, 47, 47, 0.25)",
                },
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start" sx={{ color: "text.secondary" }}>
                    <Search size={18} />
                  </InputAdornment>
                ),
              },
            }}
          />

          <IconButton
            onClick={toggleColorMode}
            sx={{
              bgcolor: mode === "dark" ? "rgba(30, 30, 42, 0.6)" : "rgba(255, 255, 255, 0.6)",
              border: "1px solid",
              borderColor: mode === "dark" ? "rgba(211, 47, 47, 0.2)" : "rgba(211, 47, 47, 0.08)",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.02)",
              color: mode === "dark" ? "#F59E0B" : "#4B5563",
              "&:hover": {
                bgcolor: mode === "dark" ? "rgba(30, 30, 42, 0.8)" : "rgba(255, 255, 255, 0.9)",
                transform: "rotate(15deg) scale(1.08)",
                boxShadow: mode === "dark" ? "0 6px 15px rgba(0,0,0,0.3)" : "0 6px 15px rgba(128, 6, 25, 0.04)",
              },
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {mode === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </IconButton>

          <Badge
            badgeContent={notifications.length}
            color="error"
          >
            <IconButton
              onClick={handleBellClick}
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.6)",
                border: "1px solid rgba(211, 47, 47, 0.08)",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.02)",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.9)",
                  transform: "translateY(-1px)",
                  boxShadow: "0 6px 15px rgba(128, 6, 25, 0.04)",
                },
                transition: "all 0.2s",
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
                  boxShadow: "0 12px 30px rgba(128, 6, 25, 0.06)",
                  border: "1px solid rgba(211, 47, 47, 0.08)",
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(12px)",
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
              bgcolor: "rgba(255, 255, 255, 0.6)",
              border: "1px solid rgba(211, 47, 47, 0.08)",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.02)",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.9)",
                transform: "translateY(-1px)",
                boxShadow: "0 6px 15px rgba(128, 6, 25, 0.04)",
              },
              transition: "all 0.2s",
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
              p: 0.75,
              pr: 1.5,
              borderRadius: "12px",
              border: "1px solid rgba(211, 47, 47, 0.08)",
              bgcolor: "rgba(255, 255, 255, 0.5)",
              boxShadow: "0 4px 10px rgba(0,0,0,0.01)",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.8)",
                transform: "translateY(-1px)",
                boxShadow: "0 6px 15px rgba(128,6,25,0.03)",
              },
              transition: "all 0.2s",
            }}
          >
            <Avatar
              sx={{
                bgcolor: "primary.main",
                border: "2px solid #ffffff",
                boxShadow: "0 4px 10px rgba(211, 47, 47, 0.15)",
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