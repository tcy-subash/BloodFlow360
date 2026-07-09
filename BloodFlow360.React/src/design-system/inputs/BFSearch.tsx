import SearchIcon from "@mui/icons-material/Search";

import InputAdornment from "@mui/material/InputAdornment";

import BFTextField from "./BFTextField";

import type { TextFieldProps } from "@mui/material/TextField";

export default function BFSearch(
  props: TextFieldProps
) {
  return (
    <BFTextField
      placeholder="Search..."
      {...props}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          ...props.slotProps?.input,
        },
      }}
    />
  );
}