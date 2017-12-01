import * as WebScoket from 'ws';

interface IConnection {
  [key: string]: WebScoket;
}

export class WebSocketManager {
  public static readonly instance: WebSocketManager = new WebSocketManager();
  private readonly connection: IConnection = {};

  private constructor() {
  }

  add(id: string, ws: WebScoket) {
    this.connection[id] = ws;
  }

  get(id: string): WebScoket {
    return this.connection[id];
  }

  getAll(): WebScoket[] {
    return Object.keys(this.connection).map(k => this.connection[k]);
  }

  deleteById(id: string): void {
    delete this.connection[id];
  }

  deleteByWS(ws: WebScoket): void {
    const key = Object.keys(this.connection).find(k => this.connection[k] === ws);
    delete this.connection[key];
  }

  debug(): void {
    console.log("CHIBI: " + Object.keys(this.connection).length);
  }
}
