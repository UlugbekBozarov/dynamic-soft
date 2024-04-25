import { Dispatch, ReactNode, SetStateAction } from "react";

export type generateNameFnType = (name: string) => string;

export type RenderComponentProps = {
  data: object;
  generateFormName: generateNameFnType;
  onDataChange: (
    field: string,
    value: any,
    oldValue?: any | undefined,
    productId?: string
  ) => void;
  rowIndex: number;
};

export type ColumnProps = {
  headerKey?: string;
  type?: "text" | "number" | "image";
  header?: string;
  field: string;
  width?: number;
  defaultValue?: string | number | undefined;
  renderComponent?: (data: RenderComponentProps) => string | ReactNode;
  totalText?: boolean;
  renderFooter?: (total: object) => string | ReactNode;
  totalKey?: string;
};

export type PaginationTableColumnProps = {
  headerKey?: string;
  type?: "text" | "number" | "image";
  header?: string;
  field?: string;
  width?: number;
  padding?:
    | ((item: any) => "checkbox" | "normal" | "none")
    | "checkbox"
    | "normal"
    | "none"
    | undefined;
  sortable?: boolean;
  defaultValue?: string | number | undefined;
  renderComponent?: (data: any, index: number) => any;
};

export type RowProps = {
  name: string;
  isIndexing: boolean;
  columns: Array<ColumnProps>;
  rowIndex: number;
  item: any;
  setTotal: Dispatch<SetStateAction<object>>;
  onDeleteItem?: (index: number) => void;
};
