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
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import OutlinedInput from "@mui/material/OutlinedInput";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import {
  Search,
  Add,
  Edit,
  Delete,
  Visibility,
  People,
  AdminPanelSettings,
  Lock,
  Close,
  Shield,
  VpnKey,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import {
  useUsersPaged,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
  useAllRoles,
} from "../../hooks/useUsers";
import type { User, CreateUser, UpdateUser, UserStatus } from "../../types/user";
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
export default function UsersPage() {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [profileUser, setProfileUser] = useState<User | null>(null);

  const { data, isLoading, error } = useUsersPaged(
    paginationModel.page + 1,
    paginationModel.pageSize,
    search || undefined
  );

  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();
  const deleteMutation = useDeleteUser();
  const { data: roles = [] } = useAllRoles();

  const users = data?.data ?? [];
  const totalRecords = data?.totalRecords ?? 0;

  // Stats Calculations
  const stats = useMemo(() => {
    const totalUsers = totalRecords || users.length;
    const activeCount = users.filter((u) => u.status === 0).length;
    const adminCount = users.filter((u) => u.roles.some((r) => r.toLowerCase().includes("admin"))).length;
    return { totalUsers, activeCount, adminCount };
  }, [users, totalRecords]);

  const handleCreate = useCallback(() => {
    setEditingUser(null);
    setFormOpen(true);
  }, []);

  const handleEdit = useCallback((user: User) => {
    setEditingUser(user);
    setFormOpen(true);
  }, []);

  const handleDelete = useCallback(
    async (id: string) => {
      if (window.confirm("Are you sure you want to delete this user account?")) {
        try {
          await deleteMutation.mutateAsync(id);
          toast.success("User account deleted successfully.");
        } catch {
          toast.error("Failed to delete user account.");
        }
      }
    },
    [deleteMutation]
  );

  const handleFormSubmit = useCallback(
    async (formData: CreateUser | UpdateUser) => {
      try {
        if (editingUser) {
          await updateMutation.mutateAsync({
            id: editingUser.id,
            data: formData as UpdateUser,
          });
          toast.success("User profile updated successfully!");
        } else {
          await createMutation.mutateAsync(formData as CreateUser);
          toast.success("User account created successfully!");
        }
        setFormOpen(false);
        setEditingUser(null);
      } catch {
        toast.error("Operation failed. Verify unique username/email.");
      }
    },
    [editingUser, updateMutation, createMutation]
  );

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "username",
        headerName: "Username",
        width: 150,
        renderCell: (params) => (
          <Typography fontWeight={700} color="primary" fontSize={13}>
            {params.value}
          </Typography>
        ),
      },
      {
        field: "email",
        headerName: "Email Address",
        width: 200,
      },
      {
        field: "phoneNumber",
        headerName: "Phone Number",
        width: 140,
      },
      {
        field: "roles",
        headerName: "Assigned Roles",
        width: 180,
        renderCell: (params) => (
          <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap sx={{ pt: 0.5 }}>
            {(params.value as string[] || []).map((role) => (
              <Chip
                key={role}
                label={role}
                size="small"
                color="secondary"
                sx={{ fontSize: 10, fontWeight: 700 }}
              />
            ))}
          </Stack>
        ),
      },
      {
        field: "status",
        headerName: "Status",
        width: 110,
        renderCell: (params) => {
          const s = params.value as UserStatus;
          const label = s === 0 ? "Active" : s === 1 ? "Inactive" : "Locked";
          const color = s === 0 ? "success" : s === 1 ? "default" : "error";
          return <Chip label={label} size="small" color={color} sx={{ fontWeight: 700 }} />;
        },
      },
      {
        field: "lastLoginAt",
        headerName: "Last Login",
        width: 150,
        valueFormatter: (value) => (value ? new Date(value).toLocaleString("en-IN") : "Never"),
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 130,
        sortable: false,
        renderCell: (params) => (
          <Stack direction="row" spacing={0.5}>
            <Tooltip title="View Profile">
              <IconButton
                size="small"
                color="primary"
                onClick={() => setProfileUser(params.row)}
              >
                <Visibility fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Modify Account">
              <IconButton
                size="small"
                color="info"
                onClick={() => handleEdit(params.row)}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Account">
              <IconButton
                size="small"
                color="error"
                onClick={() => handleDelete(params.row.id)}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        ),
      },
    ],
    [handleEdit, handleDelete]
  );

  if (isLoading) return <LoadingScreen />;

  if (error)
    return (
      <Alert severity="error" sx={{ m: 4 }}>
        Failed to load registered system users. Verify server connection.
      </Alert>
    );

  return (
    <Stack spacing={3}>
      {/* Header */}
      <Box>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          User Accounts & Roles
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage system users, assign roles, view logs, and configure security permissions.
        </Typography>
      </Box>

      {/* Metrics */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<People />}
          color="#1976D2"
        />
        <StatCard
          title="Active Accounts"
          value={stats.activeCount}
          icon={<Shield />}
          color="#43A047"
        />
        <StatCard
          title="Administrators"
          value={stats.adminCount}
          icon={<AdminPanelSettings />}
          color="#E53935"
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
              placeholder="Search by username, email, phone..."
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
              Add User
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Grid */}
      <Card>
        <DataGrid
          rows={users}
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
      <UserFormDialog
        open={formOpen}
        user={editingUser}
        roles={roles}
        onClose={() => {
          setFormOpen(false);
          setEditingUser(null);
        }}
        onSubmit={handleFormSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />

      {/* Details drawer */}
      <UserProfileDrawer
        user={profileUser}
        onClose={() => setProfileUser(null)}
      />
    </Stack>
  );
}

// ─── Form Dialog ─────────────────────────────────────────
function UserFormDialog({
  open,
  user,
  roles,
  onClose,
  onSubmit,
  isSubmitting,
}: {
  open: boolean;
  user: User | null;
  roles: any[];
  onClose: () => void;
  onSubmit: (data: CreateUser | UpdateUser) => void;
  isSubmitting: boolean;
}) {
  const isEdit = !!user;

  const [form, setForm] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    passwordHash: "",
    isEmailVerified: false,
    isPhoneVerified: false,
    status: 0 as UserStatus,
    profileImageUrl: "",
    preferredLanguage: "en",
    timeZone: "Asia/Kolkata",
    roles: [] as string[],
  });

  useMemo(() => {
    if (user) {
      setForm({
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        passwordHash: "", // No password field in edit mode
        isEmailVerified: user.isEmailVerified,
        isPhoneVerified: user.isPhoneVerified,
        status: user.status,
        profileImageUrl: user.profileImageUrl || "",
        preferredLanguage: user.preferredLanguage,
        timeZone: user.timeZone,
        roles: user.roles || [],
      });
    } else {
      setForm({
        username: "",
        email: "",
        phoneNumber: "",
        passwordHash: "",
        isEmailVerified: false,
        isPhoneVerified: false,
        status: 0,
        profileImageUrl: "",
        preferredLanguage: "en",
        timeZone: "Asia/Kolkata",
        roles: [],
      });
    }
  }, [user, open]);

  const handleRoleToggle = (roleName: string) => {
    setForm((prev) => {
      const idx = prev.roles.indexOf(roleName);
      const newRoles = [...prev.roles];
      if (idx > -1) {
        newRoles.splice(idx, 1);
      } else {
        newRoles.push(roleName);
      }
      return { ...prev, roles: newRoles };
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>
        {isEdit ? `Edit user ${user.username}` : "Register New User Account"}
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="Username *"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="Email Address *"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="Phone Number *"
                value={form.phoneNumber}
                onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
              />
            </Grid>
            {!isEdit && (
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Password *"
                  type="password"
                  value={form.passwordHash}
                  onChange={(e) => setForm({ ...form, passwordHash: e.target.value })}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <VpnKey fontSize="small" />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Grid>
            )}
          </Grid>

          <FormControl fullWidth size="small">
            <InputLabel>Assigned Roles</InputLabel>
            <Select
              multiple
              value={form.roles}
              onChange={() => {}}
              input={<OutlinedInput label="Assigned Roles" />}
              renderValue={(selected) => (selected as string[]).join(", ")}
            >
              {roles.map((r) => (
                <MenuItem
                  key={r.id}
                  value={r.name}
                  onClick={() => handleRoleToggle(r.name)}
                >
                  <Checkbox checked={form.roles.indexOf(r.name) > -1} />
                  <ListItemText primary={r.name} secondary={r.description} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {isEdit && (
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={form.status}
                label="Status"
                onChange={(e) => setForm({ ...form, status: e.target.value as UserStatus })}
              >
                <MenuItem value={0}>Active</MenuItem>
                <MenuItem value={1}>Inactive</MenuItem>
                <MenuItem value={2}>Locked</MenuItem>
              </Select>
            </FormControl>
          )}

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ pt: 1 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={form.isEmailVerified}
                  onChange={(e) => setForm({ ...form, isEmailVerified: e.target.checked })}
                />
              }
              label="Email Verified"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={form.isPhoneVerified}
                  onChange={(e) => setForm({ ...form, isPhoneVerified: e.target.checked })}
                />
              }
              label="Phone Verified"
            />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => onSubmit(form)}
          disabled={
            isSubmitting ||
            !form.username ||
            !form.email ||
            !form.phoneNumber ||
            (!isEdit && !form.passwordHash)
          }
          sx={{
            background: "linear-gradient(135deg, #E53935 0%, #C62828 100%)",
          }}
        >
          {isSubmitting ? "Saving..." : isEdit ? "Update User" : "Create User"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ─── Details View Drawer ─────────────────────────────────
function UserProfileDrawer({
  user,
  onClose,
}: {
  user: User | null;
  onClose: () => void;
}) {
  if (!user) return null;

  const statusLabel = user.status === 0 ? "Active" : user.status === 1 ? "Inactive" : "Locked";

  const fields = [
    { label: "User ID", value: user.id },
    { label: "Username", value: user.username },
    { label: "Email Address", value: user.email },
    { label: "Phone Number", value: user.phoneNumber },
    { label: "Email Verified", value: user.isEmailVerified ? "Yes" : "No" },
    { label: "Phone Verified", value: user.isPhoneVerified ? "Yes" : "No" },
    { label: "Language Preference", value: user.preferredLanguage },
    { label: "Preferred Timezone", value: user.timeZone },
    { label: "Last Login Date", value: user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString("en-IN") : "Never" },
  ];

  return (
    <Drawer
      anchor="right"
      open={!!user}
      onClose={onClose}
      PaperProps={{ sx: { width: { xs: "100%", sm: 420 } } }}
    >
      <Box sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight={700}>
            User Profile details
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
                  fontSize: 24,
                  fontWeight: 800,
                }}
              >
                {user.username.charAt(0).toUpperCase()}
              </Box>
              <Typography variant="h6" fontWeight={700}>
                {user.username}
              </Typography>
              <Stack direction="row" spacing={0.5}>
                {user.roles.map((r) => (
                  <Chip
                    key={r}
                    label={r}
                    size="small"
                    sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "#fff", fontWeight: 700 }}
                  />
                ))}
              </Stack>
              <Chip
                label={statusLabel}
                size="small"
                sx={{
                  mt: 1,
                  bgcolor:
                    user.status === 0
                      ? "rgba(76,175,80,0.35)"
                      : user.status === 1
                        ? "rgba(255,255,255,0.25)"
                        : "rgba(244,67,54,0.35)",
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