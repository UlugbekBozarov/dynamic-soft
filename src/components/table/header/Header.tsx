import { ChangeEvent, FC } from "react";
import {
  Box,
  IconButton,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  useTheme,
} from "@mui/material";
import { get } from "lodash";

import CustomCheckbox from "@/components/checkbox/CustomCheckbox";
import { PaginationTableColumnProps } from "@/types";
import { Delete } from "@/assets/icons";

import { ICheckedType } from "../PaginationTable";
import { StyledStickyTableRow } from "./Header.style";

interface TableHeaderProps {
  isChecked?: boolean | undefined;
  checked: ICheckedType;
  isIndexing?: boolean | undefined;
  sort?: any;
  sortName: string;
  columns?: Array<PaginationTableColumnProps>;
  onChecked?: (
    id: string
  ) => (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

const Header: FC<TableHeaderProps> = ({
  isChecked,
  isIndexing,
  sort,
  sortName,
  columns = [],
  checked,
  onChecked,
}) => {
  // let [, setSearchParams] = useSearchParams();

  const { palette } = useTheme();

  const createSortHandler = (field?: string | undefined) => () => {
    // setSearchParams((params) => {
    //   if (field) {
    //     const sort = params.get(sortName)
    //       ? JSON.parse(params.get(sortName) || "")
    //       : null;
    //     if (get(sort, "field") === field) {
    //       if (get(sort, "direction") === "desc") {
    //         params.delete(sortName);
    //       } else {
    //         if (field === "createdAt") {
    //           params.delete(sortName);
    //         } else {
    //           params.set(
    //             sortName,
    //             JSON.stringify({
    //               field,
    //               direction: "desc",
    //             })
    //           );
    //         }
    //       }
    //     } else {
    //       params.set(
    //         sortName,
    //         JSON.stringify({
    //           field,
    //           direction: "asc",
    //         })
    //       );
    //     }
    //   }
    //   return params;
    // });
  };

  return (
    <TableHead
      sx={{
        position: "relative",
        zIndex: 9,
      }}
    >
      <StyledStickyTableRow sx={{ top: 0 }}>
        {isChecked && (
          <TableCell
            component="th"
            width="60px"
            sx={{ backgroundColor: "rgba(0, 0, 0, 0.06)" }}
          >
            <CustomCheckbox
              checked={get(checked, "all", false)}
              indeterminate={!!get(checked, "others.length", 0)}
              onChange={onChecked && onChecked("all")}
              sx={{ zIndex: 999 }}
            />
            {get(checked, "all", false) || get(checked, "others.length", 0) ? (
              <Box
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                px="16px"
                zIndex={99}
                sx={{
                  backgroundColor: get(palette, "primary.light"),
                }}
              >
                <Box>
                  <IconButton size="large">
                    <Delete width="24" height="24" />
                  </IconButton>
                </Box>
              </Box>
            ) : (
              ""
            )}
          </TableCell>
        )}
        {isIndexing && (
          <TableCell component="th" width="60px">
            №
          </TableCell>
        )}
        {columns?.map((column, index) => (
          <TableCell
            width={
              get(column, "width") ? `${get(column, "width")}px` : undefined
            }
            align={get(column, "type", "text") === "number" ? "right" : "left"}
            sx={{
              minWidth: get(column, "width")
                ? `${get(column, "width")}px`
                : undefined,
              backgroundColor: "rgba(0, 0, 0, 0.06)",
            }}
            key={index}
          >
            {get(column, "sortable", true) ? (
              <TableSortLabel
                active={
                  get(sort, "field") === get(column, "field") ||
                  (sort === null && get(column, "field") === "createdAt")
                }
                direction={
                  sort === null && get(column, "field") === "createdAt"
                    ? "desc"
                    : get(sort, "field") === get(column, "field")
                    ? get(sort, "direction")
                    : "asc"
                }
                onClick={createSortHandler(get(column, "field"))}
              >
                {get(column, "headerKey")
                  ? get(column, "headerKey", "")
                  : get(column, "header", "")}
              </TableSortLabel>
            ) : get(column, "headerKey") ? (
              get(column, "headerKey", "")
            ) : (
              get(column, "header", "")
            )}
          </TableCell>
        ))}
      </StyledStickyTableRow>
    </TableHead>
  );
};

export default Header;
