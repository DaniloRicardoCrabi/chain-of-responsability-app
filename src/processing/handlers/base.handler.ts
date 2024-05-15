export abstract class BaseHandler implements Handler {
  private nextHandler: BaseHandler;

  public setNext(handler: BaseHandler): BaseHandler {
    this.nextHandler = handler;
    return handler;
  }

  public async handle(request: any): Promise<void> {
    if (this.nextHandler) {
      await this.nextHandler.handle(request);
    }
  }
}
