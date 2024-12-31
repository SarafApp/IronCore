import { Feedback } from "./Feedback";

export function HandleFeedback<Model>(feedbacks: Feedback<Model>[]) {
  return function (
    _name: unknown,
    _target: unknown,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: unknown[]) {
      try {
        const result = await originalMethod(...args);
        for (const feedback of feedbacks) {
          await feedback.handleSuccess(result);
        }
        return result;
      } catch (error) {
        for (const feedback of feedbacks) {
          await feedback.handleFailure(error as Error);
        }
        throw error;
      }
    };
  };
}
