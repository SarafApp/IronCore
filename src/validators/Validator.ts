import { Nullable } from "../types";
import { ValidationMessages } from "./Constants";

export interface Validator<T> {
  validate(value: Nullable<T>): ValidationMessages;
}
