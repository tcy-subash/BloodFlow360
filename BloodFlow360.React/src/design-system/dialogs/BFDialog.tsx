import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import type { ReactNode } from "react";

interface BFDialogProps {
  open: boolean;
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  onClose: () => void;
}

export default function BFDialog({
  open,
  title,
  children,
  actions,
  onClose,
}: BFDialogProps) {
  return (
    <Dialog
  open={open}
  onClose={onClose}
  fullWidth
  maxWidth="md"
  slotProps={{
    paper: {
      sx: {
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow:
          "0 30px 80px rgba(15,23,42,.18)",
      },
    },
  }}
>
      <DialogTitle
        sx={{
          fontWeight: 700,

          pb: 1,
        }}
      >
        {title}
      </DialogTitle>

      <DialogContent dividers>
        {children}
      </DialogContent>

      {actions && (
        <DialogActions
          sx={{
            p: 3,
          }}
        >
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
}