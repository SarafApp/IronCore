import { BaseModel } from "../BaseModel";
import { Nullable } from "../types";
import { Params } from "./Params";

export interface Repository<Model extends BaseModel> {
  /**
   * Fetches a list of items based on optional query parameters.
   * @param query - Optional query parameters.
   * @returns A promise resolving to an array of items or undefined.
   */
  fetchList(query?: Params): Promise<Model[]>;

  /**
   * Fetches a single item by its ID.
   * @param id - ID of the item to retrieve.
   * @returns A promise resolving to the fetched item or undefined.
   */
  fetchItemById(id: number): Promise<Nullable<Model>>;

  /**
   * Creates a new item.
   * @param body - Data for creating the item.
   * @returns A promise resolving to the created item or undefined.
   */
  createItem<Body>(body: Body): Promise<Nullable<Model>>;

  /**
   * Updates an existing item by its ID.
   * @param id - ID of the item to update.
   * @param body - Updated data for the item.
   * @returns A promise resolving to the updated item or undefined.
   */
  updateItem<Body>(id: number, body: Body): Promise<Nullable<Model>>;

  /**
   * Deletes an item by its ID.
   * @param id - ID of the item to delete.
   * @returns A promise resolving to a boolean indicating if the deletion was successful.
   */
  deleteItem(id: number): Promise<boolean>;
}
