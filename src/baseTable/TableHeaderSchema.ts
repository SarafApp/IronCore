import {
  CellType,
  HeaderType,
  LoadingStatus,
  SortOrder,
  TableHeaderAlign,
} from "../constants";
import { TABLE_COLUMN_DEFAULT_VALUES } from "./Constants";

export interface TableHeaderSchema<Model> {
  path: keyof Model;
  title: string;
  key: keyof Model;
  cellType?: CellType;
  align?: TableHeaderAlign;
  headerType?: HeaderType;
  colspan?: number;
  width?: string | number;
  ellipsis?: boolean;
  maxWidth?: number;
  minWidth?: number;
  resizable?: boolean;
  sortOrder?: SortOrder;
  sorter?: boolean;
}

export interface TableRenderingData<Model> {
  totalItems: number;
  currentPage: number;
  rows: Model[];
  loadingStatus: Set<LoadingStatus>;
}

export function generateHeader<Model>(
  header: TableHeaderSchema<Model>,
): TableHeaderSchema<Model> {
  return {
    ...TABLE_COLUMN_DEFAULT_VALUES,
    ...header,
  };
}
