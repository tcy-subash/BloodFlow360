import {
  Dashboard,
  Groups,
  Inventory,
  Favorite,
  LocalHospital,
  Healing,
  Assessment,
  Person,
  Bloodtype,
  PersonSearch,
  Settings,
} from "@mui/icons-material";

import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";

const menus = [
  { text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
  { text: "Donors", icon: <Groups />, path: "/donors" },
  { text: "Blood Inventory", icon: <Inventory />, path: "/inventory" },
  { text: "Blood Units", icon: <Favorite />, path: "/bloodunits" },
  { text: "Blood Requests", icon: <Healing />, path: "/requests" },
  { text: "Blood Issue", icon: <Bloodtype />, path: "/bloodissue" },
  { text: "Hospitals", icon: <LocalHospital />, path: "/hospitals" },
  { text: "Patients", icon: <PersonSearch />, path: "/patients" },
  { text: "Reports", icon: <Assessment />, path: "/reports" },
  { text: "Users", icon: <Person />, path: "/users" },
  { text: "Settings", icon: <Settings />, path: "/settings" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Toolbar />

      <Box sx={{ overflow: "auto" }}>
        <List>
          {menus.map((item) => (
            <ListItemButton
              key={item.text}
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>

              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </>
  );
}