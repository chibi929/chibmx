export interface IPostRequest {
  action: "show" | "hide";
  target?: "shenron" | "kinoko";
}

export class PostRequest {
  action: "show" | "hide";
  target?: "shenron" | "kinoko";

  constructor(req: any) {
    this.action = req.body.action;
    this.target = req.body.target;
  }
}
