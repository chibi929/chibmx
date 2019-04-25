declare const Obniz: any;

export class Controller {
  constructor(obnizId: string) {
    console.log(obnizId);
    new Obniz(obnizId);
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
}
