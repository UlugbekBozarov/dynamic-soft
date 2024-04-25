import { Pagination, TablePagination, TableRow, styled } from "@mui/material";

export const StyledStickyTableRow = styled(TableRow)(({ theme }) => ({
  position: "sticky",
  background: theme?.palette?.background?.paper,
  zIndex: 99,
}));

export const StyledTablePagination = styled(TablePagination)({
  overflow: "initial",
  "& div.MuiToolbar-root": {
    position: "sticky",
    width: "calc(100vw - 86px)",
    // right: 0,
    left: 0,
  },
  "@media(min-width: 768px)": {
    "& div.MuiToolbar-root": {
      width: "620px",
    },
  },
});

export const StyledPagination = styled(Pagination)({
  "& ul": {
    flexWrap: "nowrap",
  },
  "& .MuiPaginationItem-page, .MuiPaginationItem-ellipsis": {
    display: "none",
  },
  "@media(min-width: 768px)": {
    "& .MuiPaginationItem-page, .MuiPaginationItem-ellipsis": {
      display: "inline-flex",
    },
  },
});
