import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import DashboardHero from "../../components/dashboard/DashboardHero";
import DashboardStats from "../../components/dashboard/DashboardStats";
import DashboardBloodChart from "../../components/dashboard/DashboardBloodChart";
import DashboardBloodGroups from "../../components/dashboard/DashboardBloodGroups";
import DashboardEmergency from "../../components/dashboard/DashboardEmergency";
import DashboardQuickActions from "../../components/dashboard/DashboardQuickActions";
import DashboardActivity from "../../components/dashboard/DashboardActivity";
import DashboardHospitals from "../../components/dashboard/DashboardHospitals";
import DashboardInventory from "../../components/dashboard/DashboardInventory";

import DashboardFooter from "../../components/dashboard/DashboardFooter";
import { useDashboard } from "../../hooks/useDashboard";
import LoadingScreen from "../../design-system/feedback/LoadingScreen";


export default function DashboardPage() {

  const { data, isLoading, error } = useDashboard();

  if (isLoading)
    return <LoadingScreen />;

  if (error || !data)
    return <div>Unable to load dashboard.</div>;

  return (
    <Stack spacing={4}>
      <DashboardHero />

<DashboardStats stats={data.stats} />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <DashboardBloodChart bloodChart={data.bloodChart} />
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <DashboardBloodGroups bloodGroups={data.bloodGroups} />
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <DashboardEmergency emergencies={data.emergencies} />
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <DashboardQuickActions />
        </Grid>

        <Grid size={{ xs: 12, lg: 8 }}>
          <DashboardActivity activities={data.activities} />
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <DashboardHospitals hospitals={data.hospitals} />
        </Grid>

        <Grid size={12}>
          <DashboardInventory inventory={data.inventory} />
        </Grid>
      </Grid>

      <DashboardFooter />
    </Stack>
  );
}