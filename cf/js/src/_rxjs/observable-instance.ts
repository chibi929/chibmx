import * as Rx from 'rxjs';
function next(next: any): void { console.log(`next: ${next}`); }
function error(err: any): void { console.log(`error: ${err}`); }
function complete(): void { console.log(`complete: `); }

class ObservableInstance {
  /**
   * 当該 Observable から発行される値は指定した時間まで無視
   * 指定した時間になったら最新の値を発行する
   */
  audit(): void {
    const o1 = Rx.Observable.interval(100).audit((ev) => {
      return Rx.Observable.interval(10000);
    }).subscribe(next, error, complete);
  }

  /**
   * 当該 Observable から発行される値は指定した時間まで無視
   * 指定した時間になったら最新の値を発行する
   */
  auditTime(): void {
    let time = 0;
    const o1 = Rx.Observable.interval(100).auditTime(10000).subscribe(next, error, complete);
  }

  /**
   * Observable が発行する値をバッファしておき、他の Observable が発行するときにバッファを発行する
   */
  buffer(): void {
    const o1 = Rx.Observable.interval(1000).take(5);
    const o2 = Rx.Observable.interval(100);
    o2.buffer(o1).subscribe(next, error, complete);
  }

  /**
   * Observable が発行する値を指定数バッファしておき、溜まったらバッファを発行する
   */
  bufferCount(): void {
    const o1 = Rx.Observable.interval(1000).take(9);
    Rx.Observable.concat(
      o1.bufferCount(2),
      o1.bufferCount(3, 2),
      o1.bufferCount(2, 3)
    ).subscribe(next, error, complete);
  }

  /**
   * Observable が発行する値を指定時間バッファしておき、指定時間経つ毎にバッファを発行する
   */
  bufferTime(): void {
    const o1 = Rx.Observable.interval(100).take(10);
    o1.bufferTime(500).subscribe(next, error, complete);
  }

  /**
   * `openings` が発行されたら、Observable が発行する値をバッファする
   * `closing` が発行されたら、バッファを発行する
   */
  bufferToggle(): void {
    const openings = Rx.Observable.interval(5000);
    const closing = Rx.Observable.interval(10000);
    Rx.Observable.interval(1000).bufferToggle(openings, i => closing).subscribe(next, error, complete);
  }

  /**
   * `closing` が発火されたら、バッファを発行する
   */
  bufferWhen(): void {
    Rx.Observable.interval(100).take(15).bufferWhen(() => {
      return Rx.Observable.interval(1000);
    }).subscribe(next, error, complete);
  }

  /**
   * Observable 内で Error をキャッチしたら次の Observable を発行する
   */
  catch(): void {
    Rx.Observable.of(1, 2, 3, 4, 5)
      .map(n => {
        if (n == 4) {
          throw "four!";
        }
        return n;
      }).catch(err => Rx.Observable.of("I", "II", "III", "IV", "V"))
        .subscribe(next, error, complete);
  }
}

const test = new ObservableInstance();
//test.audit();
//test.auditTime();
//test.buffer();
//test.bufferCount();
//test.bufferWhen();
//test.catch();
