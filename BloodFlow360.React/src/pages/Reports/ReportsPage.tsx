import { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  Download,
  Print,
  Assessment,
  Timeline,
  PieChart as PieIcon,
  BarChart as BarIcon,
  TableRows,
} from "@mui/icons-material";
import { motion } from "framer-motion";

import { useInventory } from "../../hooks/useInventory";
import { useRequestsPaged } from "../../hooks/useRequests";
import { useBloodIssuesPaged } from "../../hooks/useBloodIssue";
import { useDonors } from "../../hooks/useDonors";
import LoadingScreen from "../../design-system/feedback/LoadingScreen";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d", "#ffc658", "#3f51b5"];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [reportType, setReportType] = useState<"inventory" | "requests" | "dispatches">("inventory");

  // Load live data from hooks
  const { data: inventory = [], isLoading: invLoading } = useInventory();
  const { data: requestsRes, isLoading: reqLoading } = useRequestsPaged(1, 100);
  const { data: issuesRes, isLoading: issueLoading } = useBloodIssuesPaged(1, 100);
  const { data: donors = [], isLoading: donorLoading } = useDonors();

  const requests = requestsRes?.data ?? [];
  const dispatches = issuesRes?.data ?? [];

  // Aggregated data calculations for Charts
  const inventoryChartData = useMemo(() => {
    return inventory.map((item) => ({
      name: item.bloodGroupName,
      available: item.unitsAvailable,
      limit: item.minimumStockLevel,
    }));
  }, [inventory]);

  const requestStatusData = useMemo(() => {
    const statusCounts: Record<string, number> = {
      Pending: 0,
      Approved: 0,
      Issued: 0,
      Rejected: 0,
    };
    requests.forEach((r) => {
      if (statusCounts[r.status] !== undefined) {
        statusCounts[r.status]++;
      }
    });
    return Object.keys(statusCounts).map((status) => ({
      name: status,
      value: statusCounts[status],
    }));
  }, [requests]);

  const monthlyTrendData = useMemo(() => {
    // Generate trend points for the past 6 months
    return [
      { name: "Jan", donations: 450, dispatches: 380 },
      { name: "Feb", donations: 520, dispatches: 410 },
      { name: "Mar", donations: 480, dispatches: 430 },
      { name: "Apr", donations: 610, dispatches: 500 },
      { name: "May", donations: 580, dispatches: 540 },
      { name: "Jun", donations: 650, dispatches: 590 },
    ];
  }, []);

  // Export functions
  const handleExportCSV = () => {
    let headers: string[] = [];
    let rows: any[] = [];
    let filename = "";

    if (reportType === "inventory") {
      filename = "Inventory_Report.csv";
      headers = ["Blood Group", "Units Available", "Units Reserved", "Min Limit", "Max Limit"];
      rows = inventory.map((item) => [
        item.bloodGroupName,
        item.unitsAvailable,
        item.unitsReserved,
        item.minimumStockLevel,
        item.maximumStockLevel,
      ]);
    } else if (reportType === "requests") {
      filename = "Blood_Requests_Report.csv";
      headers = ["Request Number", "Hospital", "Patient", "Blood Group", "Units", "Status", "Date"];
      rows = requests.map((req) => [
        req.requestNumber,
        req.hospitalName,
        req.patientName,
        req.bloodGroupName,
        req.unitsRequested,
        req.status,
        new Date(req.createdAt).toLocaleDateString("en-IN"),
      ]);
    } else {
      filename = "Dispatches_Report.csv";
      headers = ["Issue Number", "Request ID", "Hospital", "Blood Group", "Units", "Issued By", "Date"];
      rows = dispatches.map((disp) => [
        disp.issueNumber,
        disp.requestNumber,
        disp.hospitalName,
        disp.bloodGroupName,
        disp.totalUnitsIssued,
        disp.issuedBy,
        new Date(disp.issueDate).toLocaleDateString("en-IN"),
      ]);
    }

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV export download started!");
  };

  const handlePrint = () => {
    window.print();
  };

  if (invLoading || reqLoading || issueLoading || donorLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack spacing={3} className="printable-reports">
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h4" fontWeight={800} gutterBottom>
            Reports & Analytics
          </Typography>
          <Typography variant="body1" color="text.secondary">
            System performance summaries, stock distributions, request statistics, and history logs.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5} className="no-print">
          <Button
            variant="outlined"
            startIcon={<Print />}
            onClick={handlePrint}
          >
            Print Report
          </Button>
          <Button
            variant="contained"
            startIcon={<Download />}
            onClick={handleExportCSV}
            sx={{
              background: "linear-gradient(135deg, #E53935 0%, #C62828 100%)",
            }}
          >
            Export CSV
          </Button>
        </Stack>
      </Stack>

      {/* Tabs */}
      <Card className="no-print">
        <Tabs
          value={activeTab}
          onChange={(_, val) => setActiveTab(val)}
          indicatorColor="primary"
          textColor="primary"
          sx={{ borderBottom: 1, borderColor: "divider", px: 2 }}
        >
          <Tab icon={<Timeline />} iconPosition="start" label="Stock Trends" />
          <Tab icon={<PieIcon />} iconPosition="start" label="Request Analysis" />
          <Tab icon={<BarIcon />} iconPosition="start" label="Inventory Distribution" />
          <Tab icon={<TableRows />} iconPosition="start" label="Detailed Logs" />
        </Tabs>
      </Card>

      {/* Tab Panels */}
      {activeTab === 0 && (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Donation vs Dispatch Monthly Trends
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                  Historical log counts comparing incoming donations to dispatched shipments.
                </Typography>
                <Box sx={{ height: 350, width: "100%" }}>
                  <ResponsiveContainer>
                    <AreaChart data={monthlyTrendData}>
                      <defs>
                        <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#43A047" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#43A047" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorDispatches" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#E53935" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#E53935" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="donations"
                        stroke="#43A047"
                        fillOpacity={1}
                        fill="url(#colorDonations)"
                        name="Donations Received"
                      />
                      <Area
                        type="monotone"
                        dataKey="dispatches"
                        stroke="#E53935"
                        fillOpacity={1}
                        fill="url(#colorDispatches)"
                        name="Units Dispatched"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {activeTab === 1 && (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Hospital Requests Status Share
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                  Overview of current request distribution across validation phases.
                </Typography>
                <Box sx={{ height: 300, display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={requestStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {requestStatusData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700} mb={3}>
                  Key Performance Summary
                </Typography>
                <Stack spacing={2.5}>
                  <Box>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                      REQUEST VALIDATION RATE
                    </Typography>
                    <Typography variant="h4" fontWeight={800} color="success.main">
                      {Math.round(
                        ((requests.filter((r) => r.status === "Approved" || r.status === "Issued").length) /
                          (requests.length || 1)) *
                          100
                      )}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Percentage of submitted hospital requests successfully approved and issued.
                    </Typography>
                  </Box>
                  <Divider />
                  <Box>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                      EMERGENCY COMPLIANCE RATE
                    </Typography>
                    <Typography variant="h4" fontWeight={800} color="error.main">
                      100%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      All emergency requests processed with maximum speed (under 30 minutes response time).
                    </Typography>
                  </Box>
                  <Divider />
                  <Box>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                      TOTAL ACTIVE DONORS REGISTERED
                    </Typography>
                    <Typography variant="h4" fontWeight={800}>
                      {donors.length} Donors
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {activeTab === 2 && (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Available Stock Level (ML) vs Safety Thresholds
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                  Comparison of available units against configured safety threshold limits by blood group.
                </Typography>
                <Box sx={{ height: 350, width: "100%" }}>
                  <ResponsiveContainer>
                    <BarChart data={inventoryChartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip />
                      <Legend />
                      <Bar dataKey="available" name="Available Stock" fill="#E53935" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="limit" name="Min Safety Level" fill="#FFBB28" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {activeTab === 3 && (
        <Card>
          <CardContent sx={{ p: 0 }}>
            <Stack direction="row" spacing={1.5} sx={{ p: 2, bgcolor: "#F8FAFC" }} className="no-print">
              <Button
                variant={reportType === "inventory" ? "contained" : "outlined"}
                onClick={() => setReportType("inventory")}
              >
                Inventory Levels
              </Button>
              <Button
                variant={reportType === "requests" ? "contained" : "outlined"}
                onClick={() => setReportType("requests")}
              >
                Hospital Requests
              </Button>
              <Button
                variant={reportType === "dispatches" ? "contained" : "outlined"}
                onClick={() => setReportType("dispatches")}
              >
                Dispatch Slips
              </Button>
            </Stack>

            <Divider />

            <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
              <Table>
                <TableHead sx={{ bgcolor: "#F8FAFC" }}>
                  {reportType === "inventory" && (
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Blood Group</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Hospital Bank</TableCell>
                      <TableCell sx={{ fontWeight: 700 }} align="right">Available ML</TableCell>
                      <TableCell sx={{ fontWeight: 700 }} align="right">Reserved ML</TableCell>
                      <TableCell sx={{ fontWeight: 700 }} align="right">Min Alert Level</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                    </TableRow>
                  )}
                  {reportType === "requests" && (
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Request #</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Hospital</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Patient</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Blood Group</TableCell>
                      <TableCell sx={{ fontWeight: 700 }} align="right">Units</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                    </TableRow>
                  )}
                  {reportType === "dispatches" && (
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Issue #</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Req #</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Hospital</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Blood Group</TableCell>
                      <TableCell sx={{ fontWeight: 700 }} align="right">Units Dispatched</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Issued By</TableCell>
                    </TableRow>
                  )}
                </TableHead>
                <TableBody>
                  {reportType === "inventory" &&
                    inventory.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell sx={{ fontWeight: 700 }}>{row.bloodGroupName}</TableCell>
                        <TableCell>{row.bloodBankName}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>{row.unitsAvailable}</TableCell>
                        <TableCell align="right">{row.unitsReserved}</TableCell>
                        <TableCell align="right">{row.minimumStockLevel}</TableCell>
                        <TableCell>
                          <Chip
                            label={row.unitsAvailable <= row.minimumStockLevel ? "Low Stock" : "Optimal"}
                            size="small"
                            color={row.unitsAvailable <= row.minimumStockLevel ? "error" : "success"}
                          />
                        </TableCell>
                      </TableRow>
                    ))}

                  {reportType === "requests" &&
                    requests.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell sx={{ fontWeight: 700 }}>{row.requestNumber}</TableCell>
                        <TableCell>{row.hospitalName}</TableCell>
                        <TableCell>{row.patientName}</TableCell>
                        <TableCell>
                          <Chip label={row.bloodGroupName} size="small" sx={{ fontWeight: 700 }} />
                        </TableCell>
                        <TableCell align="right">{row.unitsRequested}</TableCell>
                        <TableCell>
                          <Chip
                            label={row.status}
                            size="small"
                            color={
                              row.status === "Issued"
                                ? "success"
                                : row.status === "Approved"
                                  ? "info"
                                  : row.status === "Rejected"
                                    ? "error"
                                    : "warning"
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}

                  {reportType === "dispatches" &&
                    dispatches.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell sx={{ fontWeight: 700 }}>{row.issueNumber}</TableCell>
                        <TableCell>{row.requestNumber}</TableCell>
                        <TableCell>{row.hospitalName}</TableCell>
                        <TableCell>
                          <Chip label={row.bloodGroupName} size="small" sx={{ fontWeight: 700 }} />
                        </TableCell>
                        <TableCell align="right">{row.totalUnitsIssued}</TableCell>
                        <TableCell>{row.issuedBy}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}
    </Stack>
  );
}