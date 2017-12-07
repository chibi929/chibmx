import { RequestHandler } from '../request-handler';
import { PostRequest } from './post-request';
import { IPostResponse } from './post-response';
import { IDFRequest, IDFResponse } from '../../interface/dialog-flow';

import { WebSocketManager } from '../../websocket/websocket-manager';

const imageMap = {
  "shenron": "image.gif",
  "kinoko": "image.png"
};

export class Shenrons extends RequestHandler {
  get(req): Promise<any> {
    return Promise.resolve({
      message: "Shenron GET"
    });
  }

  post(req: any): Promise<IDFResponse> {
    const postReq = new PostRequest(req);
    const resData: IPostResponse = {
      action: postReq.action,
      imageUrl: postReq.target ? `./res/${imageMap[postReq.target]}` : undefined
    };
    WebSocketManager.instance.getAll().forEach(ws => ws.send(JSON.stringify(resData)));
    return Promise.resolve({speech: " ", displayText: " "});
  }
}
