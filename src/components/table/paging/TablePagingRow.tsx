"use client";

import { ChangeEvent, FC, MouseEvent, useCallback, useMemo } from "react";
import { get } from "lodash";

import {
  StyledPagination,
  StyledStickyTableRow,
  StyledTablePagination,
} from "./TablePagingRow.style";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface TablePagingRowProps {
  dataLength?: number;
  colSpan?: number;
  rowsPerPageOptions?: Array<number>;
}

const TablePagingRow: FC<TablePagingRowProps> = ({
  dataLength = 0,
  colSpan = 0,
  rowsPerPageOptions = [10, 20, 30, 50, 100, 200],
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = useMemo(() => {
    const paramPage = Number(searchParams.get("page"));
    if (isNaN(paramPage) || paramPage < 1) {
      return 1;
    } else return paramPage;
  }, [searchParams]);

  const limit = useMemo(() => {
    const paramLimit = Number(searchParams.get("limit"));
    if (isNaN(paramLimit) || paramLimit < 1) {
      return 100;
    } else return paramLimit;
  }, [searchParams]);

  const createQueryString = useCallback(
    (name: string, value?: any) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      if (name === "limit") {
        params.delete("page");
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent> | null,
    newPage: number
  ) => {
    if (newPage === 1) {
      router.push(pathname + "?" + createQueryString("page"));
    } else {
      router.push(pathname + "?" + createQueryString("page", newPage));
    }
  };

  const onPageChangePagination = (
    event: ChangeEvent<unknown>,
    newPage: number
  ) => {
    if (newPage === 1) {
      router.push(pathname + "?" + createQueryString("page"));
    } else {
      router.push(pathname + "?" + createQueryString("page", newPage));
    }
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const newLimit = String(get(event, "target.value"));
    if (newLimit === "100") {
      router.push(pathname + "?" + createQueryString("limit"));
    } else {
      router.push(pathname + "?" + createQueryString("limit", newLimit));
    }
  };

  return (
    <StyledStickyTableRow sx={{ bottom: 0 }}>
      <StyledTablePagination
        count={dataLength}
        page={page - 1}
        colSpan={colSpan}
        rowsPerPage={limit}
        onPageChange={handleChangePage}
        // onChange={handleChangePage}
        rowsPerPageOptions={rowsPerPageOptions}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={({
          page: comPage,
          count,
          onPageChange,
          ...props
        }) => {
          return (
            <StyledPagination
              page={comPage + 1}
              shape="rounded"
              count={Math.ceil(count / limit)}
              //   onChange={(event,  ) => {}}
              onChange={onPageChangePagination}
            />
          );
        }}
        sx={{
          border: "none",
          "& > .MuiToolbar-root": {
            width: "100% !important",
          },
        }}
      />
    </StyledStickyTableRow>
  );
};

export default TablePagingRow;
