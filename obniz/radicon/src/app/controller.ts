export class Controller {
  constructor(obnizId: string) {
    console.log(obnizId);
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
