import { TableHeaderSchema } from "./TableHeaderSchema";
import { BaseModel } from "../BaseModel";
import { CellType, HeaderType, TableHeaderAlign } from "../constants";

export const TABLE_COLUMN_DEFAULT_WIDTH = "150px";
export const TABLE_COLUMN_DEFAULT_COLSPAN = 2;

export const TABLE_ACTION_COLUMN: TableHeaderSchema<BaseModel> = {
  path: "id",
  key: "id",
  title: "عملیات",
  colspan: TABLE_COLUMN_DEFAULT_COLSPAN,
  width: TABLE_COLUMN_DEFAULT_WIDTH,
  cellType: CellType.ACTION,
  align: TableHeaderAlign.Center,
  headerType: HeaderType.Text,
};

export const TABLE_COLUMN_DEFAULT_VALUES = {
  width: TABLE_COLUMN_DEFAULT_WIDTH,
  align: TableHeaderAlign.Center,
  headerType: HeaderType.Text,
  cellType: CellType.Text,
  colspan: TABLE_COLUMN_DEFAULT_COLSPAN,
};
