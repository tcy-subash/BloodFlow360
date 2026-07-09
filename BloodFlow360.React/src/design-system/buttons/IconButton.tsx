import MuiIconButton from "@mui/material/IconButton";

import type { IconButtonProps } from "@mui/material/IconButton";

export default function IconButton(
  props: IconButtonProps
) {
  return (
    <MuiIconButton
      {...props}
      sx={{
        width: 44,

        height: 44,

        borderRadius: "14px",

        transition: ".25s",

        "&:hover": {
          bgcolor: "rgba(211,47,47,.08)",

          transform: "translateY(-2px)",
        },

        ...props.sx,
      }}
    />
  );
}