import { useState, useMemo, useCallback } from "react";
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
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import {
  Search,
  Add,
  Edit,
  Visibility,
  LocalShipping,
  CheckCircle,
  Close,
  Bloodtype,
  Person,
  Schedule,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import {
  useBloodIssuesPaged,
  useCreateBloodIssue,
  useUpdateBloodIssue,
} from "../../hooks/useBloodIssue";
import type { BloodIssue, CreateBloodIssue, UpdateBloodIssue } from "../../types/bloodissue";
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
          <Stack direction="row" alignItems="center" spacing={2}>
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
                fontWeight={500}
              >
                {title}
              </Typography>
              <Typography variant="h5" fontWeight={700}>
                {value}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Main Page ───────────────────────────────────────────
export default function BloodIssuePage() {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingIssue, setEditingIssue] = useState<BloodIssue | null>(null);
  const [profileIssue, setProfileIssue] = useState<BloodIssue | null>(null);

  const { data, isLoading, error } = useBloodIssuesPaged(
    paginationModel.page + 1,
    paginationModel.pageSize,
    search || undefined
  );

  const createMutation = useCreateBloodIssue();
  const updateMutation = useUpdateBloodIssue();

  const issues = data?.data ?? [];
  const totalRecords = data?.totalRecords ?? 0;

  // Stats Calculations
  const stats = useMemo(() => {
    const totalIssued = issues.reduce((acc, curr) => acc + curr.totalUnitsIssued, 0);
    const completedCount = issues.filter((i) => i.status === "Completed").length;
    const pendingCount = issues.filter((i) => i.status === "Pending").length;
    return { totalIssued, completedCount, pendingCount };
  }, [issues]);

  const handleCreate = useCallback(() => {
    setEditingIssue(null);
    setFormOpen(true);
  }, []);

  const handleEdit = useCallback((issue: BloodIssue) => {
    setEditingIssue(issue);
    setFormOpen(true);
  }, []);

  const handleFormSubmit = useCallback(
    async (formData: CreateBloodIssue | UpdateBloodIssue) => {
      try {
        if (editingIssue) {
          await updateMutation.mutateAsync({
            id: editingIssue.id,
            data: formData as UpdateBloodIssue,
          });
          toast.success("Issue details updated successfully!");
        } else {
          await createMutation.mutateAsync(formData as CreateBloodIssue);
          toast.success("Dispatch details logged successfully!");
        }
        setFormOpen(false);
        setEditingIssue(null);
      } catch {
        toast.error("Operation failed. Verify quantity bounds.");
      }
    },
    [editingIssue, updateMutation, createMutation]
  );

  // Columns for DataGrid
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "issueNumber",
        headerName: "Issue Number",
        width: 140,
        renderCell: (params) => (
          <Typography fontWeight={700} color="primary" fontSize={13}>
            {params.value}
          </Typography>
        ),
      },
      {
        field: "requestNumber",
        headerName: "Req Number",
        width: 130,
        renderCell: (params) => (
          <Typography fontWeight={600} color="text.secondary" fontSize={13}>
            {params.value || "—"}
          </Typography>
        ),
      },
      {
        field: "hospitalName",
        headerName: "Hospital",
        width: 180,
      },
      {
        field: "bloodGroupName",
        headerName: "Group",
        width: 100,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => (
          <Chip
            label={params.value || "—"}
            size="small"
            sx={{ fontWeight: 800, bgcolor: "#E53935", color: "#fff" }}
          />
        ),
      },
      {
        field: "totalUnitsIssued",
        headerName: "Units Issued",
        width: 120,
        align: "center",
      },
      {
        field: "issueDate",
        headerName: "Dispatch Date",
        width: 130,
        valueFormatter: (value) => new Date(value).toLocaleDateString("en-IN"),
      },
      {
        field: "status",
        headerName: "Status",
        width: 120,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => {
          const s = params.value;
          const color = s === "Completed" ? "success" : s === "Pending" ? "warning" : "default";
          return <Chip label={s} size="small" color={color} sx={{ fontWeight: 700 }} />;
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 120,
        sortable: false,
        renderCell: (params) => (
          <Stack direction="row" spacing={0.5}>
            <Tooltip title="View Dispatch Slip">
              <IconButton
                size="small"
                color="primary"
                onClick={() => setProfileIssue(params.row)}
              >
                <Visibility fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit Log">
              <IconButton
                size="small"
                color="info"
                onClick={() => handleEdit(params.row)}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        ),
      },
    ],
    [handleEdit]
  );

  if (isLoading) return <LoadingScreen />;

  if (error)
    return (
      <Alert severity="error" sx={{ m: 4 }}>
        Failed to load blood issues records. Verify connection.
      </Alert>
    );

  return (
    <Stack spacing={3}>
      {/* Header */}
      <Box>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Blood Dispatches (Issues)
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track and log permanent dispatches, shipments, and receiver handovers for approved requests.
        </Typography>
      </Box>

      {/* Metrics */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <StatCard
          title="Total Dispatched Units"
          value={stats.totalIssued}
          icon={<LocalShipping />}
          color="#1976D2"
        />
        <StatCard
          title="Completed Dispatches"
          value={stats.completedCount}
          icon={<CheckCircle />}
          color="#43A047"
        />
        <StatCard
          title="Pending Dispatches"
          value={stats.pendingCount}
          icon={<Schedule />}
          color="#FB8C00"
        />
      </Stack>

      {/* Toolbar */}
      <Card>
        <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems={{ sm: "center" }}
            justifyContent="space-between"
          >
            <TextField
              size="small"
              placeholder="Search issue ID, request ID, receiver or hospital..."
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
              onClick={handleCreate}
              sx={{
                background: "linear-gradient(135deg, #E53935 0%, #C62828 100%)",
                "&:hover": {
                  background: "linear-gradient(135deg, #C62828 0%, #B71C1C 100%)",
                },
              }}
            >
              Log Dispatch
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Grid */}
      <Card>
        <DataGrid
          rows={issues}
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

      {/* Form Dialog */}
      <BloodIssueFormDialog
        open={formOpen}
        issue={editingIssue}
        onClose={() => {
          setFormOpen(false);
          setEditingIssue(null);
        }}
        onSubmit={handleFormSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />

      {/* Details drawer */}
      <BloodIssueProfileDrawer
        issue={profileIssue}
        onClose={() => setProfileIssue(null)}
      />
    </Stack>
  );
}

// ─── Form Dialog ─────────────────────────────────────────
function BloodIssueFormDialog({
  open,
  issue,
  onClose,
  onSubmit,
  isSubmitting,
}: {
  open: boolean;
  issue: BloodIssue | null;
  onClose: () => void;
  onSubmit: (data: CreateBloodIssue | UpdateBloodIssue) => void;
  isSubmitting: boolean;
}) {
  const isEdit = !!issue;
  const [requests, setRequests] = useState<any[]>([]);

  const [form, setForm] = useState({
    bloodRequestId: "",
    hospitalId: "",
    issueNumber: "",
    issueDate: "",
    totalUnitsIssued: 1,
    issuedBy: "",
    receivedBy: "",
    status: "Completed",
    remarks: "",
  });

  useMemo(() => {
    if (open && !isEdit) {
      // Fetch approved/pending requests that can be dispatched
      api.get("/BloodRequests").then((res) => {
        const approved = (res.data.data || []).filter(
          (r: any) => r.status === "Approved" || r.status === "Pending"
        );
        setRequests(approved);
      });
    }
  }, [open, isEdit]);

  useMemo(() => {
    if (issue) {
      setForm({
        bloodRequestId: issue.bloodRequestId,
        hospitalId: issue.hospitalId,
        issueNumber: issue.issueNumber,
        issueDate: issue.issueDate ? issue.issueDate.substring(0, 10) : "",
        totalUnitsIssued: issue.totalUnitsIssued,
        issuedBy: issue.issuedBy,
        receivedBy: issue.receivedBy,
        status: issue.status,
        remarks: issue.remarks || "",
      });
    } else {
      setForm({
        bloodRequestId: "",
        hospitalId: "",
        issueNumber: `ISU${Date.now().toString().slice(-6)}`,
        issueDate: new Date().toISOString().substring(0, 10),
        totalUnitsIssued: 1,
        issuedBy: "Admin Officer",
        receivedBy: "",
        status: "Completed",
        remarks: "",
      });
    }
  }, [issue, open]);

  const handleRequestChange = (reqId: string) => {
    const selected = requests.find((r) => r.id === reqId);
    if (selected) {
      setForm((prev) => ({
        ...prev,
        bloodRequestId: reqId,
        hospitalId: selected.hospitalId,
        totalUnitsIssued: selected.unitsApproved || selected.unitsRequested,
      }));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>
        {isEdit ? `Edit Dispatch slip ${issue.issueNumber}` : "Log Blood Units Dispatch"}
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {!isEdit && (
            <FormControl fullWidth size="small">
              <InputLabel>Approved Blood Request *</InputLabel>
              <Select
                value={form.bloodRequestId}
                label="Approved Blood Request *"
                onChange={(e) => handleRequestChange(e.target.value)}
              >
                {requests.map((r) => (
                  <MenuItem key={r.id} value={r.id}>
                    {r.requestNumber} — {r.hospitalName} ({r.unitsRequested} Units, {r.bloodGroupName})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="Issue Date *"
                type="date"
                value={form.issueDate}
                onChange={(e) => setForm({ ...form, issueDate: e.target.value })}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="Total Units Dispatched *"
                type="number"
                value={form.totalUnitsIssued}
                onChange={(e) =>
                  setForm({ ...form, totalUnitsIssued: parseInt(e.target.value) || 0 })
                }
              />
            </Grid>
          </Grid>

          <TextField
            fullWidth
            size="small"
            label="Issued By (Staff Officer) *"
            value={form.issuedBy}
            onChange={(e) => setForm({ ...form, issuedBy: e.target.value })}
          />

          <TextField
            fullWidth
            size="small"
            label="Received By (Hospital Agent) *"
            value={form.receivedBy}
            onChange={(e) => setForm({ ...form, receivedBy: e.target.value })}
          />

          <FormControl fullWidth size="small">
            <InputLabel>Status</InputLabel>
            <Select
              value={form.status}
              label="Status"
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            size="small"
            label="Dispatch remarks"
            value={form.remarks}
            onChange={(e) => setForm({ ...form, remarks: e.target.value })}
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
          onClick={() => onSubmit(form)}
          disabled={isSubmitting || !form.issuedBy || !form.receivedBy || !form.bloodRequestId}
          sx={{
            background: "linear-gradient(135deg, #E53935 0%, #C62828 100%)",
          }}
        >
          {isSubmitting ? "Logging..." : isEdit ? "Update Log" : "Confirm Dispatch"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ─── Details View Drawer ─────────────────────────────────
function BloodIssueProfileDrawer({
  issue,
  onClose,
}: {
  issue: BloodIssue | null;
  onClose: () => void;
}) {
  if (!issue) return null;

  const fields = [
    { label: "Dispatch ID", value: issue.issueNumber },
    { label: "Blood Request #", value: issue.requestNumber },
    { label: "Hospital", value: issue.hospitalName },
    { label: "Blood Group", value: issue.bloodGroupName || "—" },
    { label: "Units Issued", value: `${issue.totalUnitsIssued} Units` },
    { label: "Dispatch Date", value: new Date(issue.issueDate).toLocaleDateString("en-IN") },
    { label: "Issued By (Staff)", value: issue.issuedBy },
    { label: "Received By (Receiver)", value: issue.receivedBy },
    { label: "Delivery Status", value: issue.status },
    { label: "Remarks", value: issue.remarks || "No additional comments" },
  ];

  return (
    <Drawer
      anchor="right"
      open={!!issue}
      onClose={onClose}
      PaperProps={{ sx: { width: { xs: "100%", sm: 420 } } }}
    >
      <Box sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight={700}>
            Dispatch Slip details
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Stack>

        <Card
          sx={{
            mb: 3,
            background: "linear-gradient(135deg, #1976D2 0%, #1565C0 100%)",
            color: "#fff",
          }}
        >
          <CardContent>
            <Stack alignItems="center" spacing={1}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  bgcolor: "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LocalShipping sx={{ fontSize: 28 }} />
              </Box>
              <Typography variant="h6" fontWeight={700}>
                {issue.issueNumber}
              </Typography>
              <Chip
                label={issue.status}
                sx={{
                  bgcolor: issue.status === "Completed" ? "rgba(76,175,80,0.35)" : "rgba(255,255,255,0.2)",
                  color: "#fff",
                  fontWeight: 700,
                }}
              />
            </Stack>
          </CardContent>
        </Card>

        <Stack spacing={2}>
          {fields.map((f, i) => (
            <Box key={i}>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={600}
                textTransform="uppercase"
                letterSpacing={0.5}
              >
                {f.label}
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                {f.value}
              </Typography>
              {i < fields.length - 1 && <Divider sx={{ mt: 1 }} />}
            </Box>
          ))}
        </Stack>
      </Box>
    </Drawer>
  );
}