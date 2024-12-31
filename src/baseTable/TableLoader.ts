export interface TableLoader<Model> {
  loadRows(): Promise<Model>;
}
