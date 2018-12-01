import * as express from 'express';
import { ObnizRouter, ObnizRouterV2 } from './api/obniz';

export class RootRouter {
  static getRouter() {
    const router = express.Router();
    router.use('/obniz', ObnizRouter.getRouter());
    router.use('/obniz/v2', ObnizRouterV2.getRouter());
    return router;
  }
}
