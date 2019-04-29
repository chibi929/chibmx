declare const Obniz: any;
declare class Led {
  on(): void;
  off(): void;
  output(on: boolean): void;
  blink(intervalMS: number): void;
  endBlink(): void;
}
declare class DCMotor {
  forward(): void;
  reverse(): void;
  stop(): void;
  move(forward: boolean): void;
  power(power: number): void;
}

interface IController {
  on(): void;
  off(): void;
  up(): void;
  down(): void;
  left(): void;
  right(): void;
  stop(): void;
}

export class MockController implements IController {
  constructor(obnizId: string, connectedCallback?: () => void) {
    console.log('constructor');
    connectedCallback();
  }

  on(): void {
    console.log('on');
  }

  off(): void {
    console.log('off');
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

  stop(): void {
    console.log('stop');
  }
}

export class Controller implements IController {
  private readonly obniz: any;
  private led: Led;
  private motorLeft: DCMotor;
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
    this.motorLeft.power(60);
    this.motorRight.power(60);
    this.motorLeft.forward();
    this.motorRight.forward();
  }

  left(): void {
    console.log('left');
    this.motorLeft.power(20);
    this.motorRight.power(60);
    this.motorLeft.forward();
    this.motorRight.forward();
  }

  right(): void {
    console.log('right');
    this.motorLeft.power(60);
    this.motorRight.power(20);
    this.motorLeft.forward();
    this.motorRight.forward();
  }

  down(): void {
    console.log('down');
    this.motorLeft.power(60);
    this.motorRight.power(60);
    this.motorLeft.reverse();
    this.motorRight.reverse();
  }

  stop(): void {
    console.log('stop');
    this.motorLeft.stop();
    this.motorRight.stop();
  }
}
