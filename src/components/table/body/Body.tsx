import { ChangeEvent, FC } from "react";
import { Skeleton, TableBody, TableCell, TableRow } from "@mui/material";
import { get } from "lodash";

import { PaginationTableColumnProps } from "@/types";
import { ICheckedType, ITableData } from "../PaginationTable";
import CustomCheckbox from "@/components/checkbox/CustomCheckbox";
// import { NoData } from "components/form";
// import { CustomCheckbox } from "components/common";

interface BodyProps {
  isChecked: boolean;
  checked: ICheckedType;
  isIndexing: boolean;
  data?: ITableData;
  cellLength: number;
  onRowClick: (item: any) => () => void;
  dataKey: string;
  params: object;
  columns?: Array<PaginationTableColumnProps>;
  onChecked?: (
    id: string
  ) => (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

const Body: FC<BodyProps> = ({
  isIndexing,
  checked,
  isChecked,
  data,
  cellLength,
  dataKey,
  params,
  columns = [],
  onRowClick,
  onChecked,
}) => {
  return (
    <TableBody>
      {get(data, "status") === "loading" ||
      get(data, "status") === "initial" ? (
        [...Array.from({ length: 7 })]?.map((_, index: number) => (
          <TableRow key={index}>
            {isChecked && (
              <TableCell>
                <Skeleton animation="wave" height={24} />
              </TableCell>
            )}
            {isIndexing && (
              <TableCell>
                <Skeleton animation="wave" height={24} />
              </TableCell>
            )}
            {columns?.map((_, colIndex) => (
              <TableCell key={`${index}_${colIndex}`}>
                <Skeleton animation="wave" height={24} />
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : get(data, "status") === "failed" ? (
        <TableRow>
          <TableCell colSpan={cellLength}></TableCell>
        </TableRow>
      ) : get(data, "data.length", 0) > 0 ? (
        get(data, "data", [])?.map((item, index) => {
          const isOther = checked?.others?.includes(get(item, dataKey));
          return (
            <TableRow
              hover
              onClick={onRowClick(item)}
              key={get(item, dataKey, index)}
            >
              {isChecked && (
                <TableCell onClick={(event) => event.stopPropagation()}>
                  <CustomCheckbox
                    checked={get(checked, "all", false) ? !isOther : isOther}
                    onChange={onChecked && onChecked(get(item, dataKey))}
                  />
                </TableCell>
              )}
              {isIndexing && (
                <TableCell>
                  {(get(params, "page", 1) - 1) * get(params, "limit", 100) +
                    index +
                    1}
                </TableCell>
              )}
              {columns?.map(
                ({ renderComponent, padding, ...column }, colIndex) => (
                  <TableCell
                    padding={
                      typeof padding === "function"
                        ? padding(item)
                        : typeof padding === "string"
                        ? padding
                        : undefined
                    }
                    key={`${get(item, dataKey, index)}_${colIndex}`}
                  >
                    {renderComponent
                      ? renderComponent(item, index)
                      : column?.field
                      ? get(item, column?.field, column?.defaultValue)
                      : ""}
                  </TableCell>
                )
              )}
            </TableRow>
          );
        })
      ) : (
        <TableRow>
          <TableCell
            height="100%"
            colSpan={cellLength}
            sx={{ textAlign: "center" }}
          >
            No data :(
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default Body;
