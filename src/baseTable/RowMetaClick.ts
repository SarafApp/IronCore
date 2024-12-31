export interface RowMetaClick<Model> {
  handleMetaClick(row: Model): Promise<void>;
}
