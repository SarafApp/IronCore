import { SortDetail } from "../sort";
import { SortOrder } from "../constants";
import { BaseModel } from "../BaseModel";

export class Params {
  pageNumber: number = 1;
  itemCount: number = 20;
  sortDetail: SortDetail<BaseModel> = new SortDetail("id", SortOrder.DESC);
  filters: { key: string; value: unknown }[] = [];
}
