import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Chip } from "@mui/material";
import { get } from "lodash";

import { hexToRgba } from "@/utils";

export const AntTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: get(theme, "palette.text.primary"),
  },
}));

export const AntTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  minWidth: 0,
  minHeight: "48px",
  [theme.breakpoints.up("sm")]: {
    minWidth: 0,
  },
  fontWeight: "bold",
  marginRight: theme.spacing(1),
  color: get(theme, "palette.text.secondary"),
  "&.Mui-selected": {
    color: get(theme, "palette.text.primary"),
  },
}));

export const StyledChip = styled(Chip)(({ theme, variant, color }) => ({
  fontWeight: "bold",
  borderRadius: "6px",
  color:
    variant === "filled"
      ? get(theme, `palette.${color}.contrastText`)
      : get(theme, `palette.${color}.light`),
  backgroundColor: color
    ? hexToRgba(
        get(theme, `palette.${color}.light`),
        variant === "filled" ? 1 : 0.15
      )
    : get(theme, "palette.text.primary"),
}));
