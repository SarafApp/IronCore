import { InputControl } from "./InputControl";
import { Validator } from "../validators";

export class InputControlBuilder<T> {
  private _inputControl: InputControl<T>;

  constructor(inputControl: InputControl<T>) {
    this._inputControl = inputControl;
  }

  public setValidators(validators: Validator<T>[]) {
    this._inputControl.setValidators(validators);
    return this;
  }

  public setChangeSensitive() {
    this._inputControl.setChangeSensitive(true);
    return this;
  }

  public setRequired() {
    this._inputControl.setIsRequired(true);
    return this;
  }

  public setValid() {
    this._inputControl.setIsValid(true);
    return this;
  }

  public setBlurSensitive() {
    this._inputControl.setIsBlurSensitive(true);
    return this;
  }

  public setId(id: number) {
    this._inputControl.setId(id);
    return this;
  }

  public build(): InputControl<T> {
    return this._inputControl;
  }
}
