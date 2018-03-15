function next(next: any): void {
  console.log(next);
}

function error(err: any): void {
  console.log(error);
}

function complete(): void {
  console.log(`complete`);
}

export const callbacks = [next, error, complete];
