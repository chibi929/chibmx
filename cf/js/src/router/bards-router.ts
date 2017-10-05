import * as express from 'express';
import {Index as Birds} from '../request/birds';
import {Index as BirdsAbout} from '../request/birds/about';

export class BardsRouter {
  private static readonly birds = new Birds();
  private static readonly birdsAbout = new BirdsAbout();

  static getRouter() {
    const handlers = [
      { method: "get", api: "/", instance: this.birds },
      { method: "get", api: "/about", instance: this.birdsAbout },
      { method: "post", api: "/about", instance: this.birdsAbout }
    ];

    const router = express.Router();
    handlers.forEach(h => {
      router[h.method](h.api, h.instance.execute.bind(h.instance));
    });
    return router;
  }
}
