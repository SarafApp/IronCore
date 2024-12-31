import { SortDetail } from "../sort";

export interface TableSort<Model> {
  handleSort(sortDetail: SortDetail<Model>): Promise<void>;
}
