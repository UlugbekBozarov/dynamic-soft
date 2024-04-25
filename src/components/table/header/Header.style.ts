import { TableRow, styled } from "@mui/material";

export const StyledStickyTableRow = styled(TableRow)(({ theme }) => ({
  position: "sticky",
  background: theme?.palette?.background?.paper,
  zIndex: 99,
}));
