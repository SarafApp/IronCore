import { toRaw } from "vue";
import { Nullable } from "../types";
import { InputControlData } from "./InputControlData";
import { isEmpty } from "../Utils";
import { ValidationMessages } from "../validators";
import { type Validator } from "../validators";

export class InputControl<T> {
  private initialData: Nullable<InputControlData<T>> = null;
  private data = new InputControlData<T>();
  private _validators: Validator<T>[] = [];
  private _id = Math.random();

  constructor(name: string, value: Nullable<T>) {
    this.data.value = value;
    this.data.name = name;
    if (this.shouldRunValidation()) {
      this.runValidation(true);
    }
  }

  private shouldRunValidation(): boolean {
    if (this.data.isRequired) return true;
    return !isEmpty(this.data.value);
  }

  public runValidation(isBlur: boolean = false) {
    for (const validator of this._validators) {
      const validationMessage = validator.validate(this.data.value);
      if (validationMessage) {
        this.setFormToInvalidState(isBlur, validationMessage);
        return;
      }
    }
    this.setFormToValidState();
  }

  private setFormToInvalidState(
    isBlur: boolean,
    validationMessage: ValidationMessages,
  ) {
    this.data.isValid = false;
    if (this.data.isChangeSensitive || isBlur) {
      this.setNotValidMessage(validationMessage);
    }
  }

  private setFormToValidState() {
    this.data.isValid = true;
    this.setNotValidMessage(ValidationMessages.Empty);
  }

  public reset() {
    if (this.initialData) {
      this.data = structuredClone(toRaw(this.initialData));
    } else {
      console.warn(
        "The " +
          this.data.name +
          `input control has no initial data,
          the initial data will be available after calling the [markAsInitial] method on this instance`,
      );
    }
  }

  public markAsInitial() {
    this.initialData = structuredClone(toRaw(this.data));
  }

  public setValidators(validators: Validator<T>[]) {
    this._validators = validators;
  }

  public getChangeSensitive() {
    return this.data.isChangeSensitive;
  }

  public setChangeSensitive(isChangeSensitive: boolean) {
    this.data.isChangeSensitive = isChangeSensitive;
  }

  public getIsBlurSensitive(): boolean {
    return this.data.isBlurSensitive;
  }

  public setIsBlurSensitive(isBlurSensitive: boolean) {
    this.data.isBlurSensitive = isBlurSensitive;
  }

  public getIsRequired(): boolean {
    return this.data.isRequired;
  }

  public setIsRequired(isRequired: boolean) {
    this.data.isRequired = isRequired;
  }

  public getIsValid() {
    return this.data.isValid;
  }

  public setIsValid(isValid: boolean) {
    this.data.isValid = isValid;
  }

  public getIsIncludeInRequestBody(): boolean {
    return this.data.isIncludeInRequestBody;
  }

  public setIsIncludeInRequestBody(isIncludeInRequestBody: boolean) {
    this.data.isIncludeInRequestBody = isIncludeInRequestBody;
  }

  public getNotValidMessage() {
    return this.data.notValidMessage;
  }

  private setNotValidMessage(notValidMessage: ValidationMessages) {
    this.data.notValidMessage = notValidMessage;
  }

  public getName() {
    return this.data.name;
  }

  public setName(name: string) {
    this.data.name = name;
  }

  public setId(id: number) {
    this._id = id;
  }

  public getId(): number {
    return this._id;
  }

  public set value(value: Nullable<T>) {
    this.data.value = value;
    if (this.shouldRunValidation()) {
      this.runValidation();
    }
  }

  public get value() {
    return this.data.value;
  }
}
