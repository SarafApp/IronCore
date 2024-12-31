import { Nullable } from "../types";
import { ValidationMessages } from "../validators";

export class InputControlData<T> {
  public value: Nullable<T> = null;
  public initialValue: Nullable<T> = null;
  public name: string = "";
  public isValid: boolean = false;
  public isBlurSensitive: boolean = false;
  public isRequired: boolean = false;
  public isIncludeInRequestBody: boolean = false;
  public isChangeSensitive: boolean = false;
  public notValidMessage: ValidationMessages = ValidationMessages.Empty;
}
