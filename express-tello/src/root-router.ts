import * as express from 'express';
import { TelloRouter } from './api/tello';

export class RootRouter {
  static getRouter() {
    const router = express.Router();
    router.use("/tello", TelloRouter.getRouter());
    return router;
  }
}
