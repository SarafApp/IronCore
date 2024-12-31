export abstract class Feedback<Model, ErrorModel extends Error = Error> {
  protected successMessageResolver: (model: Model) => string;
  protected failureMessageResolver: (error: ErrorModel) => string;

  constructor(
    successMessageResolver: (model: Model) => string,
    failureMessageResolver: (error: ErrorModel) => string,
  ) {
    this.successMessageResolver = successMessageResolver;
    this.failureMessageResolver = failureMessageResolver;
  }

  public async handleSuccess(entity: Model) {
    return;
  }

  public async handleFailure(error: ErrorModel) {
    return;
  }

  public async handleInfo() {
    return;
  }

  public async handleWarning() {
    return;
  }
}
