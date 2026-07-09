import {
  Chip,
  LinearProgress,
  Stack,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
} from "@mui/material";

import type { Inventory } from "../../types/dashboard";

interface DashboardInventoryProps {
  inventory?: Inventory[];
}

const getStatusColor = (status: string): "success" | "warning" | "error" | "default" => {
  const cleanStatus = status?.toLowerCase() || "";
  if (cleanStatus.includes("optimal")) return "success";
  if (cleanStatus.includes("low")) return "warning";
  if (cleanStatus.includes("critical")) return "error";
  return "default";
};

const getCapacityPercentage = (units: number): number => {
  // Let's assume a capacity of 100 units per group
  return Math.min(Math.round((units / 100) * 100), 100);
};

export default function DashboardInventory({ inventory }: DashboardInventoryProps) {
  const displayInventory = inventory && inventory.length > 0
    ? inventory
    : [
      { bloodGroup: "A+", availableUnits: 42, reservedUnits: 5, status: "Optimal" },
      { bloodGroup: "A-", availableUnits: 12, reservedUnits: 2, status: "Low Stock" },
      { bloodGroup: "B+", availableUnits: 38, reservedUnits: 4, status: "Optimal" },
      { bloodGroup: "B-", availableUnits: 8, reservedUnits: 1, status: "Low Stock" },
      { bloodGroup: "O+", availableUnits: 96, reservedUnits: 8, status: "Optimal" },
      { bloodGroup: "O-", availableUnits: 16, reservedUnits: 3, status: "Critical" },
      { bloodGroup: "AB+", availableUnits: 24, reservedUnits: 2, status: "Optimal" },
      { bloodGroup: "AB-", availableUnits: 6, reservedUnits: 1, status: "Critical" },
    ];

  return (
    <Card elevation={0} sx={{ borderRadius: "24px", border: "1px solid", borderColor: "divider", bgcolor: "#fff", boxShadow: "0 20px 45px rgba(15,23,42,.08)" }}>
      <CardContent sx={{ p: 4 }}>
        <Stack spacing={3}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
            }}
          >
            Live Blood Inventory
          </Typography>

          <Grid container spacing={2}>
            {displayInventory.map((item) => {
              const statusColor = getStatusColor(item.status);
              const percentage = getCapacityPercentage(item.availableUnits);

              return (
                <Grid item xs={6} sm={4} md={3} key={item.bloodGroup}>
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: "20px",
                      border: "1px solid",
                      borderColor: "divider",
                      bgcolor: "#f8fafc",
                      transition: ".2s",
                      "&:hover": {
                        borderColor: "primary.main",
                        boxShadow: "0 10px 25px rgba(0,0,0,.04)",
                        transform: "translateY(-4px)"
                      }
                    }}
                  >
                    <Stack spacing={2}>
                      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
                        <Chip
                          color="error"
                          label={item.bloodGroup}
                          sx={{
                            fontWeight: 800,
                            fontSize: 15,
                            height: 32,
                            borderRadius: "10px"
                          }}
                        />
                        <Chip
                          label={item.status}
                          color={statusColor}
                          size="small"
                          sx={{ fontWeight: 600, fontSize: 11 }}
                        />
                      </Stack>

                      <Box>
                        <Typography variant="h3" sx={{ fontWeight: 800 }}>
                          {item.availableUnits}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.reservedUnits} Units Reserved
                        </Typography>
                      </Box>

                      <Box>
                        <Stack direction="row" sx={{ justifyContent: "space-between", mb: 0.5 }}>
                          <Typography variant="caption" color="text.secondary">Capacity</Typography>
                          <Typography variant="caption" sx={{ fontWeight: 600 }}>{percentage}%</Typography>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={percentage}
                          color={statusColor === "default" ? "primary" : statusColor}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                          }}
                        />
                      </Box>
                    </Stack>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
}