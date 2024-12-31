import { SortDetail } from "../sort";
import { TableRenderingData } from "./TableHeaderSchema";

export interface TableService<Model> {
  fetchRows(): Promise<Model[]>;
  paginate(nextPage: number, pageSize: number): Promise<Model[]>;
  sort(sortDetail: SortDetail<Model>): Promise<Model[]>;
  getData(): TableRenderingData<Model>;
}
