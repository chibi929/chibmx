import * as Rx from 'rxjs';

function createObservable(name: string, interval: number): Rx.Observable<string> {
  let num = 0;
  let intervalId;
  return Rx.Observable.create((observer) => {
    intervalId = setInterval(() => {
      observer.next(`${name}: ${num}`);
      ++num;
      if (num > 9) {
        clearInterval(intervalId);
        observer.complete();
      }
    }, interval);
  });
}

function forkJoin(): void {
  console.log("forkJoin");
  const a = createObservable("A", 500);
  const b = createObservable("B", 1000);
  const c = createObservable("C", 1500);

  Rx.Observable.forkJoin(a, b, c).subscribe(next => {
    console.log("forkJoin(next): " + next);
  }, err => {
    console.log("forkJoin(err): " + err);
  }, () => {
    console.log("forkJoin(complete)");
  });
}

function merge(): void {
  console.log("merge");
  const a = createObservable("A", 500);
  const b = createObservable("B", 1000);
  const c = createObservable("C", 1500);

  Rx.Observable.merge(a, b, c).subscribe(next => {
    console.log("merge(next): " + next);
  }, err => {
    console.log("merge(err): " + err);
  }, () => {
    console.log("merge(complete)");
  });
}

function concat(): void {
  const a = createObservable("A", 500);
  const b = createObservable("B", 1000);
  const c = createObservable("C", 1500);

  Rx.Observable.concat(a, b, c).subscribe(next => {
    console.log("concat(next): " + next);
  }, err => {
    console.log("concat(err): " + err);
  }, () => {
    console.log("concat(complete)");
  });
}
