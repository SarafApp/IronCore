export interface SuccessFeedback<Model> {
  handleSuccess(model: Model): Promise<void>;
}
