import * as Rx from 'rxjs';
function next(next: any): void { console.log(`next: ${JSON.stringify(next)}`); }
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

  /**
   * 外側の Observable の発行が済んだら 内側の Observable を発行して結合する？？
   * イマイチ使い方がわからない
   */
  combineAll(): void {
    const o1 = Rx.Observable.interval(1000).take(10)
    const o2 = Rx.Observable.interval(2000).take(3);
    o1.map(v => o2.map(vv => `Result(${v}): ${vv}`)).combineAll().subscribe(next, error, complete);
  }

  /**
   * Observable が発行している最新の値を結合して出力する
   */
  combineLatest(): void {
    const o1 = Rx.Observable.interval(1000).map(i => `First: ${i}`).take(10);
    const o2 = Rx.Observable.interval(2000).map(i => `Second: ${i}`).take(3);
    o1.combineLatest(o2).subscribe(next, error, complete)
  }

  /**
   * Observable を連結して発行する
   */
  concat(): void {
    const o1 = Rx.Observable.interval(1000).map(i => `First: ${i}`).take(10);
    const o2 = Rx.Observable.interval(2000).map(i => `Second: ${i}`).take(3);
    o1.concat(o2).subscribe(next, error, complete);
  }

  /**
   * 外側の Observable が発行されると内側の Observable が発行され、
   * 内側の Observable の発行が済むと、次の外側の Obaservable が発行される
   */
  concatAll(): void {
    const o1 = Rx.Observable.interval(1000).take(10);
    const o2 = Rx.Observable.interval(2000).take(3);
    o1.map(v => o2.map(vv => `Result(${v}): ${vv}`)).concatAll().subscribe(next, error, complete);
  }

  /**
   * 外側の Observable が発行されたら `concatMap` で一度発行された値を使って、
   * 内側の Observable を作ることができる。
   * 内側の Observable の発行が済むと 次の外側の Observable が発行される
   */
  concatMap(): void {
    const o1 = Rx.Observable.interval(1000).take(10);
    const o2 = Rx.Observable.interval(2000).take(3);
    o1.concatMap((v => o2.map(vv => v*vv))).subscribe(next, error, complete);
  }

  /**
   * 外側の Observable が発行されたら `concatMapTo` で定義した Observable を発行する
   */
  concatMapTo(): void {
    const o1 = Rx.Observable.interval(1000).take(10);
    const o2 = Rx.Observable.interval(2000).take(3);
    o1.concatMapTo(o2).subscribe(next, error, complete);
  }

  /**
   * Observable が発行する個数を発行する
   */
  count(): void {
    const o1 = Rx.Observable.range(1,10);
    o1.count().subscribe(next, error, complete);
  }

  /**
   * 他の Observable によって指定された時刻よりも短いを削除する？
   */
  debounce(): void {
    const o1 = Rx.Observable.interval(1000).take(5);
    const o2 = Rx.Observable.interval(100);
    o1.debounce(v => o2).subscribe(next, error, complete);
  }

  /**
   * 指定された時刻よりも短い発行は削除する？
   */
  debounceTime(): void {
    const o1 = Rx.Observable.interval(1000);
    o1.debounceTime(100).subscribe(next, error, complete);
  }

  /**
   * Observable の発行が Empty だった場合にデフォルト値を発行する
   */
  defaultIfEmpty(): void {
    const o1 = Rx.Observable.empty();
    o1.defaultIfEmpty("test").subscribe(next, error, complete);
  }

  /**
   * Observable の発行開始を遅延させる
   */
  delay(): void {
    const o1 = Rx.Observable.of("A", "B", "C");
    o1.delay(1000).subscribe(next, error, complete);
  }

  /**
   * 他の Observable で指定された時刻分、発行開始を遅延させる
   */
  delayWhen(): void {
    const o1 = Rx.Observable.of("A", "B", "C");
    o1.delayWhen(v => {
      if (v === "B") {
        return Rx.Observable.interval(5000);
      }
      return Rx.Observable.interval(1000);
    }).subscribe(next, error, complete);
  }

  /**
   * `Rx.Notification` を `Observable` に変換する？
   */
  dematerialize(): void {
    const notifA = new Rx.Notification('N', 'A');
    const notifB = new Rx.Notification('N', 'B');
    const notifE = new Rx.Notification('E', undefined, new TypeError('x.toUpperCase is not a function'));
    const materialized = Rx.Observable.of(notifA, notifB, notifE);
    const upperCase = materialized.dematerialize();
    upperCase.subscribe(next, error, complete);
  }

  /**
   * Observable の発行する値の重複を排除する
   */
  distinct(): void {
    const o1 = Rx.Observable.of(1, 1, 2, 2, 2, 1, 2, 3, 4, 3, 2, 1);
    o1.distinct().subscribe(next, error, complete);
  }

  /**
   * Observable の発行する値のうち、直前の値と同じ場合は排除する
   */
  distinctUntilChanged(): void {
    const o1 = Rx.Observable.of(1, 1, 2, 2, 2, 1, 2, 3, 4, 3, 2, 1);
    o1.distinctUntilChanged().subscribe(next, error, complete);
  }

  /**
   * Observable の発行する値のうち、特定のKeyに対して直前の値と同じ場合は排除する
   */
  distinctUntilKeyChanged(): void {
    const o1 = Rx.Observable.of(
      { age: 10, name: "Hoge" },
      { age: 20, name: "Foo" },
      { age: 30, name: "Foo" },
      { age: 10, name: "Hoge" },
    );
    o1.distinctUntilKeyChanged("name").subscribe(next, error, complete);

    const o2 = Rx.Observable.of(
      { age: 10, name: "Hoge" },
      { age: 20, name: "Foo" },
      { age: 20, name: "Hoge" },
      { age: 10, name: "Foo" },
    );
    o2.distinctUntilKeyChanged("age").subscribe(next, error, complete);
  }

  /**
   * Observable が発行した値を発行する前にフックする
   */
  do(): void {
    const o1 = Rx.Observable.of("A", "B", "C");
    o1.do(
      next => console.log(`do(next): ${next}`),
      error => console.log(`do(error): ${error}`),
      () => console.log(`do(complete):`)
    ).subscribe(next, error, complete);
  }

  /**
   * Observable が発行する値のうち特定の値を発行する
   */
  elementAt(): void {
    const o1 = Rx.Observable.of("A", "B", "C");
    o1.elementAt(2).subscribe(next, error, complete);
  }

  /**
   * Array.every と同じ
   */
  every(): void {
    const o1 = Rx.Observable.of(1, 2, 3, 4, 5, 6);
    o1.every(v => v < 5).subscribe(next, error, complete);

    const o2 = Rx.Observable.of(1, 2, 3, 4, 5);
    o2.every(v => v < 5).subscribe(next, error, complete);

    const o3 = Rx.Observable.of(1, 2, 3, 4);
    o3.every(v => v < 5).subscribe(next, error, complete);
  }

  /**
   * 表現の仕方がわからず断念
   */
  exhaust(): void {
  }
  exhaustMap(): void {
  }

  /**
   * Observable の出力を再帰的に発行する
   */
  expand(): void {
    var clicks = Rx.Observable.interval(1000);
    clicks.mapTo(1).expand(x => Rx.Observable.of(2 * x)).take(5).subscribe(next, error, complete);
  }

  /**
   * Array.filter と同じ
   */
  filter(): void {
    const o1 = Rx.Observable.of(1, 2, 3, 4, 5, 6);
    o1.filter(v => v % 2 == 1).subscribe(next, error, complete);
  }

  /**
   * Complete よりも後に呼ばれる関数を定義する
   */
  finalize(): void {
    const o1 = Rx.Observable.of(1, 2, 3, 4, 5, 6);
    o1.finally(() => console.log("Finaly")).subscribe(next, error, complete);
  }

  /**
   * Array.find と同じ
   */
  find(): void {
    const o1 = Rx.Observable.of(2, 4, 6, 8, 10, 12, 14, 16, 18, 20);
    o1.find(v => v % 5 === 0).subscribe(next, error, complete);
  }

  /**
   * Array.findIndex と同じ
   */
  findIndex(): void {
    const o1 = Rx.Observable.of(2, 4, 6, 8, 10, 12, 14, 16, 18, 20);
    o1.findIndex(v => v % 5 === 0).subscribe(next, error, complete);
  }

  /**
   * 最初に発行される値のみ発行する
   * - 条件を入れることも可能
   */
  first(): void {
    const o1 = Rx.Observable.of(2, 4, 6, 8, 10, 12, 14, 16, 18, 20);
    o1.first().subscribe(next, error, complete);
  }

  /**
   * subscribe の Promise 版
   */
  forEach(): void {
    const o1 = Rx.Observable.of(2, 4, 6, 8, 10, 12, 14, 16, 18, 20);
    o1.forEach(v => console.log(v)).then(res => {
      console.log(res);
    });
  }
}

const test = new ObservableInstance();
//test.audit();
//test.auditTime();
//test.buffer();
//test.bufferCount();
//test.bufferWhen();
//test.catch();
//test.combineAll();
//test.combineLatest();
//test.concat();
//test.concatAll();
//test.concatMap();
//test.concatMapTo();
//test.count();
//test.debounce();
//test.debounceTime();
//test.defaultIfEmpty();
//test.delay();
//test.delayWhen();
//test.dematerialize();
//test.distinct();
//test.distinctUntilChanged();
//test.distinctUntilKeyChanged();
//test.do();
//test.elementAt();
//test.every();
//test.exhaust();
//test.exhaustMap();
//test.expand();
//test.filter();
//test.finalize();
//test.find();
//test.findIndex();
//test.first();
test.forEach();
