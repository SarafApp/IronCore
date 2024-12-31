import { SortOrder } from "../constants";

export class SortDetail<T> {
  public key: keyof T;
  public order: SortOrder;

  constructor(key: keyof T, order: SortOrder) {
    this.key = key;
    this.order = order;
  }
}
