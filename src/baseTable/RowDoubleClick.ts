export interface RowDoubleClick<Model> {
  handleDoubleClick(row: Model): Promise<void>;
}
