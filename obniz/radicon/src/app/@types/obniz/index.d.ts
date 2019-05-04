declare interface ObnizOptions {
  binary?: boolean;
  local_connect?: boolean;
  debug_dom_id?: string;
  auto_connect?: boolean;
  access_token?: string;
  reset_obniz_on_ws_disconnection?: boolean;
}

declare class Obniz {
  onconnect: any;

  constructor(id: string, options?: ObnizOptions);
  wired(name: 'LED', ...args: any): Led;
  wired(name: 'DCMotor', ...args: any): DCMotor;
}

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
