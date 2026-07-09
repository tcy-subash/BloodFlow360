import {
  Avatar,
  Stack,
  Typography,
  Box,
  Chip,
} from "@mui/material";

import GlassCard from "../../design-system/cards/GlassCard";
import type { HospitalStatus } from "../../types/dashboard";

interface DashboardHospitalsProps {
  hospitals?: HospitalStatus[];
}

export default function DashboardHospitals({ hospitals }: DashboardHospitalsProps) {
  const displayHospitals = hospitals && hospitals.length > 0
    ? hospitals
    : [];

  return (
    <GlassCard sx={{ height: "100%" }}>
      <Stack spacing={2.5}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
          }}
        >
          Hospital Status
        </Typography>

        {displayHospitals.length === 0 ? (
          <Box sx={{ py: 4, textAlign: "center" }}>
            <Typography color="text.secondary">
              No hospitals registered
            </Typography>
          </Box>
        ) : (
          displayHospitals.map((hospital) => (
            <Stack
              key={hospital.id}
              direction="row"
              spacing={1.5}
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                py: 0.5,
              }}
            >
              <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", minWidth: 0 }}>
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    fontSize: 14,
                    bgcolor: hospital.isOnline ? "success.main" : "grey.400",
                  }}
                >
                  {hospital.hospitalName[0]}
                </Avatar>

                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {hospital.hospitalName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {hospital.activeRequests} request{hospital.activeRequests !== 1 ? "s" : ""}
                  </Typography>
                </Box>
              </Stack>

              <Chip
                label={hospital.isOnline ? "Online" : "Offline"}
                color={hospital.isOnline ? "success" : "default"}
                size="small"
                variant="outlined"
                sx={{ flexShrink: 0 }}
              />
            </Stack>
          ))
        )}
      </Stack>
    </GlassCard>
  );
}