"use client";
"use strict";

import { Box, Button, TextField } from "@mui/material";
import { debounce, get } from "lodash";
import dayjs from "dayjs";

import PaginationTable from "@/components/table/PaginationTable";
import { LayoutMain, Status } from "@/components";
import {
  IUser,
  useGetUsersQuery,
} from "@/provider/redux/features/users/UsersApi";
import { DATE_FORMAT } from "@/constants/DateFormat";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

export default function Users() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const status = searchParams.get("status")
    ? searchParams.get("status") === "active"
    : undefined;

  const createQueryString = useCallback(
    (name: string, value?: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      return params.toString();
    },
    [searchParams]
  );

  const { data, isSuccess, isLoading, error, refetch } = useGetUsersQuery(
    searchParams.toString()
  );

  useMemo(() => {
    refetch;
  }, [searchParams]);

  const handleChangeParams = () => {};

  const handleChangeSearch = debounce((event) => {
    router.push(
      pathname + "?" + createQueryString("name", get(event, "target.value"))
    );
  }, 300);

  const goToAdd = () => {
    router.push(pathname + "/add");
  };

  const goToAddEdit = (user: IUser) => {
    router.push(pathname + "/" + user?.id);
  };

  return (
    <LayoutMain>
      <Box id="filter-wrapper-id">
        <Box display="flex" justifyContent="space-between" pb="20px">
          <Box>
            <Button size="medium" variant="contained" onClick={goToAdd}>
              add +
            </Button>
          </Box>
          <Box>
            <TextField
              size="small"
              type="search"
              onChange={handleChangeSearch}
              placeholder="Search..."
            />
          </Box>
        </Box>
      </Box>
      <PaginationTable
        isChecked={false}
        tabKey="status"
        tabValue={status}
        onRowClick={goToAddEdit}
        isLoading={isLoading}
        isSuccess={isSuccess}
        error={error}
        data={data}
        tabs={[
          {
            valueKey: undefined,
            labelKey: "All",
            color: "primary",
          },
          {
            valueKey: true,
            labelKey: "Active",
            color: "success",
          },
          {
            valueKey: false,
            labelKey: "Inactive",
            color: "error",
          },
        ]}
        columns={[
          {
            width: 70,
            headerKey: "Status",
            field: "status",
            renderComponent: (item: IUser) => (
              <Status value={get(item, "status")} />
            ),
          },
          {
            width: 170,
            headerKey: "Created at",
            field: "createdAt",
            renderComponent: (item: IUser) => {
              return dayjs(get(item, "createdAt", "")).format(
                DATE_FORMAT.dateAndTime
              );
            },
          },
          {
            width: 250,
            headerKey: "Name",
            field: "name",
          },
          {
            headerKey: "Phone number",
            field: "phoneNumber",
          },
          {
            headerKey: "Address",
            field: "address",
          },
        ]}
      />
    </LayoutMain>
  );
}
