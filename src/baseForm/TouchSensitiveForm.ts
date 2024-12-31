import { DirectiveBinding } from "vue";
import { MountedDirective } from "../baseDirective/MountedDirective";
import { BeforeUnMountDirective } from "../baseDirective/BeforeUnMountDirective";
import { Nullable } from "../types";
import { InputControl } from "./InputControl";

export class TouchSensitiveControl
  implements MountedDirective, BeforeUnMountDirective
{
  private inputControl: Nullable<InputControl<unknown>> = null;

  public mounted = (
    element: HTMLInputElement,
    binding: DirectiveBinding<InputControl<unknown>>,
  ) => {
    if (!binding.value) return;

    this.inputControl = binding.value;

    if (!this.inputControl.getIsBlurSensitive()) return;

    element.addEventListener("blur", this.handleBlur, true);
  };

  public beforeUnMount = (element: HTMLInputElement) => {
    element!.removeEventListener("blur", this.handleBlur);
  };

  private handleBlur = () => {
    this.inputControl!.runValidation(true);
  };
}
