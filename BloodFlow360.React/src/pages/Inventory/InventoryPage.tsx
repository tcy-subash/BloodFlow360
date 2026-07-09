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
import LinearProgress from "@mui/material/LinearProgress";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import {
  Search,
  Add,
  Edit,
  History,
  Warning,
  CheckCircle,
  TrendingUp,
  SettingsInputComposite,
  Close,
  Bloodtype,
  SwapVert,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import {
  useInventoryPaged,
  useCreateInventory,
  useUpdateInventory,
  useDeleteInventory,
  useAdjustInventory,
  useInventoryHistory,
} from "../../hooks/useInventory";
import type { BloodInventory, CreateBloodInventory, UpdateBloodInventory } from "../../types/inventory";
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
export default function InventoryPage() {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [adjustOpen, setAdjustOpen] = useState(false);
  const [editingInventory, setEditingInventory] = useState<BloodInventory | null>(null);
  const [adjustingInventory, setAdjustingInventory] = useState<BloodInventory | null>(null);
  const [historyTarget, setHistoryTarget] = useState<BloodInventory | null>(null);

  const { data, isLoading, error } = useInventoryPaged(
    paginationModel.page + 1,
    paginationModel.pageSize,
    search || undefined
  );

  const createMutation = useCreateInventory();
  const updateMutation = useUpdateInventory();
  const deleteMutation = useDeleteInventory();
  const adjustMutation = useAdjustInventory();

  const inventoryItems = data?.data ?? [];
  const totalRecords = data?.totalRecords ?? 0;

  // Stats calculations
  const stats = useMemo(() => {
    const totalUnits = inventoryItems.reduce((acc, curr) => acc + curr.unitsAvailable, 0);
    const totalReserved = inventoryItems.reduce((acc, curr) => acc + curr.unitsReserved, 0);
    const lowStockCount = inventoryItems.filter(
      (item) => item.unitsAvailable <= item.minimumStockLevel
    ).length;
    return { totalUnits, totalReserved, lowStockCount };
  }, [inventoryItems]);

  const handleCreate = useCallback(() => {
    setEditingInventory(null);
    setFormOpen(true);
  }, []);

  const handleEdit = useCallback((item: BloodInventory) => {
    setEditingInventory(item);
    setFormOpen(true);
  }, []);

  const handleAdjustClick = useCallback((item: BloodInventory) => {
    setAdjustingInventory(item);
    setAdjustOpen(true);
  }, []);

  const handleFormSubmit = useCallback(
    async (formData: CreateBloodInventory | UpdateBloodInventory) => {
      try {
        if (editingInventory) {
          await updateMutation.mutateAsync({
            id: editingInventory.id,
            data: formData as UpdateBloodInventory,
          });
          toast.success("Inventory limits updated successfully!");
        } else {
          await createMutation.mutateAsync(formData as CreateBloodInventory);
          toast.success("Inventory entry added successfully!");
        }
        setFormOpen(false);
        setEditingInventory(null);
      } catch {
        toast.error("Operation failed. Check input values.");
      }
    },
    [editingInventory, updateMutation, createMutation]
  );

  const handleAdjustmentSubmit = useCallback(
    async (newStock: number, remarks: string) => {
      if (!adjustingInventory) return;
      try {
        await adjustMutation.mutateAsync({
          bloodInventoryId: adjustingInventory.id,
          newStock,
          remarks,
        });
        toast.success("Inventory stock levels adjusted!");
        setAdjustOpen(false);
        setAdjustingInventory(null);
      } catch {
        toast.error("Stock adjustment failed.");
      }
    },
    [adjustingInventory, adjustMutation]
  );

  // Columns for DataGrid
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "bloodGroupName",
        headerName: "Blood Group",
        width: 140,
        renderCell: (params) => (
          <Chip
            label={params.value || "Unknown"}
            size="small"
            sx={{
              fontWeight: 800,
              bgcolor: "#E53935",
              color: "#fff",
              fontSize: 12,
            }}
            icon={<Bloodtype sx={{ fontSize: 16, color: "#fff !important" }} />}
          />
        ),
      },
      {
        field: "unitsAvailable",
        headerName: "Available Stock (ML)",
        width: 180,
        renderCell: (params) => {
          const row = params.row as BloodInventory;
          const percentage = Math.min(
            100,
            Math.round((row.unitsAvailable / (row.maximumStockLevel || 100)) * 100)
          );
          const isLow = row.unitsAvailable <= row.minimumStockLevel;

          return (
            <Box sx={{ width: "100%", pr: 2 }}>
              <Stack direction="row" justifyContent="space-between" mb={0.5}>
                <Typography fontSize={12} fontWeight={600} color={isLow ? "error" : "text.primary"}>
                  {row.unitsAvailable} / {row.maximumStockLevel}
                </Typography>
                <Typography fontSize={11} color="text.secondary">
                  {percentage}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={percentage}
                color={isLow ? "error" : percentage > 80 ? "success" : "primary"}
                sx={{ height: 6, borderRadius: 3 }}
              />
            </Box>
          );
        },
      },
      {
        field: "unitsReserved",
        headerName: "Reserved",
        width: 120,
        renderCell: (params) => (
          <Typography fontWeight={600} color="text.secondary">
            {params.value} Units
          </Typography>
        ),
      },
      {
        field: "minimumStockLevel",
        headerName: "Min Limit",
        width: 110,
      },
      {
        field: "status",
        headerName: "Status",
        width: 130,
        renderCell: (params) => {
          const row = params.row as BloodInventory;
          const isLow = row.unitsAvailable <= row.minimumStockLevel;
          return (
            <Chip
              label={isLow ? "Low Stock" : "Normal"}
              size="small"
              color={isLow ? "error" : "success"}
              variant={isLow ? "filled" : "outlined"}
              sx={{ fontWeight: 700, fontSize: 11 }}
            />
          );
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 180,
        sortable: false,
        renderCell: (params) => (
          <Stack direction="row" spacing={0.5}>
            <Tooltip title="Adjust Stock Quantity">
              <IconButton
                size="small"
                color="primary"
                onClick={() => handleAdjustClick(params.row)}
              >
                <SwapVert fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit Limits & Config">
              <IconButton
                size="small"
                color="info"
                onClick={() => handleEdit(params.row)}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="View Transaction Logs">
              <IconButton
                size="small"
                color="default"
                onClick={() => setHistoryTarget(params.row)}
              >
                <History fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        ),
      },
    ],
    [handleEdit, handleAdjustClick]
  );

  if (isLoading) return <LoadingScreen />;

  if (error)
    return (
      <Alert severity="error" sx={{ m: 4 }}>
        Failed to load blood inventories. Please verify backend connection.
      </Alert>
    );

  return (
    <Stack spacing={3}>
      {/* Page Header */}
      <Box>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Blood Inventory
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Monitor real-time blood stock levels, configure min/max warning limits, and record manual stock adjustments.
        </Typography>
      </Box>

      {/* Real-time metrics */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <StatCard
          title="Total Available Stock"
          value={stats.totalUnits}
          icon={<CheckCircle />}
          color="#43A047"
        />
        <StatCard
          title="Reserved Units"
          value={stats.totalReserved}
          icon={<TrendingUp />}
          color="#FB8C00"
        />
        <StatCard
          title="Low Stock Alerts"
          value={stats.lowStockCount}
          icon={<Warning />}
          color="#E53935"
        />
      </Stack>

      {/* Action bar */}
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
              placeholder="Search by blood group..."
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
              Configure Group
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Grid */}
      <Card>
        <DataGrid
          rows={inventoryItems}
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
            "& .MuiDataGrid-cell": {
              display: "flex",
              alignItems: "center",
            },
          }}
        />
      </Card>

      {/* Creation / Update Config Dialog */}
      <InventoryFormDialog
        open={formOpen}
        item={editingInventory}
        onClose={() => {
          setFormOpen(false);
          setEditingInventory(null);
        }}
        onSubmit={handleFormSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />

      {/* Adjustment Form Modal */}
      <AdjustmentDialog
        open={adjustOpen}
        item={adjustingInventory}
        onClose={() => {
          setAdjustOpen(false);
          setAdjustingInventory(null);
        }}
        onSubmit={handleAdjustmentSubmit}
        isSubmitting={adjustMutation.isPending}
      />

      {/* History Drawer */}
      <HistoryDrawer
        item={historyTarget}
        onClose={() => setHistoryTarget(null)}
      />
    </Stack>
  );
}

// ─── Config Form Dialog ──────────────────────────────────
function InventoryFormDialog({
  open,
  item,
  onClose,
  onSubmit,
  isSubmitting,
}: {
  open: boolean;
  item: BloodInventory | null;
  onClose: () => void;
  onSubmit: (data: CreateBloodInventory | UpdateBloodInventory) => void;
  isSubmitting: boolean;
}) {
  const isEdit = !!item;
  const [bloodBanks, setBloodBanks] = useState<{ id: string; name: string }[]>([]);
  const [bloodGroups, setBloodGroups] = useState<{ id: string; name: string }[]>([]);

  const [form, setForm] = useState({
    bloodBankId: "",
    bloodGroupId: "",
    unitsAvailable: 0,
    unitsReserved: 0,
    minimumStockLevel: 10,
    maximumStockLevel: 100,
    isActive: true,
  });

  // Fetch helper info for Blood Banks and Groups on dialog load
  useMemo(() => {
    if (open && !isEdit) {
      api.get("/BloodBanks").then((res) => {
        setBloodBanks(res.data.data || []);
      });
      api.get("/BloodGroups").then((res) => {
        setBloodGroups(res.data.data || []);
      });
    }
  }, [open, isEdit]);

  useMemo(() => {
    if (item) {
      setForm({
        bloodBankId: item.bloodBankId,
        bloodGroupId: item.bloodGroupId,
        unitsAvailable: item.unitsAvailable,
        unitsReserved: item.unitsReserved,
        minimumStockLevel: item.minimumStockLevel,
        maximumStockLevel: item.maximumStockLevel,
        isActive: item.isActive,
      });
    } else {
      setForm({
        bloodBankId: "",
        bloodGroupId: "",
        unitsAvailable: 0,
        unitsReserved: 0,
        minimumStockLevel: 10,
        maximumStockLevel: 100,
        isActive: true,
      });
    }
  }, [item, open]);

  const handleSubmit = () => {
    onSubmit(form);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>
        {isEdit ? `Edit Limits for ${item.bloodGroupName}` : "Configure Blood Group Inventory"}
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {!isEdit && (
            <>
              <FormControl fullWidth size="small">
                <InputLabel>Blood Bank</InputLabel>
                <Select
                  value={form.bloodBankId}
                  label="Blood Bank"
                  onChange={(e) => setForm({ ...form, bloodBankId: e.target.value })}
                >
                  {bloodBanks.map((b) => (
                    <MenuItem key={b.id} value={b.id}>
                      {b.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <InputLabel>Blood Group</InputLabel>
                <Select
                  value={form.bloodGroupId}
                  label="Blood Group"
                  onChange={(e) => setForm({ ...form, bloodGroupId: e.target.value })}
                >
                  {bloodGroups.map((g) => (
                    <MenuItem key={g.id} value={g.id}>
                      {g.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}

          <Grid container spacing={2}>
            {!isEdit && (
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Initial Stock Level"
                  type="number"
                  value={form.unitsAvailable || ""}
                  onChange={(e) =>
                    setForm({ ...form, unitsAvailable: parseInt(e.target.value) || 0 })
                  }
                />
              </Grid>
            )}
            <Grid size={{ xs: 12, sm: isEdit ? 12 : 6 }}>
              <TextField
                fullWidth
                size="small"
                label="Reserved Stock Level"
                type="number"
                value={form.unitsReserved || ""}
                onChange={(e) =>
                  setForm({ ...form, unitsReserved: parseInt(e.target.value) || 0 })
                }
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="Minimum Stock Threshold *"
                type="number"
                value={form.minimumStockLevel || ""}
                onChange={(e) =>
                  setForm({ ...form, minimumStockLevel: parseInt(e.target.value) || 0 })
                }
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="Maximum Capacity Limit *"
                type="number"
                value={form.maximumStockLevel || ""}
                onChange={(e) =>
                  setForm({ ...form, maximumStockLevel: parseInt(e.target.value) || 0 })
                }
              />
            </Grid>
          </Grid>
        </Stack>
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
          {isSubmitting ? "Saving..." : isEdit ? "Update Limits" : "Add Config"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ─── Adjustment Form Modal ────────────────────────────────
function AdjustmentDialog({
  open,
  item,
  onClose,
  onSubmit,
  isSubmitting,
}: {
  open: boolean;
  item: BloodInventory | null;
  onClose: () => void;
  onSubmit: (newStock: number, remarks: string) => void;
  isSubmitting: boolean;
}) {
  const [newStock, setNewStock] = useState(0);
  const [remarks, setRemarks] = useState("");

  useMemo(() => {
    if (item) {
      setNewStock(item.unitsAvailable);
      setRemarks("");
    }
  }, [item, open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>Adjust Blood Stock Level</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2.5} sx={{ mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Group: <strong>{item?.bloodGroupName}</strong>
            <br />
            Current Level: <strong>{item?.unitsAvailable} Units</strong>
          </Typography>

          <TextField
            fullWidth
            size="small"
            label="New Stock level (ML)"
            type="number"
            value={newStock}
            onChange={(e) => setNewStock(parseInt(e.target.value) || 0)}
          />

          <TextField
            fullWidth
            size="small"
            label="Remarks / Audit Note *"
            multiline
            rows={2}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="e.g. Manual count reconciliation"
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
          onClick={() => onSubmit(newStock, remarks)}
          disabled={isSubmitting || !remarks.trim()}
        >
          {isSubmitting ? "Applying..." : "Apply Adjustment"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ─── History Drawer ────────────────────────────────────────
function HistoryDrawer({
  item,
  onClose,
}: {
  item: BloodInventory | null;
  onClose: () => void;
}) {
  const { data: logs, isLoading } = useInventoryHistory(item?.id || "");

  return (
    <Drawer
      anchor="right"
      open={!!item}
      onClose={onClose}
      PaperProps={{ sx: { width: { xs: "100%", sm: 440 } } }}
    >
      <Box sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight={700}>
            Transaction Logs
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Stack>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Audit changes for Blood Group: <strong>{item?.bloodGroupName}</strong>
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {isLoading ? (
          <LinearProgress />
        ) : !logs || logs.length === 0 ? (
          <Typography color="text.secondary" textAlign="center" py={4}>
            No stock modification history found for this group.
          </Typography>
        ) : (
          <Stack spacing={2}>
            {logs.map((log) => (
              <Card key={log.id} variant="outlined" sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                  <Stack direction="row" justifyContent="space-between" mb={1}>
                    <Chip
                      label={log.transactionType}
                      size="small"
                      color={
                        log.transactionType === "Donation"
                          ? "success"
                          : log.transactionType === "Adjustment"
                            ? "info"
                            : "secondary"
                      }
                      sx={{ fontWeight: 700, fontSize: 10 }}
                    />
                    <Typography fontSize={11} color="text.secondary">
                      {new Date(log.createdAt).toLocaleString("en-IN")}
                    </Typography>
                  </Stack>

                  <Typography fontSize={13} mb={1}>
                    Stock updated: <strong>{log.previousStock} Units</strong> →{" "}
                    <strong>{log.currentStock} Units</strong> (Change: {log.quantity > 0 ? `+${log.quantity}` : log.quantity})
                  </Typography>

                  {log.remarks && (
                    <Typography
                      fontSize={12}
                      sx={{
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