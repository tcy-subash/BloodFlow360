import { DataGrid } from "@mui/x-data-grid";

import type {
  DataGridProps,
} from "@mui/x-data-grid";

export default function BFDataGrid(
  props: DataGridProps
) {
  return (
    <DataGrid
      {...props}
      disableRowSelectionOnClick
      pageSizeOptions={[10, 25, 50, 100]}
      sx={{
        border: 0,

        borderRadius: "20px",

        backgroundColor: "#fff",

        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "#F8FAFC",

          fontWeight: 700,

          borderBottom: "none",
        },

        "& .MuiDataGrid-cell": {
          borderBottom:
            "1px solid #F1F5F9",
        },

        "& .MuiDataGrid-row:hover": {
          backgroundColor:
            "rgba(211,47,47,.04)",
        },

        "& .MuiDataGrid-footerContainer": {
          borderTop:
            "1px solid #F1F5F9",
        },

        "& .MuiDataGrid-columnSeparator": {
          display: "none",
        },

        ...props.sx,
      }}
    />
  );
}