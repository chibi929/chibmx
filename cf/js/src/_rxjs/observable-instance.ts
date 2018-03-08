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
}

const test = new ObservableInstance();
//test.audit();
test.auditTime();
