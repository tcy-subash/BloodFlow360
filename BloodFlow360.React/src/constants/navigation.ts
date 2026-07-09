import {
  LayoutDashboard,
  Users,
  HeartPulse,
  Building2,
  ClipboardList,
  Droplets,
  BarChart3,
  UserCog,
  Settings,
} from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Donors",
    path: "/donors",
    icon: Users,
  },
  {
    title: "Inventory",
    path: "/inventory",
    icon: HeartPulse,
  },
  {
    title: "Hospitals",
    path: "/hospitals",
    icon: Building2,
  },
  {
    title: "Requests",
    path: "/requests",
    icon: ClipboardList,
  },
  {
    title: "Blood Issue",
    path: "/bloodissue",
    icon: Droplets,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: BarChart3,
  },
  {
    title: "Users",
    path: "/users",
    icon: UserCog,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
];