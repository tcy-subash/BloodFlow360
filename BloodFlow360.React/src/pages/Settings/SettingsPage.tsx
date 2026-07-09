import { useState, useMemo, useCallback } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Alert from "@mui/material/Alert";
import InputAdornment from "@mui/material/InputAdornment";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import {
  Save,
  Business,
  SettingsSuggest,
  NotificationsActive,
  ListAlt,
  Search,
  Add,
  Edit,
} from "@mui/icons-material";
import toast from "react-hot-toast";

import {
  useSettingsPaged,
  useUpdateSettingByKey,
  useCreateSetting,
  useUpdateSetting,
} from "../../hooks/useSettings";
import type { Setting } from "../../types/setting";
import LoadingScreen from "../../design-system/feedback/LoadingScreen";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const [formOpen, setFormOpen] = useState(false);
  const [editingSetting, setEditingSetting] = useState<Setting | null>(null);

  // Live settings list
  const { data, isLoading, error } = useSettingsPaged(
    paginationModel.page + 1,
    paginationModel.pageSize,
    search || undefined
  );

  const updateByKeyMutation = useUpdateSettingByKey();
  const createMutation = useCreateSetting();
  const updateMutation = useUpdateSetting();

  const settings = data?.data ?? [];
  const totalRecords = data?.totalRecords ?? 0;

  // Derive config settings from DB with fallback local storage defaults
  const findValue = (key: string, fallback: string) => {
    const s = settings.find((x) => x.settingKey === key);
    return s ? s.settingValue : fallback;
  };

  // State structures for tabs
  const [orgName, setOrgName] = useState(() => findValue("Org_Name", "BloodFlow360 National Bank"));
  const [orgEmail, setOrgEmail] = useState(() => findValue("Org_Email", "support@bloodflow360.org"));
  const [orgPhone, setOrgPhone] = useState(() => findValue("Org_Phone", "+91 98765 43210"));
  const [minStock, setMinStock] = useState(() => findValue("Min_Stock_Alert", "10"));
  const [expiryDays, setExpiryDays] = useState(() => findValue("Expiry_Alert_Days", "5"));
  const [autoEmailAlerts, setAutoEmailAlerts] = useState(() => findValue("Auto_Email_Alerts", "true") === "true");
  const [autoDonorSMS, setAutoDonorSMS] = useState(() => findValue("Auto_Donor_SMS", "false") === "true");
  const [autoBackups, setAutoBackups] = useState(() => findValue("Auto_Backups", "true") === "true");

  useMemo(() => {
    if (settings.length > 0) {
      setOrgName(findValue("Org_Name", "BloodFlow360 National Bank"));
      setOrgEmail(findValue("Org_Email", "support@bloodflow360.org"));
      setOrgPhone(findValue("Org_Phone", "+91 98765 43210"));
      setMinStock(findValue("Min_Stock_Alert", "10"));
      setExpiryDays(findValue("Expiry_Alert_Days", "5"));
      setAutoEmailAlerts(findValue("Auto_Email_Alerts", "true") === "true");
      setAutoDonorSMS(findValue("Auto_Donor_SMS", "false") === "true");
      setAutoBackups(findValue("Auto_Backups", "true") === "true");
    }
  }, [settings]);

  // Tab Save Actions
  const handleSaveTab = async (section: string) => {
    try {
      if (section === "org") {
        await updateByKeyMutation.mutateAsync({ key: "Org_Name", value: orgName });
        await updateByKeyMutation.mutateAsync({ key: "Org_Email", value: orgEmail });
        await updateByKeyMutation.mutateAsync({ key: "Org_Phone", value: orgPhone });
      } else if (section === "thresholds") {
        await updateByKeyMutation.mutateAsync({ key: "Min_Stock_Alert", value: minStock });
        await updateByKeyMutation.mutateAsync({ key: "Expiry_Alert_Days", value: expiryDays });
      } else if (section === "notifications") {
        await updateByKeyMutation.mutateAsync({ key: "Auto_Email_Alerts", value: autoEmailAlerts.toString() });
        await updateByKeyMutation.mutateAsync({ key: "Auto_Donor_SMS", value: autoDonorSMS.toString() });
        await updateByKeyMutation.mutateAsync({ key: "Auto_Backups", value: autoBackups.toString() });
      }
      toast.success("Settings updated successfully!");
    } catch {
      toast.error("Failed to save settings. Verify values.");
    }
  };

  // Custom Raw Config CRUD actions
  const handleCreate = useCallback(() => {
    setEditingSetting(null);
    setFormOpen(true);
  }, []);

  const handleEdit = useCallback((row: Setting) => {
    setEditingSetting(row);
    setFormOpen(true);
  }, []);

  const handleFormSubmit = useCallback(
    async (formData: { settingKey: string; settingValue: string; description: string }) => {
      try {
        if (editingSetting) {
          await updateMutation.mutateAsync({
            id: editingSetting.id,
            data: {
              settingValue: formData.settingValue,
              description: formData.description,
              isEncrypted: editingSetting.isEncrypted,
            },
          });
          toast.success("Config setting updated!");
        } else {
          await createMutation.mutateAsync({
            settingKey: formData.settingKey,
            settingValue: formData.settingValue,
            description: formData.description,
            isEncrypted: false,
          });
          toast.success("Config setting created!");
        }
        setFormOpen(false);
        setEditingSetting(null);
      } catch {
        toast.error("Operation failed.");
      }
    },
    [editingSetting, createMutation, updateMutation]
  );

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "settingKey",
        headerName: "Config Key",
        width: 220,
        renderCell: (params) => (
          <Typography
            color="primary"
            sx={{
              fontWeight: 700,
              fontSize: 13,
            }}>
            {params.value}
          </Typography >
        ),
      },
      {
        field: "settingValue",
        headerName: "Config Value",
        width: 250,
      },
      {
        field: "description",
        headerName: "Description",
        width: 320,
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 100,
        sortable: false,
        renderCell: (params) => (
          <Stack direction="row" spacing={0.5}>
            <Tooltip title="Edit Config">
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
        Failed to load application system settings. Verify connection.
      </Alert>
    );

  return (
    <Stack spacing={3}>
      {/* Header */}
      <Box>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 800,
          }}
        >
          System Settings & Config
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Configure security bounds, inventory triggers, safety alert thresholds, and email parameters.
        </Typography>
      </Box>

      {/* Tabs */}
      <Card>
        <Tabs
          value={activeTab}
          onChange={(_, val) => setActiveTab(val)}
          indicatorColor="primary"
          textColor="primary"
          sx={{ borderBottom: 1, borderColor: "divider", px: 2 }}
        >
          <Tab icon={<Business />} iconPosition="start" label="Organization Info" />
          <Tab icon={<SettingsSuggest />} iconPosition="start" label="Safety Thresholds" />
          <Tab icon={<NotificationsActive />} iconPosition="start" label="Notification Alerts" />
          <Tab icon={<ListAlt />} iconPosition="start" label="Raw Config Parameters" />
        </Tabs>
      </Card>

      {/* Tab Panels */}
      {activeTab === 0 && (
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              Organization Details
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 3,
              }}
            >
              Enter general information representing this regional Blood Bank division.
            </Typography>

            <Grid container spacing={3} sx={{ maxWidth: "md" }}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Organization / Bank Name"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Support Email Address"
                  value={orgEmail}
                  onChange={(e) => setOrgEmail(e.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Support Contact Number"
                  value={orgPhone}
                  onChange={(e) => setOrgPhone(e.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Divider sx={{ my: 1 }} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={() => handleSaveTab("org")}
                  sx={{
                    background: "linear-gradient(135deg, #E53935 0%, #C62828 100%)",
                  }}
                >
                  Save Organization Details
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {activeTab === 1 && (
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 700,
              }}
            >
              Inventory Safety Thresholds
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              Define margins before low stock alerts trigger and expiration warnings flag.
            </Typography>

            <Grid container spacing={3} sx={{ maxWidth: "md" }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Minimum Stock Warning"
                  type="number"
                  value={minStock}
                  onChange={(e) => setMinStock(e.target.value)}
                  slotProps={{
                    input: {
                      endAdornment: <InputAdornment position="end">Units</InputAdornment>,
                    },
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Expiration Alert Threshold"
                  type="number"
                  value={expiryDays}
                  onChange={(e) => setExpiryDays(e.target.value)}
                  slotProps={{
                    input: {
                      endAdornment: <InputAdornment position="end">Days Before</InputAdornment>,
                    },
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Divider sx={{ my: 1 }} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={() => handleSaveTab("thresholds")}
                  sx={{
                    background: "linear-gradient(135deg, #E53935 0%, #C62828 100%)",
                  }}
                >
                  Save Safety Thresholds
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {activeTab === 2 && (
        <Card>
          <CardContent sx={{ p: 3 }}>

            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 700,
              }}
            >
              Automated Alert Notification Settings
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 3,
              }}
            >
              Configure background jobs and triggers for dispatch logs, backups, and donor alerts.
            </Typography>

              <Stack
                spacing={2.5}
                sx={{ maxWidth: 600 }}
              >
                <FormControlLabel
                  sx={{ alignItems: "flex-start", m: 0 }}
                  control={
                    <Switch
                      checked={autoEmailAlerts}
                      onChange={(e) => setAutoEmailAlerts(e.target.checked)}
                      sx={{ mt: -0.5, mr: 1 }}
                    />
                  }
                  label={
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600 }}
                      >
                        Low Stock E-mail Broadcasts
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Automatically email all affiliated hospital administrators when stock drops below threshold.
                      </Typography>
                    </Box>
                  }
                />
                <Divider />
                <FormControlLabel
                  sx={{ alignItems: "flex-start", m: 0 }}
                  control={
                    <Switch
                      checked={autoDonorSMS}
                      onChange={(e) => setAutoDonorSMS(e.target.checked)}
                      sx={{ mt: -0.5, mr: 1 }}
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        Donor Eligibility SMS Pings
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Automatically SMS donors once the 90-day donation window limit resets.
                      </Typography>
                    </Box>
                  }
                />
                <Divider />
                <FormControlLabel
                  sx={{ alignItems: "flex-start", m: 0 }}
                  control={
                    <Switch
                      checked={autoBackups}
                      onChange={(e) => setAutoBackups(e.target.checked)}
                      sx={{ mt: -0.5, mr: 1 }}
                    />
                  }
                  label={
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600
                        }}
                      >
                        Automated DB Backups
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Perform nightly automatic database snapshots and cloud vault replication.
                      </Typography>
                    </Box>
                  }
                />
              </Stack>

              <Divider sx={{ my: 3 }} />

              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={() => handleSaveTab("notifications")}
                sx={{
                  background: "linear-gradient(135deg, #E53935 0%, #C62828 100%)",
                }}
              >
                Save Notification Settings
              </Button>
          </CardContent>
        </Card>
      )}

      {activeTab === 3 && (
        <Stack spacing={3}>
          <Card>
            <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{
                  alignItems: {
                    sm: "center"
                  },
                  justifyContent: "space-between"
                }}
              >
                <TextField
                  size="small"
                  placeholder="Filter parameters by key, value, description..."
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
                  New Parameter
                </Button>
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <DataGrid
              rows={settings}
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

          <SettingFormDialog
            open={formOpen}
            setting={editingSetting}
            onClose={() => {
              setFormOpen(false);
              setEditingSetting(null);
            }}
            onSubmit={handleFormSubmit}
            isSubmitting={createMutation.isPending || updateMutation.isPending}
          />
        </Stack>
      )}
    </Stack>
  );
}

// ─── Raw Config Form Dialog ──────────────────────────────
function SettingFormDialog({
  open,
  setting,
  onClose,
  onSubmit,
  isSubmitting,
}: {
  open: boolean;
  setting: Setting | null;
  onClose: () => void;
  onSubmit: (data: { settingKey: string; settingValue: string; description: string }) => void;
  isSubmitting: boolean;
}) {
  const isEdit = !!setting;

  const [form, setForm] = useState({
    settingKey: "",
    settingValue: "",
    description: "",
  });

  useMemo(() => {
    if (setting) {
      setForm({
        settingKey: setting.settingKey,
        settingValue: setting.settingValue,
        description: setting.description || "",
      });
    } else {
      setForm({
        settingKey: "",
        settingValue: "",
        description: "",
      });
    }
  }, [setting, open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>
        {isEdit ? `Edit Parameter ${setting.settingKey}` : "Create System Config Parameter"}
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            fullWidth
            size="small"
            label="Parameter Key *"
            value={form.settingKey}
            disabled={isEdit}
            onChange={(e) => setForm({ ...form, settingKey: e.target.value })}
            placeholder="e.g. SMTP_Server_Host"
          />

          <TextField
            fullWidth
            size="small"
            label="Parameter Value *"
            value={form.settingValue}
            onChange={(e) => setForm({ ...form, settingValue: e.target.value })}
            placeholder="e.g. smtp.mailgun.org"
          />

          <TextField
            fullWidth
            size="small"
            label="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
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
          disabled={isSubmitting || !form.settingKey || !form.settingValue}
          sx={{
            background: "linear-gradient(135deg, #E53935 0%, #C62828 100%)",
          }}
        >
          {isSubmitting ? "Saving..." : isEdit ? "Update Parameter" : "Create Parameter"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
