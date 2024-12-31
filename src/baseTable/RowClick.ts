export interface RowClick<Model> {
  handleClick(row: Model): Promise<void>;
}
