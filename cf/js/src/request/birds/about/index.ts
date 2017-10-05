import {RequestHandler} from '../../request-handler';

export class Index extends RequestHandler {
  get(req): Promise<any> {
    return Promise.resolve({
      message: "Calling the GET '/birds/about'."
    });
  }

  post(req): Promise<any> {
    return Promise.resolve({
      message: "Calling the POST '/birds/about'."
    });
  }
}
