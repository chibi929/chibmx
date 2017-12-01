import * as express from 'express';
import {BardsRouter} from './bards-router';
import {CatsRouter} from './cats-router';
import {ShenronsRouter} from './shenrons-router';

export class RootRouter {
  static getRouter() {
    const router = express.Router();
    router.use("/birds", BardsRouter.getRouter());
    router.use("/cats", CatsRouter.getRouter());
    router.use("/shenrons", ShenronsRouter.getRouter());
    return router;
  }
}
