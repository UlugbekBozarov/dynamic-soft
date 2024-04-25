"use client";

import { FC, SyntheticEvent, useCallback, useState } from "react";
import { Box } from "@mui/material";
import { get } from "lodash";

import { ITabsValue } from "../PaginationTable";
import { AntTab, AntTabs, StyledChip } from "./PaginationTableTabs.style";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationTableTabsProps {
  paramKey?: string;
  value?: string | undefined;
  values: Array<ITabsValue>;
}

const PaginationTableTabs: FC<PaginationTableTabsProps> = ({
  paramKey,
  value,
  values,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [tabValue, setTabValue] = useState<"all" | any>(value ? value : "all");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "all") {
        params.delete(name);
      } else {
        params.set(name, value);
      }

      return params.toString();
    },
    [searchParams]
  );

  const handleChange = (event: SyntheticEvent<Element, Event>, value: any) => {
    if (paramKey) {
      setTabValue(value);
      router.push(pathname + "?" + createQueryString(paramKey, value));
    }
  };

  return (
    <Box sx={{ position: "sticky", left: 0 }}>
      {get(values, "length", 0) ? (
        <AntTabs
          //`${value ? String(value) : "all"}`
          value={tabValue}
          textColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          indicatorColor="secondary"
          onChange={handleChange}
        >
          {values?.map((item, index) => (
            <AntTab
              icon={
                <StyledChip
                  size="small"
                  variant={
                    get(item, "valueKey") === value ? "filled" : undefined
                  }
                  color={get(item, "color")}
                  label={get(item, "value", "0")}
                />
              }
              iconPosition="end"
              value={String(get(item, "valueKey", "all"))}
              label={get(item, "labelKey")}
              key={index}
            />
          ))}
        </AntTabs>
      ) : (
        ""
      )}
    </Box>
  );
};

export default PaginationTableTabs;
