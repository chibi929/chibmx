export interface IPostRequest {
  action: "show" | "hide";
  target?: "shenron" | "kinoko";
}

export class PostRequest {
  action: "show" | "hide";
  target?: "shenron" | "kinoko";

  constructor(req: any) {
    this.action = "show";
    this.target = req.body.result.parameters.Target;
  }
}
