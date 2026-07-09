import TextField from "@mui/material/TextField";

import type { TextFieldProps } from "@mui/material/TextField";

export default function BFTextField(
  props: TextFieldProps
) {
  return (
    <TextField
      {...props}
      fullWidth
      variant="outlined"
      slotProps={{
        input: {
          ...props.slotProps?.input,
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "16px",

          backgroundColor: "#fff",

          transition: ".25s",

          "& fieldset": {
            borderColor: "#E5E7EB",
          },

          "&:hover fieldset": {
            borderColor: "#D32F2F",
          },

          "&.Mui-focused fieldset": {
            borderWidth: 2,

            borderColor: "#D32F2F",
          },
        },

        ...props.sx,
      }}
    />
  );
}