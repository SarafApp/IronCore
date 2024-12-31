import { SortDetail } from "../sort";
import { TableHeaderSchema } from "./TableHeaderSchema";
import { BaseModel } from "../BaseModel";
import { SortOrder } from "../constants";
import { TableService } from "./TableService";
import { TableAction } from "./TableAction";

export abstract class BaseTable<Model extends BaseModel> {
  protected service: TableService<Model>;
  private currentPage: number = 1;
  private currentPageSize: number = 10;
  private currentSortDetail: SortDetail<Model> = new SortDetail(
    "id",
    SortOrder.DESC,
  );
  public headerSchema: TableHeaderSchema<Model>[] = [];
  public rowActions: TableAction<Model>[] = [];

  protected constructor(service: TableService<Model>) {
    this.service = service;
  }

  public async load() {
    this.headerSchema = await this.loadHeader();
    await this.loadRows();
    this.rowActions = this.getActions();
  }

  public async sort(sortDetail: SortDetail<Model>) {
    if (!this.shouldSendSortRequest(sortDetail)) return;
    this.currentSortDetail = sortDetail;
    await this.handleSort(this.currentSortDetail);
  }

  private shouldSendSortRequest(sortDetail: SortDetail<Model>): boolean {
    return (
      sortDetail.key !== this.currentSortDetail.key ||
      sortDetail.order !== this.currentSortDetail.order
    );
  }

  public async paginate(nextPage: number, pageSize: number) {
    if (!this.shouldSendPaginationRequest(nextPage, pageSize)) return;
    this.currentPage = nextPage;
    this.currentPageSize = pageSize;
    await this.handlePagination(this.currentPage, this.currentPageSize);
  }

  private shouldSendPaginationRequest(
    nextPage: number,
    pageSize: number,
  ): boolean {
    return this.currentPage !== nextPage || this.currentPageSize !== pageSize;
  }

  protected async loadRows() {
    return await this.service.fetchRows();
  }

  public getData() {
    return this.service.getData();
  }

  protected async handleSort(sortDetail: SortDetail<Model>) {
    await this.service.sort(sortDetail);
  }

  protected async handlePagination(nextPage: number, pageSize: number) {
    await this.service.paginate(nextPage, pageSize);
  }

  public getActions(): TableAction<Model>[] {
    return [];
  }

  public async handleClick(row: Model) {
    return;
  }
  public async handleMetaClick(row: Model) {
    return;
  }
  public async handleDoubleClick(row: Model) {
    return;
  }
  public async onDestroy() {
    return;
  }
  protected abstract loadHeader(): Promise<TableHeaderSchema<Model>[]>;
}
