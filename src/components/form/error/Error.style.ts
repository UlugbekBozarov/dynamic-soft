import { styled } from "@mui/material";
import { get } from "lodash";

import { hexToRgba } from "@/utils";

export const StyledError = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  background: hexToRgba(get(theme, "palette.error.main", ""), 0.1),
  borderRadius: theme?.shape?.borderRadius,
  padding: "8px 12px",
  marginTop: "10px",
  boxSizing: "border-box",
  "& svg path": {
    fill: theme?.palette?.error?.main,
  },
}));
