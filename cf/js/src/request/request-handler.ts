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
    console.log(`req.method: ${req.method}`);
    console.log(`req.params: ${JSON.stringify(req.params)}`);
    console.log(`req.query : ${JSON.stringify(req.query)}`);
    console.log(`req.body  : ${JSON.stringify(req.body)}`);

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
