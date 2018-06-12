import * as express from 'express';
import { TelloClient, FlipCommand } from 'tello-api-client';
import { RequestHandler } from '../request-handler';

import { TelloRequest } from './tello-request';

export class TelloApi extends RequestHandler {
  get(req: express.Request): Promise<any> {
    const reqGet = new TelloRequest.Get(req);
    const tello = new TelloClient('192.168.10.1', 8889);
    const cmd = reqGet.cmdType;

    switch(cmd) {
    case TelloRequest.CmdType.Takeoff:
      tello.command();
      tello.takeoff();
      break;
    case TelloRequest.CmdType.Land:
      tello.command();
      tello.land();
      break;
    case TelloRequest.CmdType.Forward:
      tello.command();
      tello.forward(50);
      break;
    case TelloRequest.CmdType.BackFlip:
      tello.command();
      tello.flip(FlipCommand.Back);
      break;
    default:
      return Promise.reject(new Error(`Unsupported CmdType: ${cmd}`));
    }
    
    return Promise.resolve({
      message: `Calling the GET '/tello' :  cmd = ${reqGet.cmdType}`
    });
  }
}
