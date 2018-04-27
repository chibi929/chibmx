declare const Obniz: any;
declare class Led {
  on(): void;
  off(): void;
  output(on: boolean): void;
  blink(intervalMS): void;
  endBlink(): void;
}
declare class DCMotor {
  forward(): void;
  reverse(): void;
  stop(): void;
  move(forward: boolean): void;
  power(power: number): void;
}

export class Controller {
  private readonly obniz: any;
  private led: Led;
  private motorLeft: any;
  private motorRight: any;

  constructor(obnizId: string, connectedCallback?: () => void) {
    this.obniz = new Obniz(obnizId);

    this.obniz.onconnect = async () => {
      console.log('onconnect');
      connectedCallback && connectedCallback();
      this.led = this.obniz.wired('LED', { anode: 0, cathode: 1 });
      this.motorLeft = this.obniz.wired('DCMotor', { forward: 2, back: 3 });
      this.motorRight = this.obniz.wired('DCMotor', { forward: 4, back: 5 });
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
