import * as express from 'express';

export interface IRouterHandler {
  method: string;
  api: string;
  instance: any;
}

export class RouterHelper {
  static registerHandler(handlers: IRouterHandler[]): express.Router {
    const router = express.Router();
    handlers.forEach(h => {
      router[h.method](h.api, h.instance.execute.bind(h.instance));
    });
    return router;
  }
}
