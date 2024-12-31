import { AxiosError } from "axios";
import { Nullable } from "../types";
import { ErrorHandler } from "../errorHandling";

export class APIErrorHandlerRegistry {
  private static handlers: Map<number, ErrorHandler> = new Map();
  private static instance: Nullable<APIErrorHandlerRegistry> = null;

  private constructor() {}

  static GetInstance() {
    if (!APIErrorHandlerRegistry.instance) {
      APIErrorHandlerRegistry.instance = new APIErrorHandlerRegistry();
    }
    return APIErrorHandlerRegistry.instance;
  }

  public static registerHandler(statusCode: number, handler: ErrorHandler) {
    APIErrorHandlerRegistry.handlers.set(statusCode, handler);
  }

  public handle(error: AxiosError) {
    const status = error.response?.status ?? 0;
    const handler = APIErrorHandlerRegistry.handlers.get(status);
    if (handler) {
      handler.handleError(error);
    }
  }
}
