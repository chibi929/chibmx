import * as express from 'express';
import { TelloApi } from './tello-api';
import { IRouterHandler, RouterHelper } from '../../helper/router-helper';

export class TelloRouter {
  private static readonly telloApi = new TelloApi();
  
  static getRouter() {
    const handlers: IRouterHandler[] = [
      { method: "get", api: "/", instance: this.telloApi }
    ];
    return RouterHelper.registerHandler(handlers);
  }
}
