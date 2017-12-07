import { IDFRequest } from '../../interface/dialog-flow';

export interface IPostRequest {
  action: "show" | "hide";
  target?: "shenron" | "kinoko";
}

export class PostRequest implements IPostRequest {
  action: "show" | "hide";
  target?: "shenron" | "kinoko";

  constructor(req: any) {
    this.action = "show";
    this.target = (<IDFRequest>req.body).result.parameters.Target;
  }
}
