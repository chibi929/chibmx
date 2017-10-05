export interface IReqeustHandler {
  post(req): any;
  put(req): any;
  get(req): any;
  delete(): any;
}

export class RequestHandler implements IReqeustHandler {
  constructor() {
  }

  execute(req, res) {
    const method = req.method.toLowerCase();
    this[method](req).then(_res => {
      res.json(_res);
    }).catch(e => {
      res.status(500).json(e);
    });
  }

  post(req): Promise<any> {
    return Promise.reject("Unsupported POST Method.");
  }

  put(req): Promise<any> {
    return Promise.reject("Unsupported POST Method.");
  }

  get(req): Promise<any> {
    return Promise.reject("Unsupported POST Method.");
  }

  delete(): Promise<any> {
    return Promise.reject("Unsupported POST Method.");
  }
}
