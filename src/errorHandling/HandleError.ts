import { ErrorHandler } from "./ErrorHandler";

export function HandleError(handlers: ErrorHandler[]) {
  return function (
    _name: unknown,
    _target: unknown,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: unknown[]) {
      try {
        return await originalMethod(...args);
      } catch (error) {
        for (const handler of handlers) {
          await handler.handleError(error as Error);
        }
        throw error;
      }
    };
  };
}
