export interface FailureFeedback<ErrorModel> {
  handleFailure(error: ErrorModel): Promise<void>;
}
