import { RequestHandler } from '../request-handler';
import { PostRequest } from './post-request';
import { IPostResponse, PostResponse } from './post-response';

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

  /**
   * [Request]
   *   action: string
   *   target?: string
   *
   * [Response]
   *   action: string
   *   imageUrl?: string
   */
  post(req): Promise<IPostResponse> {
    const postReq = new PostRequest(req);
    const resData: IPostResponse = {
      action: postReq.action,
      imageUrl: postReq.target ? `./res/${imageMap[postReq.target]}` : undefined
    };
    WebSocketManager.instance.getAll().forEach(ws => ws.send(JSON.stringify(resData)));
    return Promise.resolve(new PostResponse(resData));
  }
}
