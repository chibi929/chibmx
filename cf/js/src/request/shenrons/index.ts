import {RequestHandler} from '../request-handler';

export class Index extends RequestHandler {
  get(req): Promise<any> {
    return Promise.resolve({
      message: "Shenron GET"
    });
  }
  
  post(req): Promise<any> {
    return Promise.resolve({
      message: "Shenron POST"
    });
  }
}
