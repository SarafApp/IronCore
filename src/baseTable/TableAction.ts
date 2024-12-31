export interface TableAction<Model> {
  readonly actionName: string;
  handler(row: Model): Promise<void>;
}
