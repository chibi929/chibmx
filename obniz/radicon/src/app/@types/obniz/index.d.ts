declare interface IObnizOptions {
  binary?: boolean;
  local_connect?: boolean;
  debug_dom_id?: string;
  auto_connect?: boolean;
  access_token?: string;
  reset_obniz_on_ws_disconnection?: boolean;
}

declare interface IConnectOptions {
  timeout: number;
}

declare type ConnectionState = 'closed' | 'connecting' | 'connected' | 'closing';

declare class Obniz {
  onconnect: any;
  connectionState: ConnectionState;
  debugprint: boolean;

  constructor(id: string, options?: IObnizOptions);
  connect(): void;
  connectWait(options?: IConnectOptions): boolean;
  close(): void;
  resetOnDisconnect(reset: boolean): void;
  wired(name: 'LED', options: ILEDOptions): LED;
  wired(name: 'DCMotor', options: IDCMotorOptions): DCMotor;
}

declare interface ILEDOptions {
  anode: number;
  cathode: number;
}

declare class LED {
  on(): void;
  off(): void;
  output(on: boolean): void;
  blink(intervalMS: number): void;
  endBlink(): void;
}

declare interface IDCMotorOptions {
  forward: number;
  back: number;
}

declare class DCMotor {
  forward(): void;
  reverse(): void;
  stop(): void;
  move(forward: boolean): void;
  power(power: number): void;
}

declare interface IFullColorLEDOptions {
  r: number;
  g: number;
  b: number;
  common: number;
  commonType: string;
}

declare class FullColorLED {
  rgb(red: number, green: number, blue: number): void;
  hsv(hue: number, saturation: number, value: number): void;
  gradation(cycle_ms: number): void;
  stopgradation(): void;
}
