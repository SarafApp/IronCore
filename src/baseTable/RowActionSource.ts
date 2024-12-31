import { TableAction } from "./TableAction";

export interface RowActionSource<Model> {
  getActions(): TableAction<Model>[];
}
