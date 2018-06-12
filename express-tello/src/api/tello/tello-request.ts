import * as express from 'express';


export namespace TelloRequest {
  
  export enum CmdType {
    Takeoff = 'takeoff',
    Land = 'land',
    Forward = 'forward',
    BackFlip = 'backflip'
  }

  export class Get {
    readonly cmdType: CmdType;

    constructor(req: express.Request) {
      this.cmdType = req.query.cmd;
    }
  }
}
