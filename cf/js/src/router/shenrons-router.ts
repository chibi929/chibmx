import * as express from 'express';
import { Shenrons } from '../api/shenrons/shenrons';

export class ShenronsRouter {
  private static readonly shenrons = new Shenrons();

  static getRouter() {
    const handlers = [
      { method: "post", api: "/", instance: this.shenrons },
      { method: "get", api: "/", instance: this.shenrons }
    ];

    const router = express.Router();
    handlers.forEach(h => {
      router[h.method](h.api, h.instance.execute.bind(h.instance));
    });
    return router;
  }
}
