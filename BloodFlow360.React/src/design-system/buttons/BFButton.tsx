import Button from "@mui/material/Button";

import type { ButtonProps } from "@mui/material/Button";

export default function BFButton(
  props: ButtonProps
) {
  return (
    <Button
      {...props}
      disableElevation
      variant="contained"
      sx={{
        borderRadius: "14px",

        height: 48,

        px: 4,

        fontWeight: 700,

        textTransform: "none",

        background:
          "linear-gradient(135deg,#D32F2F,#EF5350)",

        transition: ".25s",

        "&:hover": {
          transform: "translateY(-2px)",

          boxShadow:
            "0 20px 40px rgba(211,47,47,.35)",
        },

        ...props.sx,
      }}
    />
  );
}