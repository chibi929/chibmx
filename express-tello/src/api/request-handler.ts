import * as express from 'express';

interface IRequestHandler {
  post(req: express.Request): Promise<any>;
  put(req: express.Request): Promise<any>;
  get(req: express.Request): Promise<any>;
  delete(req: express.Request): Promise<any>;
}

export class RequestHandler implements IRequestHandler {
  execute(req: express.Request, res: express.Response): void {
    console.log("=== Execute ==================");
    console.log("req.originalUrl: " + req.originalUrl);
    console.log(`req.method: ${req.method}`);
    console.log(`req.params: ${JSON.stringify(req.params)}`);
    console.log(`req.query: ${JSON.stringify(req.query)}`);
    console.log(`req.body: ${JSON.stringify(req.body)}`);
    console.log("==============================");

    const method = req.method.toLowerCase();
    this[method](req).then(_res => {
      res.json(_res);
    }).catch(e => {
      res.status(500).json(e);
    });
  }

  post(req: express.Request): Promise<any> {
    return Promise.reject("Unsupported POST Method.");
  }

  put(req: express.Request): Promise<any> {
    return Promise.reject("Unsupported POST Method.");
  }

  get(req: express.Request): Promise<any> {
    return Promise.reject("Unsupported POST Method.");
  }

  delete(req: express.Request): Promise<any> {
    return Promise.reject("Unsupported POST Method.");
  }
}
