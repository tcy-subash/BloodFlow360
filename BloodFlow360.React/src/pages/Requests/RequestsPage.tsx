import { useState, useMemo, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import {
  Search,
  Add,
  History,
  CheckCircle,
  // Cancel,
  ThumbUp,
  ThumbDown,
  Close,
  Bloodtype,
  LocalHospital,
  Warning,
  Outbox,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import {
  useRequestsPaged,
  useCreateRequest,
  useApproveRequest,
  useRejectRequest,
  useIssueRequest,
  useWorkflowStatus,
} from "../../hooks/useRequests";
import type { BloodRequest, CreateBloodRequest } from "../../types/request";
import LoadingScreen from "../../design-system/feedback/LoadingScreen";
import api from "../../api/axios";

// ─── Stat Cards ──────────────────────────────────────────
function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ flex: 1 }}
    >
      <Card
        sx={{
          background: `linear-gradient(135deg, ${color}15 0%, ${color}08 100%)`,
          border: `1px solid ${color}25`,
        }}
      >
        <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: `${color}18`,
                color: color,
              }}
            >
              {icon}
            </Box>
            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: 500 }}
              >
                {title}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight:
                    700,
                }} >
                {value}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </motion.div >
  );
}

// ─── Main Requests Page ──────────────────────────────────
export default function RequestsPage() {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [search, setSearch] = useState("");
  const [statusTab, setStatusTab] = useState<string>("All");
  const [formOpen, setFormOpen] = useState(false);
  const [approvalTarget, setApprovalTarget] = useState<BloodRequest | null>(null);
  const [rejectionTarget, setRejectionTarget] = useState<BloodRequest | null>(null);
  const [issueTarget, setIssueTarget] = useState<BloodRequest | null>(null);
  const [workflowTarget, setWorkflowTarget] = useState<BloodRequest | null>(null);

  const location = useLocation();
  useEffect(() => {
    if (location.state?.openForm) {
      setFormOpen(true);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const { data, isLoading, error } = useRequestsPaged(
    paginationModel.page + 1,
    paginationModel.pageSize,
    search || undefined,
    statusTab === "All" ? undefined : statusTab
  );

  const createMutation = useCreateRequest();
  const approveMutation = useApproveRequest();
  const rejectMutation = useRejectRequest();
  const issueMutation = useIssueRequest();

  const requests = data?.data ?? [];
  const totalRecords = data?.totalRecords ?? 0;

  // Stats calculation
  const stats = useMemo(() => {
    const total = totalRecords;
    const pending = requests.filter((r) => r.status === "Pending").length;
    const emergency = requests.filter((r) => r.isEmergency).length;
    const completed = requests.filter((r) => r.status === "Issued").length;
    return { total, pending, emergency, completed };
  }, [requests, totalRecords]);

  const handleCreateSubmit = useCallback(
    async (formData: CreateBloodRequest) => {
      try {
        await createMutation.mutateAsync(formData);
        toast.success("Blood request submitted successfully!");
        setFormOpen(false);
      } catch {
        toast.error("Failed to submit request.");
      }
    },
    [createMutation]
  );

  const handleApproveSubmit = useCallback(
    async (approvedUnits: number, remarks: string) => {
      if (!approvalTarget) return;
      try {
        await approveMutation.mutateAsync({
          requestId: approvalTarget.id,
          approvedUnits,
          remarks,
        });
        toast.success("Request approved and blood reserved!");
        setApprovalTarget(null);
      } catch {
        toast.error("Approval failed. Insufficient inventory?");
      }
    },
    [approvalTarget, approveMutation]
  );

  const handleRejectSubmit = useCallback(
    async (remarks: string) => {
      if (!rejectionTarget) return;
      try {
        await rejectMutation.mutateAsync({
          requestId: rejectionTarget.id,
          remarks,
        });
        toast.success("Request rejected.");
        setRejectionTarget(null);
      } catch {
        toast.error("Rejection failed.");
      }
    },
    [rejectionTarget, rejectMutation]
  );

  const handleIssueSubmit = useCallback(
    async (remarks: string) => {
      if (!issueTarget) return;
      try {
        await issueMutation.mutateAsync({
          requestId: issueTarget.id,
          remarks,
        });
        toast.success("Blood units issued successfully!");
        setIssueTarget(null);
      } catch {
        toast.error("Issuing failed.");
      }
    },
    [issueTarget, issueMutation]
  );

  // Grid Columns
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "requestNumber",
        headerName: "Req Number",
        width: 140,
        renderCell: (params) => (
          <Typography color="primary"
            sx={{
              fontWeight: 700,
              fontSize: 13
            }}    >
            {params.value}
          </Typography >
        ),
      },
      {
        field: "hospitalName",
        headerName: "Hospital",
        width: 180,
      },
      {
        field: "patientName",
        headerName: "Patient",
        width: 150,
      },
      {
        field: "bloodGroupName",
        headerName: "Group",
        width: 100,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => (
          <Chip
            label={params.value || "Unknown"}
            size="small"
            sx={{ fontWeight: 800, bgcolor: "#E53935", color: "#fff" }}
          />
        ),
      },
      {
        field: "unitsRequested",
        headerName: "Units Requested",
        width: 130,
        align: "center",
      },
      {
        field: "isEmergency",
        headerName: "Priority",
        width: 120,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => (
          <Chip
            label={params.value ? "EMERGENCY" : "Standard"}
            size="small"
            color={params.value ? "error" : "default"}
            sx={{ fontWeight: 700, fontSize: 10 }}
            icon={params.value ? <Warning sx={{ fontSize: 14 }} /> : undefined}
          />
        ),
      },
      {
        field: "status",
        headerName: "Status",
        width: 130,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => {
          const s = params.value;
          const color =
            s === "Issued"
              ? "success"
              : s === "Approved"
                ? "info"
                : s === "Rejected"
                  ? "error"
                  : "warning";
          return <Chip label={s} size="small" color={color} sx={{ fontWeight: 700 }} />;
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 200,
        sortable: false,
        renderCell: (params) => {
          const row = params.row as BloodRequest;
          return (
            <Stack direction="row" spacing={0.5}>
              {row.status === "Pending" && (
                <>
                  <Tooltip title="Approve Request">
                    <IconButton size="small" color="success" onClick={() => setApprovalTarget(row)}>
                      <ThumbUp fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Reject Request">
                    <IconButton size="small" color="error" onClick={() => setRejectionTarget(row)}>
                      <ThumbDown fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </>
              )}
              {row.status === "Approved" && (
                <Tooltip title="Issue Blood Units">
                  <IconButton size="small" color="primary" onClick={() => setIssueTarget(row)}>
                    <Outbox fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title="View Workflow History">
                <IconButton size="small" color="default" onClick={() => setWorkflowTarget(row)}>
                  <History fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          );
        },
      },
    ],
    []
  );

  if (isLoading) return <LoadingScreen />;

  if (error)
    return (
      <Alert severity="error" sx={{ m: 4 }}>
        Failed to load blood requests. Please check connection.
      </Alert>
    );

  return (
    <Stack spacing={3}>
      {/* Header */}
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 800 }} gutterBottom>
          Blood Requests
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Approve, manage, and process blood requests from registered hospitals.
        </Typography>
      </Box>

      {/* Metrics */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <StatCard
          title="Active Requests"
          value={stats.total}
          icon={<LocalHospital />}
          color="#1976D2"
        />
        <StatCard
          title="Pending Approval"
          value={stats.pending}
          icon={<Warning />}
          color="#FB8C00"
        />
        <StatCard
          title="Emergency Flags"
          value={stats.emergency}
          icon={<Bloodtype />}
          color="#E53935"
        />
        <StatCard
          title="Completed Issues"
          value={stats.completed}
          icon={<CheckCircle />}
          color="#43A047"
        />
      </Stack>

      {/* Tab Filter & Search */}
      <Card>
        <Tabs
          value={statusTab}
          onChange={(_, val) => setStatusTab(val)}
          indicatorColor="primary"
          textColor="primary"
          sx={{ borderBottom: 1, borderColor: "divider", px: 2 }}
        >
          <Tab label="All Requests" value="All" />
          <Tab label="Pending" value="Pending" />
          <Tab label="Approved" value="Approved" />
          <Tab label="Issued" value="Issued" />
          <Tab label="Rejected" value="Rejected" />
        </Tabs>

        <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{
              alignItems: { sm: "center" },
              justifyContent: "space-between",
            }}
          >
            <TextField
              size="small"
              placeholder="Search request ID, patient or doctor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ minWidth: 320 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setFormOpen(true)}
              sx={{
                background: "linear-gradient(135deg, #E53935 0%, #C62828 100%)",
                "&:hover": {
                  background: "linear-gradient(135deg, #C62828 0%, #B71C1C 100%)",
                },
              }}
            >
              New Request
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <DataGrid
          rows={requests}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 25]}
          rowCount={totalRecords}
          paginationMode="server"
          disableRowSelectionOnClick
          autoHeight
          sx={{
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              bgcolor: "#F8FAFC",
              fontWeight: 700,
            },
          }}
        />
      </Card>

      {/* Create Dialog */}
      <CreateRequestDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleCreateSubmit}
        isSubmitting={createMutation.isPending}
      />

      {/* Approve Dialog */}
      <ApproveRequestDialog
        open={!!approvalTarget}
        item={approvalTarget}
        onClose={() => setApprovalTarget(null)}
        onSubmit={handleApproveSubmit}
        isSubmitting={approveMutation.isPending}
      />

      {/* Reject Dialog */}
      <RejectRequestDialog
        open={!!rejectionTarget}
        item={rejectionTarget}
        onClose={() => setRejectionTarget(null)}
        onSubmit={handleRejectSubmit}
        isSubmitting={rejectMutation.isPending}
      />

      {/* Issue Dialog */}
      <IssueRequestDialog
        open={!!issueTarget}
        item={issueTarget}
        onClose={() => setIssueTarget(null)}
        onSubmit={handleIssueSubmit}
        isSubmitting={issueMutation.isPending}
      />

      {/* Status History Logs */}
      <WorkflowStatusDrawer
        item={workflowTarget}
        onClose={() => setWorkflowTarget(null)}
      />
    </Stack>
  );
}

// ─── Create Request Form Dialog ──────────────────────────
function CreateRequestDialog({
  open,
  onClose,
  onSubmit,
  isSubmitting,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateBloodRequest) => void;
  isSubmitting: boolean;
}) {
  const [hospitals, setHospitals] = useState<{ id: string; name: string }[]>([]);
  const [bloodGroups, setBloodGroups] = useState<{ id: string; name: string }[]>([]);

  const [form, setForm] = useState({
    hospitalId: "",
    bloodGroupId: "",
    requestNumber: "",
    unitsRequested: 1,
    patientName: "",
    doctorName: "",
    isEmergency: false,
  });

  useMemo(() => {
    if (open) {
      api.get("/Hospitals").then((res) => setHospitals(res.data.data || []));
      api.get("/BloodGroups").then((res) => {
        setBloodGroups(res.data.data || []);
      });
      setForm({
        hospitalId: "",
        bloodGroupId: "",
        requestNumber: `REQ${Date.now().toString().slice(-6)}`,
        unitsRequested: 1,
        patientName: "",
        doctorName: "",
        isEmergency: false,
      });
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>Submit Hospital Blood Request</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Hospital *</InputLabel>
            <Select
              value={form.hospitalId}
              label="Hospital *"
              onChange={(e) => setForm({ ...form, hospitalId: e.target.value })}
            >
              {hospitals.map((h) => (
                <MenuItem key={h.id} value={h.id}>
                  {h.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Blood Group *</InputLabel>
            <Select
              value={form.bloodGroupId}
              label="Blood Group *"
              onChange={(e) => setForm({ ...form, bloodGroupId: e.target.value })}
            >
              {bloodGroups.map((g) => (
                <MenuItem key={g.id} value={g.id}>
                  {g.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="Units Requested *"
                type="number"
                value={form.unitsRequested}
                onChange={(e) =>
                  setForm({ ...form, unitsRequested: parseInt(e.target.value) || 0 })
                }
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex", alignItems: "center" }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={form.isEmergency}
                    onChange={(e) => setForm({ ...form, isEmergency: e.target.checked })}
                    color="error"
                  />
                }
                label="Emergency request"
              />
            </Grid>
          </Grid>

          <TextField
            fullWidth
            size="small"
            label="Patient Name *"
            value={form.patientName}
            onChange={(e) => setForm({ ...form, patientName: e.target.value })}
          />

          <TextField
            fullWidth
            size="small"
            label="Attending Doctor *"
            value={form.doctorName}
            onChange={(e) => setForm({ ...form, doctorName: e.target.value })}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => onSubmit(form)}
          disabled={isSubmitting || !form.hospitalId || !form.bloodGroupId || !form.patientName || !form.doctorName}
          sx={{
            background: "linear-gradient(135deg, #E53935 0%, #C62828 100%)",
          }}
        >
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ─── Approve Dialog ──────────────────────────────────────
function ApproveRequestDialog({
  open,
  item,
  onClose,
  onSubmit,
  isSubmitting,
}: {
  open: boolean;
  item: BloodRequest | null;
  onClose: () => void;
  onSubmit: (approvedUnits: number, remarks: string) => void;
  isSubmitting: boolean;
}) {
  const [units, setUnits] = useState(1);
  const [remarks, setRemarks] = useState("");

  useMemo(() => {
    if (item) {
      setUnits(item.unitsRequested);
      setRemarks("");
    }
  }, [item, open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>Approve Request</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Request: <strong>{item?.requestNumber}</strong>
            <br />
            Requested: <strong>{item?.unitsRequested} Units ({item?.bloodGroupName})</strong>
          </Typography>

          <TextField
            fullWidth
            size="small"
            label="Approved quantity"
            type="number"
            value={units}
            onChange={(e) => setUnits(parseInt(e.target.value) || 0)}
          />

          <TextField
            fullWidth
            size="small"
            label="Remarks / Audit notes *"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            multiline
            rows={2}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => onSubmit(units, remarks)}
          disabled={isSubmitting || !remarks.trim()}
        >
          {isSubmitting ? "Approving..." : "Approve & Reserve"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ─── Reject Dialog ───────────────────────────────────────
function RejectRequestDialog({
  open,
  item,
  onClose,
  onSubmit,
  isSubmitting,
}: {
  open: boolean;
  item: BloodRequest | null;
  onClose: () => void;
  onSubmit: (remarks: string) => void;
  isSubmitting: boolean;
}) {
  const [remarks, setRemarks] = useState("");

  useMemo(() => {
    if (item) {
      setRemarks("");
    }
  }, [item, open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>Reject Request</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Are you sure you want to reject request <strong>{item?.requestNumber}</strong>?
          </Typography>

          <TextField
            fullWidth
            size="small"
            label="Rejection Reason *"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            multiline
            rows={3}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => onSubmit(remarks)}
          disabled={isSubmitting || !remarks.trim()}
        >
          {isSubmitting ? "Rejecting..." : "Reject"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ─── Issue Dialog ────────────────────────────────────────
function IssueRequestDialog({
  open,
  item,
  onClose,
  onSubmit,
  isSubmitting,
}: {
  open: boolean;
  item: BloodRequest | null;
  onClose: () => void;
  onSubmit: (remarks: string) => void;
  isSubmitting: boolean;
}) {
  const [remarks, setRemarks] = useState("");

  useMemo(() => {
    if (item) {
      setRemarks("");
    }
  }, [item, open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>Dispatch & Issue Blood Units</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Dispatching <strong>{item?.unitsApproved} Units ({item?.bloodGroupName})</strong> to{" "}
            <strong>{item?.hospitalName}</strong>.
            <br />
            This will deduct the units permanently from reserved stock.
          </Typography>

          <TextField
            fullWidth
            size="small"
            label="Remarks / Dispatch notes *"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            multiline
            rows={2}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onSubmit(remarks)}
          disabled={isSubmitting || !remarks.trim()}
        >
          {isSubmitting ? "Dispatching..." : "Confirm Issue"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ─── Status Logs Drawer ──────────────────────────────────
interface WorkflowStatusLog {
  id: string;
  status: string;
  updatedBy: string;
  remarks: string;
  updatedAt: string;
}

function WorkflowStatusDrawer({
  item,
  onClose,
}: {
  item: BloodRequest | null;
  onClose: () => void;
}) {
  const { data: statusHistory, isLoading } = useWorkflowStatus(item?.id || "");

  // Fallback logs parsing if workflowstatus structure is an array
  const logs: WorkflowStatusLog[] = useMemo(() => {
    if (!statusHistory) return [];
    if (Array.isArray(statusHistory)) return statusHistory;
    if (statusHistory.history) return statusHistory.history;
    return [];
  }, [statusHistory]);

  return (
    <Drawer
      anchor="right"
      open={!!item}
      onClose={onClose}
      slotProps={{ paper: { sx: { width: { xs: "100%", sm: 400 } } } }}
    >
      <Box sx={{ p: 3 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Request Workflow Logs
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Request Number: <strong>{item?.requestNumber}</strong>
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {isLoading ? (
          <Typography color="text.secondary">Loading workflow history...</Typography>
        ) : logs.length === 0 ? (
          <Typography color="text.secondary" sx={{ textAlign: "center", py: 4 }}>
            No history logs recorded for this request.
          </Typography>
        ) : (
          <Stack spacing={2}>
            {logs.map((log, index) => (
              <Card key={log.id || index} variant="outlined" sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                  <Stack direction="row" sx={{ justifyContent: "space-between", mb: 1 }}>
                    <Chip
                      label={log.status}
                      size="small"
                      color={
                        log.status === "Issued"
                          ? "success"
                          : log.status === "Approved"
                            ? "info"
                            : log.status === "Rejected"
                              ? "error"
                              : "warning"
                      }
                      sx={{ fontWeight: 700, fontSize: 10 }}
                    />
                    <Typography color="text.secondary" sx={{ fontSize: 11 }}>
                      {new Date(log.updatedAt).toLocaleString("en-IN")}
                    </Typography>
                  </Stack>

                  <Typography color="text.secondary" sx={{ fontSize: 12, mb: 0.5 }}>
                    Action by: <strong>{log.updatedBy || "System Admin"}</strong>
                  </Typography>

                  {log.remarks && (
                    <Typography
                      sx={{
                        fontSize: 12,
                        p: 1,
                        bgcolor: "#F8FAFC",
                        borderRadius: 2,
                        color: "text.secondary",
                        fontStyle: "italic",
                      }}
                    >
                      "{log.remarks}"
                    </Typography>
                  )}
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Box>
    </Drawer>
  );
}