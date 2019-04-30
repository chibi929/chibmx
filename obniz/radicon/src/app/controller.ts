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

export interface IController {
  on(): void;
  off(): void;
  up(): void;
  down(): void;
  left(): void;
  right(): void;
  stop(): void;
  deviceMotion(x: number, y: number): void;
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

  deviceMotion(x: number, y: number): void {
    console.log('deviceMotion');
  }
}

export class Controller implements IController {
  private readonly OBNIZ: any;
  private readonly THRESHOLD = 1;
  private readonly MAX_ACCEL = 5;

  private led: Led;
  private motorLeft: DCMotor;
  private motorRight: any;

  constructor(obnizId: string, connectedCallback?: () => void) {
    this.OBNIZ = new Obniz(obnizId);

    this.OBNIZ.onconnect = async () => {
      connectedCallback && connectedCallback();
      this.led = this.OBNIZ.wired('LED', { anode: 0, cathode: 1 });
      this.motorLeft = this.OBNIZ.wired('DCMotor', { forward: 2, back: 3 });
      this.motorRight = this.OBNIZ.wired('DCMotor', { forward: 4, back: 5 });
    };
  }

  on(): void {
    this.led.on();
  }

  off(): void {
    this.led.off();
  }

  up(): void {
    this.motorLeft.power(60);
    this.motorRight.power(60);
    this.motorLeft.forward();
    this.motorRight.forward();
  }

  left(): void {
    this.motorLeft.power(20);
    this.motorRight.power(60);
    this.motorLeft.forward();
    this.motorRight.forward();
  }

  right(): void {
    this.motorLeft.power(60);
    this.motorRight.power(20);
    this.motorLeft.forward();
    this.motorRight.forward();
  }

  down(): void {
    this.motorLeft.power(60);
    this.motorRight.power(60);
    this.motorLeft.reverse();
    this.motorRight.reverse();
  }

  stop(): void {
    this.motorLeft.stop();
    this.motorRight.stop();
  }

  deviceMotion(x: number, y: number): void {
    if (Math.abs(y) > this.THRESHOLD) {
      let power = Math.min((100 * (Math.abs(y) - this.THRESHOLD)) / (this.MAX_ACCEL - this.THRESHOLD), 100);
      this.motorLeft.power(power);
      this.motorRight.power(power);

      let direction = y > 0;
      this.motorLeft.move(direction);
      this.motorRight.move(direction);
    } else if (Math.abs(x) > this.THRESHOLD) {
      let power = Math.min((100 * (Math.abs(x) - this.THRESHOLD)) / (this.MAX_ACCEL - this.THRESHOLD), 100);
      if (x > 0) {
        this.motorRight.power(power);
        this.motorRight.move(true);
        this.motorLeft.stop();
      } else {
        this.motorLeft.power(power);
        this.motorLeft.move(true);
        this.motorRight.stop();
      }
    } else {
      this.motorLeft.stop();
      this.motorRight.stop();
    }
  }
}
