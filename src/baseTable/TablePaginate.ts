export interface TablePaginate {
  handlePagination(nextPage: number, pageSize: number): Promise<void>;
}
