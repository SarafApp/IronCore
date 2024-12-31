import { InputControl } from "./InputControl";

export class FormManager {
  private _inputControls = new Map<string, InputControl<unknown>>();
  private _isValid: boolean = false;
  private _id: number = Math.random();

  public getInputControlsAsArray(): InputControl<unknown>[] {
    return Array.from(this._inputControls.values());
  }

  public runValidation() {
    for (const inputControl of this.getInputControlsAsArray()) {
      const isInputValid = inputControl.getIsValid();
      if (!isInputValid) {
        this._isValid = false;
        return;
      }
    }
    this._isValid = true;
  }

  public addInputControls(inputControls: InputControl<unknown>[]) {
    for (const inputControl of inputControls) {
      this._inputControls.set(inputControl.getName(), inputControl);
    }
  }

  public getInputControl<T>(inputControlName: string) {
    const inputControl = this._inputControls.get(inputControlName);
    if (!inputControl) {
      throw new Error(
        `The provided input name (${inputControlName}}) has no controls.`,
      );
    }
    return inputControl as InputControl<T>;
  }

  public resetControls(inputControlNames: string[]) {
    for (const inputName of inputControlNames) {
      const inputToReset = this._inputControls.get(inputName);
      if (inputToReset) {
        inputToReset.reset();
      } else {
        console.warn(
          `Provided input name ${inputName} has no controllers in this form`,
        );
      }
    }
  }

  public resetAll() {
    for (const inputControl of this.getInputControlsAsArray()) {
      inputControl.reset();
    }
  }

  public createRequestBody<T>() {
    const requestBody: Record<string, unknown> = {};

    for (const inputControl of this.getInputControlsAsArray()) {
      requestBody[inputControl.getName()] = inputControl.value;
    }

    return requestBody as T;
  }

  public setIsValid(isValid: boolean): void {
    this._isValid = isValid;
  }
  public getIsValid() {
    return this._isValid;
  }

  public setId(id: number) {
    this._id = id;
  }
  public getId() {
    return this._id;
  }
}
