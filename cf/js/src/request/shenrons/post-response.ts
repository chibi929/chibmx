export interface IPostResponse {
  action: "show" | "hide";
  imageUrl?: string;
}

export class PostResponse {
  action: "show" | "hide";
  imageUrl?: string;

  constructor(res: IPostResponse) {
    this.action = res.action;
    this.imageUrl = res.imageUrl;
  }
}
