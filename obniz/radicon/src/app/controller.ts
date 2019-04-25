declare const Obniz: any;

export class Controller {
  private readonly obniz: any;
  private led: any;

  constructor(obnizId: string, connectedCallback?: () => void) {
    this.obniz = new Obniz(obnizId);

    this.obniz.onconnect = async () => {
      console.log('onconnect');
      connectedCallback && connectedCallback();
      this.led = this.obniz.wired('LED', { anode: 0, cathode: 1 });
    };
  }

  on(): void {
    console.log('on');
    this.led.on();
  }

  off(): void {
    console.log('off');
    this.led.off();
  }

  up(): void {
    console.log('up');
  }

  left(): void {
    console.log('left');
  }

  right(): void {
    console.log('right');
  }

  down(): void {
    console.log('down');
  }
}
