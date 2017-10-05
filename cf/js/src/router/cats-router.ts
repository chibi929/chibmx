import * as express from 'express';
import {Index as Cats} from '../request/cats';
import {Index as CatsAbout} from '../request/cats/about';

export class CatsRouter {
  private static readonly cats = new Cats();
  private static readonly catsAbout = new CatsAbout();

  static getRouter() {
    const handlers = [
      { method: "get", api: "/", instance: this.cats },
      { method: "get", api: "/about", instance: this.catsAbout },
      { method: "post", api: "/about", instance: this.catsAbout }
    ];
    
    const router = express.Router();
    handlers.forEach(h => {
      router[h.method](h.api, h.instance.execute.bind(h.instance));
    });
    return router;
  }
}
