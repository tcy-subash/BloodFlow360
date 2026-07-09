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
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import {
  Search,
  Add,
  Edit,
  Delete,
  Visibility,
  Groups,
  CheckCircle,
  Cancel,
  Close,
  Bloodtype,
  PersonAdd,
  TrendingUp,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "../../api/axios";

import {
  useDonorsPaged,
  useCreateDonor,
  useUpdateDonor,
  useDeleteDonor,
} from "../../hooks/useDonors";
import type { Donor, CreateDonor, UpdateDonor } from "../../types/donor";
import { BLOOD_GROUPS, GENDERS } from "../../types/donor";
import LoadingScreen from "../../design-system/feedback/LoadingScreen";

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
    >
      <Card
        sx={{
          background: `linear-gradient(135deg, ${color}15 0%, ${color}08 100%)`,
          border: `1px solid ${color}25`,
        }}
      >
        <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
          <Stack direction="row" sx={{ alignItems: "center" }} spacing={2}>
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
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
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
export default function DonorsPage() {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [search, setSearch] = useState("");
  const [bloodGroupFilter, setBloodGroupFilter] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingDonor, setEditingDonor] = useState<Donor | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Donor | null>(null);
  const [profileDonor, setProfileDonor] = useState<Donor | null>(null);

  const location = useLocation();
  useEffect(() => {
    if (location.state?.openForm) {
      setFormOpen(true);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const { data, isLoading, error } = useDonorsPaged(
    paginationModel.page + 1,
    paginationModel.pageSize,
    search || undefined,
    bloodGroupFilter || undefined
  );

  const createMutation = useCreateDonor();
  const updateMutation = useUpdateDonor();
  const deleteMutation = useDeleteDonor();

  const donors = data?.data ?? [];
  const totalRecords = data?.totalRecords ?? 0;

  // Stats
  const stats = useMemo(() => {
    const total = totalRecords;
    const eligible = donors.filter((d) => d.isEligible).length;
    const active = donors.filter((d) => d.isActive).length;
    return { total, eligible, active };
  }, [donors, totalRecords]);

  // Handlers
  const handleCreate = useCallback(() => {
    setEditingDonor(null);
    setFormOpen(true);
  }, []);

  const handleEdit = useCallback((donor: Donor) => {
    setEditingDonor(donor);
    setFormOpen(true);
  }, []);

  const handleFormSubmit = useCallback(
    async (formData: CreateDonor | UpdateDonor) => {
      try {
        if (editingDonor) {
          await updateMutation.mutateAsync({
            id: editingDonor.id,
            data: formData as UpdateDonor,
          });
          toast.success("Donor updated successfully!");
        } else {
          await createMutation.mutateAsync(formData as CreateDonor);
          toast.success("Donor created successfully!");
        }
        setFormOpen(false);
        setEditingDonor(null);
      } catch {
        toast.error("Operation failed. Please try again.");
      }
    },
    [editingDonor, updateMutation, createMutation]
  );

  const handleDelete = useCallback(async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success("Donor deleted successfully!");
      setDeleteTarget(null);
    } catch {
      toast.error("Delete failed. Please try again.");
    }
  }, [deleteTarget, deleteMutation]);

  // Columns
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "donorNumber",
        headerName: "Donor #",
        width: 130,
        renderCell: (params) => (
          <Typography color="primary" sx={{ fontWeight: 600, fontSize: 13 }}>
            {params.value}
          </Typography>
        ),
      },
      {
        field: "name",
        headerName: "Name",
        width: 180,
        valueGetter: (_value, row) =>
          `${row.firstName} ${row.lastName}`,
      },
      {
        field: "bloodGroup",
        headerName: "Blood Group",
        width: 120,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => (
          <Chip
            label={params.value}
            size="small"
            sx={{
              fontWeight: 700,
              bgcolor: "#E53935",
              color: "#fff",
              fontSize: 12,
            }}
            icon={<Bloodtype sx={{ fontSize: 16, color: "#fff !important" }} />}
          />
        ),
      },
      {
        field: "gender",
        headerName: "Gender",
        width: 100,
      },
      {
        field: "lastDonationDate",
        headerName: "Last Donation",
        width: 140,
        valueFormatter: (value) => {
          if (!value) return "Never";
          return new Date(value).toLocaleDateString("en-IN");
        },
      },
      {
        field: "isEligible",
        headerName: "Eligibility",
        width: 120,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => (
          <Chip
            label={params.value ? "Eligible" : "Ineligible"}
            size="small"
            color={params.value ? "success" : "default"}
            variant={params.value ? "filled" : "outlined"}
            sx={{ fontWeight: 600, fontSize: 11 }}
          />
        ),
      },
      {
        field: "isActive",
        headerName: "Status",
        width: 110,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => (
          <Chip
            label={params.value ? "Active" : "Inactive"}
            size="small"
            color={params.value ? "info" : "default"}
            variant={params.value ? "filled" : "outlined"}
            sx={{ fontWeight: 600, fontSize: 11 }}
          />
        ),
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 150,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <Stack direction="row" spacing={0.5}>
            <Tooltip title="View Profile">
              <IconButton
                size="small"
                color="primary"
                onClick={() => setProfileDonor(params.row)}
              >
                <Visibility fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton
                size="small"
                color="info"
                onClick={() => handleEdit(params.row)}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                size="small"
                color="error"
                onClick={() => setDeleteTarget(params.row)}
              >
                <Delete fontSize="small" />
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
        Failed to load donors. Please try again.
      </Alert>
    );

  return (
    <Stack spacing={3}>
      {/* Page Header */}
      <Box>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 800 }}>
          Donor Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Register, track, and manage blood donors across all blood banks.
        </Typography>
      </Box>

      {/* Stats */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard
            title="Total Donors"
            value={stats.total}
            icon={<Groups />}
            color="#1976D2"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard
            title="Eligible Donors"
            value={stats.eligible}
            icon={<CheckCircle />}
            color="#43A047"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard
            title="Active Donors"
            value={stats.active}
            icon={<TrendingUp />}
            color="#FB8C00"
          />
        </Grid>
      </Grid>

      {/* Toolbar */}
      <Card>
        <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ alignItems: { sm: "center" }, justifyContent: "space-between" }}
          >
            <Stack direction="row" spacing={2} sx={{ flex: 1 }}>
              <TextField
                size="small"
                placeholder="Search donors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ minWidth: 280 }}
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

              <FormControl size="small" sx={{ minWidth: 140 }}>
                <InputLabel>Blood Group</InputLabel>
                <Select
                  value={bloodGroupFilter}
                  label="Blood Group"
                  onChange={(e) => setBloodGroupFilter(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  {BLOOD_GROUPS.map((bg) => (
                    <MenuItem key={bg} value={bg}>
                      {bg}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleCreate}
              sx={{
                background:
                  "linear-gradient(135deg, #E53935 0%, #C62828 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #C62828 0%, #B71C1C 100%)",
                },
              }}
            >
              Add Donor
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* DataGrid */}
      <Card>
        <DataGrid
          rows={donors}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 25, 50]}
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
            "& .MuiDataGrid-row:hover": {
              bgcolor: "#F1F5F9",
            },
            "& .MuiDataGrid-cell": {
              display: "flex",
              alignItems: "center",
            },
          }}
        />
      </Card>

      {/* Create / Edit Dialog */}
      <DonorFormDialog
        open={formOpen}
        donor={editingDonor}
        onClose={() => {
          setFormOpen(false);
          setEditingDonor(null);
        }}
        onSubmit={handleFormSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />

      {/* Delete Confirmation */}
      <Dialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Delete Donor</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete donor{" "}
            <strong>
              {deleteTarget?.firstName} {deleteTarget?.lastName}
            </strong>{" "}
            ({deleteTarget?.donorNumber})? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Profile Drawer */}
      <DonorProfileDrawer
        donor={profileDonor}
        onClose={() => setProfileDonor(null)}
      />
    </Stack>
  );
}

// ─── Form Dialog ─────────────────────────────────────────
function DonorFormDialog({
  open,
  donor,
  onClose,
  onSubmit,
  isSubmitting,
}: {
  open: boolean;
  donor: Donor | null;
  onClose: () => void;
  onSubmit: (data: CreateDonor | UpdateDonor) => void;
  isSubmitting: boolean;
}) {
  const isEdit = !!donor;

  const [bloodBanks, setBloodBanks] = useState<{ id: string; name: string }[]>([]);
  const [users, setUsers] = useState<{ id: string; username: string; email: string }[]>([]);

  const [form, setForm] = useState<CreateDonor>({
    userId: "",
    bloodBankId: "",
    donorNumber: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    height: 0,
    weight: 0,
    aadhaarNumber: "",
    occupation: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    isEligible: true,
    isActive: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch blood banks and users on load
  useMemo(() => {
    if (open) {
      api.get("/BloodBanks").then((res) => setBloodBanks(res.data.data || []));
      api.get("/Users").then((res) => setUsers(res.data.data || []));
    }
  }, [open]);

  // Populate form when donor changes
  useMemo(() => {
    if (donor) {
      setForm({
        userId: donor.userId || "",
        bloodBankId: donor.bloodBankId || "",
        donorNumber: donor.donorNumber,
        firstName: donor.firstName,
        lastName: donor.lastName,
        dateOfBirth: donor.dateOfBirth || "",
        gender: donor.gender,
        bloodGroup: donor.bloodGroup,
        height: donor.height,
        weight: donor.weight,
        aadhaarNumber: donor.aadhaarNumber || "",
        occupation: donor.occupation || "",
        emergencyContactName: donor.emergencyContactName,
        emergencyContactNumber: donor.emergencyContactNumber,
        isEligible: donor.isEligible,
        isActive: donor.isActive,
      });
      setErrors({});
    } else {
      setForm({
        userId: "",
        bloodBankId: "",
        donorNumber: `DON${Date.now().toString().slice(-6)}`,
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        bloodGroup: "",
        height: 0,
        weight: 0,
        aadhaarNumber: "",
        occupation: "",
        emergencyContactName: "",
        emergencyContactNumber: "",
        isEligible: true,
        isActive: true,
      });
      setErrors({});
    }
  }, [donor, open]);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!isEdit && !form.userId) errs.userId = "User Account is required";
    if (!isEdit && !form.bloodBankId) errs.bloodBankId = "Blood Bank is required";
    if (!form.firstName.trim()) errs.firstName = "First name is required";
    if (!form.lastName.trim()) errs.lastName = "Last name is required";
    if (!form.bloodGroup) errs.bloodGroup = "Blood group is required";
    if (!form.gender) errs.gender = "Gender is required";
    if (!form.dateOfBirth) errs.dateOfBirth = "Date of birth is required";
    if (form.height <= 0) errs.height = "Height must be positive";
    if (form.weight <= 0) errs.weight = "Weight must be positive";
    if (!form.emergencyContactName.trim())
      errs.emergencyContactName = "Emergency contact name is required";
    if (!form.emergencyContactNumber.trim())
      errs.emergencyContactNumber = "Emergency contact number is required";
    else if (!/^\d{10}$/.test(form.emergencyContactNumber))
      errs.emergencyContactNumber = "Must be a 10-digit number";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit(form);
  };

  const updateField = (field: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 1 }}>
        <PersonAdd color="error" />
        {isEdit ? "Edit Donor" : "Register New Donor"}
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          {!isEdit && (
            <>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth size="small" error={!!errors.userId}>
                  <InputLabel>Associated User Account *</InputLabel>
                  <Select
                    value={form.userId}
                    label="Associated User Account *"
                    onChange={(e) => updateField("userId", e.target.value)}
                  >
                    {users.map((u) => (
                      <MenuItem key={u.id} value={u.id}>
                        {u.username} ({u.email})
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.userId && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5, display: "block" }}>
                      {errors.userId}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth size="small" error={!!errors.bloodBankId}>
                  <InputLabel>Associated Blood Bank *</InputLabel>
                  <Select
                    value={form.bloodBankId}
                    label="Associated Blood Bank *"
                    onChange={(e) => updateField("bloodBankId", e.target.value)}
                  >
                    {bloodBanks.map((b) => (
                      <MenuItem key={b.id} value={b.id}>
                        {b.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.bloodBankId && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5, display: "block" }}>
                      {errors.bloodBankId}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Donor Number"
                  value={form.donorNumber}
                  onChange={(e) => updateField("donorNumber", e.target.value)}
                />
              </Grid>
            </>
          )}

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              size="small"
              label="First Name *"
              value={form.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              size="small"
              label="Last Name *"
              value={form.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth size="small" error={!!errors.bloodGroup}>
              <InputLabel>Blood Group *</InputLabel>
              <Select
                value={form.bloodGroup}
                label="Blood Group *"
                onChange={(e) => updateField("bloodGroup", e.target.value)}
              >
                {BLOOD_GROUPS.map((bg) => (
                  <MenuItem key={bg} value={bg}>
                    {bg}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth size="small" error={!!errors.gender}>
              <InputLabel>Gender *</InputLabel>
              <Select
                value={form.gender}
                label="Gender *"
                onChange={(e) => updateField("gender", e.target.value)}
              >
                {GENDERS.map((g) => (
                  <MenuItem key={g} value={g}>
                    {g}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              size="small"
              label="Date of Birth *"
              type="date"
              value={form.dateOfBirth}
              onChange={(e) => updateField("dateOfBirth", e.target.value)}
              error={!!errors.dateOfBirth}
              helperText={errors.dateOfBirth}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              size="small"
              label="Height (cm) *"
              type="number"
              value={form.height || ""}
              onChange={(e) =>
                updateField("height", parseFloat(e.target.value) || 0)
              }
              error={!!errors.height}
              helperText={errors.height}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              size="small"
              label="Weight (kg) *"
              type="number"
              value={form.weight || ""}
              onChange={(e) =>
                updateField("weight", parseFloat(e.target.value) || 0)
              }
              error={!!errors.weight}
              helperText={errors.weight}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              size="small"
              label="Aadhaar Number"
              value={form.aadhaarNumber}
              onChange={(e) => updateField("aadhaarNumber", e.target.value)}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              size="small"
              label="Occupation"
              value={form.occupation}
              onChange={(e) => updateField("occupation", e.target.value)}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              size="small"
              label="Emergency Contact Name *"
              value={form.emergencyContactName}
              onChange={(e) =>
                updateField("emergencyContactName", e.target.value)
              }
              error={!!errors.emergencyContactName}
              helperText={errors.emergencyContactName}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              size="small"
              label="Emergency Contact Number *"
              value={form.emergencyContactNumber}
              onChange={(e) =>
                updateField("emergencyContactNumber", e.target.value)
              }
              error={!!errors.emergencyContactNumber}
              helperText={errors.emergencyContactNumber}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isSubmitting}
          sx={{
            background: "linear-gradient(135deg, #E53935 0%, #C62828 100%)",
          }}
        >
          {isSubmitting
            ? "Saving..."
            : isEdit
              ? "Update Donor"
              : "Register Donor"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ─── Profile Drawer ──────────────────────────────────────
function DonorProfileDrawer({
  donor,
  onClose,
}: {
  donor: Donor | null;
  onClose: () => void;
}) {
  if (!donor) return null;

  const fields = [
    { label: "Donor Number", value: donor.donorNumber },
    { label: "Full Name", value: `${donor.firstName} ${donor.lastName}` },
    { label: "Blood Group", value: donor.bloodGroup },
    { label: "Gender", value: donor.gender },
    {
      label: "Date of Birth",
      value: donor.dateOfBirth
        ? new Date(donor.dateOfBirth).toLocaleDateString("en-IN")
        : "—",
    },
    { label: "Height", value: `${donor.height} cm` },
    { label: "Weight", value: `${donor.weight} kg` },
    { label: "Aadhaar", value: donor.aadhaarNumber || "—" },
    { label: "Occupation", value: donor.occupation || "—" },
    { label: "Emergency Contact", value: donor.emergencyContactName },
    { label: "Emergency Phone", value: donor.emergencyContactNumber },
    {
      label: "Last Donation",
      value: donor.lastDonationDate
        ? new Date(donor.lastDonationDate).toLocaleDateString("en-IN")
        : "Never",
    },
    {
      label: "Registered On",
      value: new Date(donor.createdAt).toLocaleDateString("en-IN"),
    },
  ];

  return (
    <Drawer
      anchor="right"
      open={!!donor}
      onClose={onClose}
      slotProps={{ paper: { sx: { width: { xs: "100%", sm: 420 } } } }}
    >
      <Box sx={{ p: 3 }}>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center", mb: 3 }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Donor Profile
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Stack>

        {/* Header Card */}
        <Card
          sx={{
            mb: 3,
            background: "linear-gradient(135deg, #E53935 0%, #C62828 100%)",
            color: "#fff",
          }}
        >
          <CardContent>
            <Stack sx={{ alignItems: "center" }} spacing={1}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  bgcolor: "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Bloodtype sx={{ fontSize: 32 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {donor.firstName} {donor.lastName}
              </Typography>
              <Chip
                label={donor.bloodGroup}
                sx={{
                  bgcolor: "rgba(255,255,255,0.25)",
                  color: "#fff",
                  fontWeight: 700,
                }}
              />
              <Stack direction="row" spacing={1}>
                <Chip
                  size="small"
                  label={donor.isEligible ? "Eligible" : "Ineligible"}
                  icon={
                    donor.isEligible ? (
                      <CheckCircle sx={{ color: "#fff !important" }} />
                    ) : (
                      <Cancel sx={{ color: "#fff !important" }} />
                    )
                  }
                  sx={{
                    bgcolor: donor.isEligible
                      ? "rgba(76,175,80,0.4)"
                      : "rgba(255,255,255,0.2)",
                    color: "#fff",
                    fontWeight: 600,
                  }}
                />
                <Chip
                  size="small"
                  label={donor.isActive ? "Active" : "Inactive"}
                  sx={{
                    bgcolor: donor.isActive
                      ? "rgba(33,150,243,0.4)"
                      : "rgba(255,255,255,0.2)",
                    color: "#fff",
                    fontWeight: 600,
                  }}
                />
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        {/* Detail Fields */}
        <Stack spacing={2}>
          {fields.map((f, i) => (
            <Box key={i}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                {f.label}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
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