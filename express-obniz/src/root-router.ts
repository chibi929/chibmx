import * as express from 'express';
import { ObnizRouter } from './api/obniz';

export class RootRouter {
  static getRouter() {
    const router = express.Router();
    router.use("/obniz", ObnizRouter.getRouter());
    return router;
  }
}
