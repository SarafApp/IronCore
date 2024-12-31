import { DebounceAction } from "./DebounceAction";
import { Nullable } from "../types";

export class DebounceService {
  private readonly debounceTimeout: number;
  private action: DebounceAction;
  private timerId: Nullable<ReturnType<typeof setTimeout>> = null;

  constructor(action: DebounceAction, debounceTimeout: number = 500) {
    this.debounceTimeout = debounceTimeout;
    this.action = action;
  }

  public runAction() {
    this.cancelDebounce();
    this.action.runImmediate();
    this.timerId = setTimeout(() => {
      this.action.runDebounce();
    }, this.debounceTimeout);
  }

  private cancelDebounce() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }
}
