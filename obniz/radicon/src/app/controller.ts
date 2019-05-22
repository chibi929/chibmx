import * as Obniz from 'obniz/obniz.js';
import { LED } from 'obniz/parts/Light/LED';
import { DCMotor } from 'obniz/parts/Moving/DCMotor';

export interface IController {
  on(): void;
  off(): void;
  up(): void;
  down(): void;
  left(): void;
  right(): void;
  stop(): void;
  deviceMotion(x: number, y: number): void;
  useSensor(used: boolean): void;
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

  useSensor(used: boolean): void {
    console.log(used);
  }
}

export class Controller implements IController {
  private readonly OBNIZ: Obniz;
  private readonly THRESHOLD = 1;
  private readonly MAX_ACCEL = 5;

  private sensorUsed: boolean;
  private led: LED;
  private motorLeft: DCMotor;
  private motorRight: DCMotor;

  constructor(obnizId: string, connectedCallback?: () => void) {
    this.OBNIZ = new Obniz(obnizId);

    this.OBNIZ.onconnect = async () => {
      connectedCallback && connectedCallback();
      this.led = this.OBNIZ.wired('LED', { anode: 5, cathode: 6 });
      this.motorRight = this.OBNIZ.wired('DCMotor', { forward: 0, back: 1 });
      this.motorLeft = this.OBNIZ.wired('DCMotor', { forward: 10, back: 11 });
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
    this.motorRight.power(60);
    this.motorRight.forward();
    this.motorLeft.stop();
  }

  right(): void {
    this.motorLeft.power(60);
    this.motorLeft.forward();
    this.motorRight.stop();
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
    if (!this.sensorUsed) {
      return;
    }

    if (Math.abs(y) > this.THRESHOLD) {
      let power = Math.min((100 * (Math.abs(y) - this.THRESHOLD)) / (this.MAX_ACCEL - this.THRESHOLD), 60);
      this.motorLeft.power(power);
      this.motorRight.power(power);

      let direction = y > 0;
      this.motorLeft.move(direction);
      this.motorRight.move(direction);
    } else if (Math.abs(x) > this.THRESHOLD) {
      let power = Math.min((100 * (Math.abs(x) - this.THRESHOLD)) / (this.MAX_ACCEL - this.THRESHOLD), 60);
      if (x > 0) {
        this.motorLeft.power(power);
        this.motorLeft.move(true);
        this.motorRight.stop();
      } else {
        this.motorRight.power(power);
        this.motorRight.move(true);
        this.motorLeft.stop();
      }
    } else {
      this.motorLeft.stop();
      this.motorRight.stop();
    }
  }

  useSensor(used: boolean): void {
    this.sensorUsed = used;
  }
}
