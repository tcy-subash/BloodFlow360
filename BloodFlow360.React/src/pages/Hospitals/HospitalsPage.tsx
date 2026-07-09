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
  LocalHospital,
  ContactPhone,
  Close,
  CheckCircle,
  Place,
  Assignment,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import {
  useHospitalsPaged,
  useCreateHospital,
  useUpdateHospital,
  useDeleteHospital,
} from "../../hooks/useHospitals";
import type { Hospital, CreateHospital, UpdateHospital } from "../../types/hospital";
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
export default function HospitalsPage() {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingHospital, setEditingHospital] = useState<Hospital | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Hospital | null>(null);
  const [profileHospital, setProfileHospital] = useState<Hospital | null>(null);

  const location = useLocation();
  useEffect(() => {
    if (location.state?.openForm) {
      setFormOpen(true);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const { data, isLoading, error } = useHospitalsPaged(
    paginationModel.page + 1,
    paginationModel.pageSize,
    search || undefined
  );

  const createMutation = useCreateHospital();
  const updateMutation = useUpdateHospital();
  const deleteMutation = useDeleteHospital();

  const hospitals = data?.data ?? [];
  const totalRecords = data?.totalRecords ?? 0;

  // Stats Calculations
  const stats = useMemo(() => {
    const total = totalRecords;
    const active = hospitals.filter((h) => h.isActive).length;
    const citiesCount = new Set(hospitals.map((h) => h.city)).size;
    return { total, active, citiesCount };
  }, [hospitals, totalRecords]);

  const handleCreate = useCallback(() => {
    setEditingHospital(null);
    setFormOpen(true);
  }, []);

  const handleEdit = useCallback((hospital: Hospital) => {
    setEditingHospital(hospital);
    setFormOpen(true);
  }, []);

  const handleFormSubmit = useCallback(
    async (formData: CreateHospital | UpdateHospital) => {
      try {
        if (editingHospital) {
          await updateMutation.mutateAsync({
            id: editingHospital.id,
            data: formData as UpdateHospital,
          });
          toast.success("Hospital details updated successfully!");
        } else {
          await createMutation.mutateAsync(formData as CreateHospital);
          toast.success("Hospital registered successfully!");
        }
        setFormOpen(false);
        setEditingHospital(null);
      } catch {
        toast.error("Operation failed. Try again.");
      }
    },
    [editingHospital, updateMutation, createMutation]
  );

  const handleDelete = useCallback(async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success("Hospital deleted successfully!");
      setDeleteTarget(null);
    } catch {
      toast.error("Delete failed.");
    }
  }, [deleteTarget, deleteMutation]);

  // DataGrid Columns
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "code",
        headerName: "Hospital Code",
        width: 130,
        renderCell: (params) => (
          <Typography fontWeight={700} color="primary" fontSize={13}>
            {params.value}
          </Typography>
        ),
      },
      {
        field: "name",
        headerName: "Hospital Name",
        width: 200,
        renderCell: (params) => (
          <Typography fontWeight={500} fontSize={13}>
            {params.value}
          </Typography>
        ),
      },
      {
        field: "registrationNumber",
        headerName: "Reg Number",
        width: 140,
      },
      {
        field: "contactPerson",
        headerName: "Contact Person",
        width: 150,
      },
      {
        field: "phoneNumber",
        headerName: "Contact Phone",
        width: 140,
      },
      {
        field: "city",
        headerName: "City / State",
        width: 150,
        valueGetter: (_val, row) => `${row.city}, ${row.state}`,
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
            color={params.value ? "success" : "default"}
            variant={params.value ? "filled" : "outlined"}
            sx={{ fontWeight: 700, fontSize: 11 }}
          />
        ),
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 150,
        sortable: false,
        renderCell: (params) => (
          <Stack direction="row" spacing={0.5}>
            <Tooltip title="View Profile">
              <IconButton
                size="small"
                color="primary"
                onClick={() => setProfileHospital(params.row)}
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
        Failed to load hospitals. Verify backend connection.
      </Alert>
    );

  return (
    <Stack spacing={3}>
      {/* Header */}
      <Box>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Hospital Directory
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Register and manage affiliated hospital details, contact channels, and geographical coverage.
        </Typography>
      </Box>

      {/* Stats */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <StatCard
          title="Total Affiliated"
          value={stats.total}
          icon={<LocalHospital />}
          color="#1976D2"
        />
        <StatCard
          title="Active Locations"
          value={stats.active}
          icon={<CheckCircle />}
          color="#43A047"
        />
        <StatCard
          title="Covered Cities"
          value={stats.citiesCount}
          icon={<Place />}
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
              placeholder="Search by name, code, contact or city..."
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
              Add Hospital
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Grid */}
      <Card>
        <DataGrid
          rows={hospitals}
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

      {/* Forms dialog */}
      <HospitalFormDialog
        open={formOpen}
        hospital={editingHospital}
        onClose={() => {
          setFormOpen(false);
          setEditingHospital(null);
        }}
        onSubmit={handleFormSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />

      {/* Delete confirm */}
      <Dialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Unregister Hospital</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to unregister hospital{" "}
            <strong>{deleteTarget?.name}</strong> ({deleteTarget?.code})?
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
            {deleteMutation.isPending ? "Unregistering..." : "Unregister"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Details drawer */}
      <HospitalProfileDrawer
        hospital={profileHospital}
        onClose={() => setProfileHospital(null)}
      />
    </Stack>
  );
}

// ─── Form Dialog ─────────────────────────────────────────
function HospitalFormDialog({
  open,
  hospital,
  onClose,
  onSubmit,
  isSubmitting,
}: {
  open: boolean;
  hospital: Hospital | null;
  onClose: () => void;
  onSubmit: (data: CreateHospital | UpdateHospital) => void;
  isSubmitting: boolean;
}) {
  const isEdit = !!hospital;
  const [bloodBanks, setBloodBanks] = useState<{ id: string; name: string }[]>([]);

  const [form, setForm] = useState({
    bloodBankId: "",
    code: "",
    name: "",
    registrationNumber: "",
    email: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    district: "",
    state: "",
    country: "India",
    postalCode: "",
    contactPerson: "",
    isActive: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useMemo(() => {
    if (open && !isEdit) {
      api.get("/BloodBanks").then((res) => setBloodBanks(res.data.data || []));
    }
  }, [open, isEdit]);

  useMemo(() => {
    if (hospital) {
      setForm({
        bloodBankId: hospital.bloodBankId,
        code: hospital.code,
        name: hospital.name,
        registrationNumber: hospital.registrationNumber,
        email: hospital.email,
        phoneNumber: hospital.phoneNumber,
        addressLine1: hospital.addressLine1,
        addressLine2: hospital.addressLine2,
        city: hospital.city,
        district: hospital.district,
        state: hospital.state,
        country: hospital.country,
        postalCode: hospital.postalCode,
        contactPerson: hospital.contactPerson,
        isActive: hospital.isActive,
      });
      setErrors({});
    } else {
      setForm({
        bloodBankId: "",
        code: `HSP${Date.now().toString().slice(-5)}`,
        name: "",
        registrationNumber: "",
        email: "",
        phoneNumber: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        district: "",
        state: "",
        country: "India",
        postalCode: "",
        contactPerson: "",
        isActive: true,
      });
      setErrors({});
    }
  }, [hospital, open]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Hospital name is required";
    if (!form.code.trim()) errs.code = "Code is required";
    if (!form.registrationNumber.trim()) errs.registrationNumber = "Reg number is required";
    if (!form.email.trim()) errs.email = "Email is required";
    if (!form.phoneNumber.trim()) errs.phoneNumber = "Phone is required";
    if (!form.addressLine1.trim()) errs.addressLine1 = "Address is required";
    if (!form.city.trim()) errs.city = "City is required";
    if (!form.state.trim()) errs.state = "State is required";
    if (!form.postalCode.trim()) errs.postalCode = "Postal code is required";
    if (!form.contactPerson.trim()) errs.contactPerson = "Contact person is required";
    if (!isEdit && !form.bloodBankId) errs.bloodBankId = "Blood Bank association is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit(form);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>
        {isEdit ? "Edit Hospital Profile" : "Register Hospital"}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          {!isEdit && (
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth size="small" error={!!errors.bloodBankId}>
                <InputLabel>Associated Blood Bank *</InputLabel>
                <Select
                  value={form.bloodBankId}
                  label="Associated Blood Bank *"
                  onChange={(e) => setForm({ ...form, bloodBankId: e.target.value })}
                >
                  {bloodBanks.map((b) => (
                    <MenuItem key={b.id} value={b.id}>
                      {b.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              size="small"
              label="Hospital Name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              size="small"
              label="Registration Number *"
              value={form.registrationNumber}
              onChange={(e) => setForm({ ...form, registrationNumber: e.target.value })}
              error={!!errors.registrationNumber}
              helperText={errors.registrationNumber}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              size="small"
              label="Hospital Code *"
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
              error={!!errors.code}
              helperText={errors.code}
              disabled={isEdit}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              size="small"
              label="Contact Person Name *"
              value={form.contactPerson}
              onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
              error={!!errors.contactPerson}
              helperText={errors.contactPerson}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              size="small"
              label="Official Email Address *"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              size="small"
              label="Contact Phone *"
              value={form.phoneNumber}
              onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle2" fontWeight={700} color="text.secondary" mb={1}>
              Location & Address Info
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              size="small"
              label="Address Line 1 *"
              value={form.addressLine1}
              onChange={(e) => setForm({ ...form, addressLine1: e.target.value })}
              error={!!errors.addressLine1}
              helperText={errors.addressLine1}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              size="small"
              label="Address Line 2"
              value={form.addressLine2}
              onChange={(e) => setForm({ ...form, addressLine2: e.target.value })}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              size="small"
              label="City *"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              error={!!errors.city}
              helperText={errors.city}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              size="small"
              label="District"
              value={form.district}
              onChange={(e) => setForm({ ...form, district: e.target.value })}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              size="small"
              label="State *"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              error={!!errors.state}
              helperText={errors.state}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              size="small"
              label="Country *"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              size="small"
              label="Postal Code *"
              value={form.postalCode}
              onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
              error={!!errors.postalCode}
              helperText={errors.postalCode}
            />
          </Grid>

          {isEdit && (
            <Grid size={{ xs: 12 }} sx={{ display: "flex", alignItems: "center" }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                    color="primary"
                  />
                }
                label="Partner active status"
              />
            </Grid>
          )}
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
          {isSubmitting ? "Registering..." : isEdit ? "Update Directory" : "Register"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ─── Profile Details Drawer ──────────────────────────────
function HospitalProfileDrawer({
  hospital,
  onClose,
}: {
  hospital: Hospital | null;
  onClose: () => void;
}) {
  if (!hospital) return null;

  const fields = [
    { label: "Hospital Code", value: hospital.code },
    { label: "Official Name", value: hospital.name },
    { label: "Registration ID", value: hospital.registrationNumber },
    { label: "Contact Person", value: hospital.contactPerson },
    { label: "Direct Phone", value: hospital.phoneNumber },
    { label: "Support Email", value: hospital.email },
    {
      label: "Street Address",
      value: `${hospital.addressLine1}${hospital.addressLine2 ? `, ${hospital.addressLine2}` : ""}`,
    },
    { label: "City & District", value: `${hospital.city}, ${hospital.district || "—"}` },
    { label: "State & Country", value: `${hospital.state}, ${hospital.country}` },
    { label: "Zip / Postal Code", value: hospital.postalCode },
    { label: "Associated Blood Bank", value: hospital.bloodBankName || "—" },
    {
      label: "Affiliation Date",
      value: new Date(hospital.createdAt).toLocaleDateString("en-IN"),
    },
  ];

  return (
    <Drawer
      anchor="right"
      open={!!hospital}
      onClose={onClose}
      PaperProps={{ sx: { width: { xs: "100%", sm: 420 } } }}
    >
      <Box sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight={700}>
            Partner Details
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
                <LocalHospital sx={{ fontSize: 28 }} />
              </Box>
              <Typography variant="h6" fontWeight={700} textAlign="center">
                {hospital.name}
              </Typography>
              <Chip
                label={hospital.isActive ? "Active Partner" : "Suspended"}
                sx={{
                  bgcolor: hospital.isActive ? "rgba(76,175,80,0.35)" : "rgba(255,255,255,0.2)",
                  color: "#fff",
                  fontWeight: 700,
                }}
              />
            </Stack>
          </CardContent>
        </Card>

        {/* Detailed logs mapping */}
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