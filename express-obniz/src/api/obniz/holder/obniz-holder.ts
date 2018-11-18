import * as Obniz from 'obniz';

export class ObnizHolder {
  static readonly obniz;
  static readonly connected: boolean;

  static connect(obnizId: string): void {
    if (this.obniz && this.connected) {
      throw new Error('Already connected.');
    }

    (<any>this.obniz) = new Obniz(obnizId);
    this.obniz.onconnect = async () => {
      (<any>this.connected) = true;
    };
    this.obniz.onclose = async () => {
      (<any>this.connected) = false;
    };
  }

  static disconnect(): void {
    this.obniz.reset();
    this.obniz.close();
    (<any>this.obniz) = null;
  }
}
