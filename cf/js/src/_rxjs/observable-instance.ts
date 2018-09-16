import * as Rx from 'rxjs';
import { callbacks } from './subscribe-callback-impl';

import { map } from 'rxjs/operators';
class ObservableInstance {
  /**
   * 当該 Observable から発行される値は指定した時間まで無視
   * 指定した時間になったら最新の値を発行する
   */
  audit(): void {
    const o1 = Rx.Observable.interval(100).audit((ev) => {
      return Rx.Observable.interval(10000);
    }).subscribe(...callbacks);
  }

  /**
   * 当該 Observable から発行される値は指定した時間まで無視
   * 指定した時間になったら最新の値を発行する
   */
  auditTime(): void {
    let time = 0;
    const o1 = Rx.Observable.interval(100).auditTime(10000).subscribe(...callbacks);
  }

  /**
   * Observable が発行する値をバッファしておき、他の Observable が発行するときにバッファを発行する
   */
  buffer(): void {
    const o1 = Rx.Observable.interval(1000).take(5);
    const o2 = Rx.Observable.interval(100);
    o2.buffer(o1).subscribe(...callbacks);
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
    ).subscribe(...callbacks);
  }

  /**
   * Observable が発行する値を指定時間バッファしておき、指定時間経つ毎にバッファを発行する
   */
  bufferTime(): void {
    const o1 = Rx.Observable.interval(100).take(10);
    o1.bufferTime(500).subscribe(...callbacks);
  }

  /**
   * `openings` が発行されたら、Observable が発行する値をバッファする
   * `closing` が発行されたら、バッファを発行する
   */
  bufferToggle(): void {
    const openings = Rx.Observable.interval(5000);
    const closing = Rx.Observable.interval(10000);
    Rx.Observable.interval(1000).bufferToggle(openings, i => closing).subscribe(...callbacks);
  }

  /**
   * `closing` が発火されたら、バッファを発行する
   */
  bufferWhen(): void {
    Rx.Observable.interval(100).take(15).bufferWhen(() => {
      return Rx.Observable.interval(1000);
    }).subscribe(...callbacks);
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
        .subscribe(...callbacks);
  }

  /**
   * 外側の Observable の発行が済んだら 内側の Observable を発行して結合する？？
   * イマイチ使い方がわからない
   */
  combineAll(): void {
    const o1 = Rx.Observable.interval(1000).take(10)
    const o2 = Rx.Observable.interval(2000).take(3);
    o1.map(v => o2.map(vv => `Result(${v}): ${vv}`)).combineAll().subscribe(...callbacks);
  }

  /**
   * Observable が発行している最新の値を結合して出力する
   */
  combineLatest(): void {
    const o1 = Rx.Observable.interval(1000).map(i => `First: ${i}`).take(10);
    const o2 = Rx.Observable.interval(2000).map(i => `Second: ${i}`).take(3);
    o1.combineLatest(o2).subscribe(...callbacks)
  }

  /**
   * Observable を連結して発行する
   */
  concat(): void {
    const o1 = Rx.Observable.interval(1000).map(i => `First: ${i}`).take(10);
    const o2 = Rx.Observable.interval(2000).map(i => `Second: ${i}`).take(3);
    o1.concat(o2).subscribe(...callbacks);
  }

  /**
   * 外側の Observable が発行されると内側の Observable が発行され、
   * 内側の Observable の発行が済むと、次の外側の Obaservable が発行される
   */
  concatAll(): void {
    const o1 = Rx.Observable.interval(1000).take(10);
    const o2 = Rx.Observable.interval(2000).take(3);
    o1.map(v => o2.map(vv => `Result(${v}): ${vv}`)).concatAll().subscribe(...callbacks);
  }

  /**
   * 外側の Observable が発行されたら `concatMap` で一度発行された値を使って、
   * 内側の Observable を作ることができる。
   * 内側の Observable の発行が済むと 次の外側の Observable が発行される
   */
  concatMap(): void {
    const o1 = Rx.Observable.interval(1000).take(10);
    const o2 = Rx.Observable.interval(2000).take(3);
    o1.concatMap((v => o2.map(vv => v*vv))).subscribe(...callbacks);
  }

  /**
   * 外側の Observable が発行されたら `concatMapTo` で定義した Observable を発行する
   */
  concatMapTo(): void {
    const o1 = Rx.Observable.interval(1000).take(10);
    const o2 = Rx.Observable.interval(2000).take(3);
    o1.concatMapTo(o2).subscribe(...callbacks);
  }

  /**
   * Observable が発行する個数を発行する
   */
  count(): void {
    const o1 = Rx.Observable.range(1,10);
    o1.count().subscribe(...callbacks);
  }

  /**
   * 他の Observable によって指定された時刻よりも短いを削除する？
   */
  debounce(): void {
    const o1 = Rx.Observable.interval(1000).take(5);
    const o2 = Rx.Observable.interval(100);
    o1.debounce(v => o2).subscribe(...callbacks);
  }

  /**
   * 指定された時刻よりも短い発行は削除する？
   */
  debounceTime(): void {
    const o1 = Rx.Observable.interval(1000);
    o1.debounceTime(100).subscribe(...callbacks);
  }

  /**
   * Observable の発行が Empty だった場合にデフォルト値を発行する
   */
  defaultIfEmpty(): void {
    const o1 = Rx.Observable.empty();
    o1.defaultIfEmpty("test").subscribe(...callbacks);
  }

  /**
   * Observable の発行開始を遅延させる
   */
  delay(): void {
    const o1 = Rx.Observable.of("A", "B", "C");
    o1.delay(1000).subscribe(...callbacks);
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
    }).subscribe(...callbacks);
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
    upperCase.subscribe(...callbacks);
  }

  /**
   * Observable の発行する値の重複を排除する
   */
  distinct(): void {
    const o1 = Rx.Observable.of(1, 1, 2, 2, 2, 1, 2, 3, 4, 3, 2, 1);
    o1.distinct().subscribe(...callbacks);
  }

  /**
   * Observable の発行する値のうち、直前の値と同じ場合は排除する
   */
  distinctUntilChanged(): void {
    const o1 = Rx.Observable.of(1, 1, 2, 2, 2, 1, 2, 3, 4, 3, 2, 1);
    o1.distinctUntilChanged().subscribe(...callbacks);
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
    o1.distinctUntilKeyChanged("name").subscribe(...callbacks);

    const o2 = Rx.Observable.of(
      { age: 10, name: "Hoge" },
      { age: 20, name: "Foo" },
      { age: 20, name: "Hoge" },
      { age: 10, name: "Foo" },
    );
    o2.distinctUntilKeyChanged("age").subscribe(...callbacks);
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
    ).subscribe(...callbacks);
  }

  /**
   * Observable が発行する値のうち特定の値を発行する
   */
  elementAt(): void {
    const o1 = Rx.Observable.of("A", "B", "C");
    o1.elementAt(2).subscribe(...callbacks);
  }

  /**
   * Array.every と同じ
   */
  every(): void {
    const o1 = Rx.Observable.of(1, 2, 3, 4, 5, 6);
    o1.every(v => v < 5).subscribe(...callbacks);

    const o2 = Rx.Observable.of(1, 2, 3, 4, 5);
    o2.every(v => v < 5).subscribe(...callbacks);

    const o3 = Rx.Observable.of(1, 2, 3, 4);
    o3.every(v => v < 5).subscribe(...callbacks);
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
    clicks.mapTo(1).expand(x => Rx.Observable.of(2 * x)).take(5).subscribe(...callbacks);
  }

  /**
   * Array.filter と同じ
   */
  filter(): void {
    const o1 = Rx.Observable.of(1, 2, 3, 4, 5, 6);
    o1.filter(v => v % 2 == 1).subscribe(...callbacks);
  }

  /**
   * Complete よりも後に呼ばれる関数を定義する
   */
  finalize(): void {
    const o1 = Rx.Observable.of(1, 2, 3, 4, 5, 6);
    o1.finally(() => console.log("Finaly")).subscribe(...callbacks);
  }

  /**
   * Array.find と同じ
   */
  find(): void {
    const o1 = Rx.Observable.of(2, 4, 6, 8, 10, 12, 14, 16, 18, 20);
    o1.find(v => v % 5 === 0).subscribe(...callbacks);
  }

  /**
   * Array.findIndex と同じ
   */
  findIndex(): void {
    const o1 = Rx.Observable.of(2, 4, 6, 8, 10, 12, 14, 16, 18, 20);
    o1.findIndex(v => v % 5 === 0).subscribe(...callbacks);
  }

  /**
   * 最初に発行される値のみ発行する
   * - 条件を入れることも可能
   */
  first(): void {
    const o1 = Rx.Observable.of(2, 4, 6, 8, 10, 12, 14, 16, 18, 20);
    o1.first().subscribe(...callbacks);
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

  /**
   * Observable の発行する値をグループ化する
   */
  groupBy(): void {
    const o1 = Rx.Observable.of(
      { id: 1, name: "A1" },
      { id: 2, name: "A2" },
      { id: 3, name: "A3" },
      { id: 1, name: "B1" },
      { id: 2, name: "B2" },
      { id: 3, name: "B3" },
      { id: 1, name: "C1" },
      { id: 1, name: "D1" },
      { id: 2, name: "C2" },
      { id: 2, name: "D2" }
    );
    o1.groupBy(v => v.id)
      .flatMap(v => v.reduce((acc, c) => [...acc, c], []))
      .subscribe(...callbacks);
  }

  /**
   * Observable の発行する値を全て無視する
   */
  ignoreElements(): void {
    const o1 = Rx.Observable.of(1, 2, 3, 4, 5);
    o1.ignoreElements().subscribe(...callbacks);
  }

  /**
   * Observable の発行する値が Empty かどうかを発行する
   */
  isEmpty(): void {
    const o1 = Rx.Observable.empty();
    o1.isEmpty().subscribe(...callbacks);

    const o2 = Rx.Observable.of(1, 2, 3, 4, 5).ignoreElements();
    o2.isEmpty().subscribe(...callbacks);

  }

  /**
   * Observable の最後の値を発行する
   */
  last(): void {
    const o1 = Rx.Observable.of(2, 4, 6, 8, 10, 12, 14, 16, 18, 20);
    o1.last().subscribe(...callbacks);

    const o2 = Rx.Observable.of(2, 4, 6, 8, 10, 12, 14, 16, 18, 20);
    o2.last(v => v % 6 === 0).subscribe(...callbacks);
  }

  /**
   * 使いみちわからず。
   * コードを見てみると `obs` 自分自身が帰ってくる模様？
   */
  let(): void {
    const o1 = Rx.Observable.of("a", "b", "c", "d", "e");
    o1.map(v => v + v)
      .let((obs) => obs.map(v => v.toUpperCase()))
      .subscribe(...callbacks);
  }

  /**
   * カスタムオペレータを差し込めるらしいが。。。
   */
  lift(): void {
  }

  /**
   * Observable の値を変換して発行する
   */
  map(): void {
    const o1 = Rx.Observable.of(1, 2, 3, 4, 5);
    o1.map(v => v * 10).subscribe(...callbacks);
  }

  /**
   * Observable の値を特定の値に変換して発行する
   */
  mapTo(): void {
    const o1 = Rx.Observable.of(1, 2, 3, 4, 5);
    o1.mapTo("a").subscribe(...callbacks);
  }

  /**
   * 発行される値を Notificaiton オブジェクトに変換する
   */
  materialize(): void {
    const o1 = Rx.Observable.of<any>("a", "b", 13, "d").map(v => v.toUpperCase());
    o1.materialize().subscribe(...callbacks);
  }

  /**
   * Observable の中で最大の値を発行する
   */
  max(): void {
    const o1 = Rx.Observable.of(5, 4, 7, 8, 2);
    o1.max().subscribe(...callbacks);
  }

  /**
   * 複数の Observable を合成して発行する
   */
  merge(): void {
    const o1 = Rx.Observable.interval(1000).map(v => `First: ${v}`).take(10);
    const o2 = Rx.Observable.interval(750).map(v => `Second: ${v}`).take(10);
    o1.merge(o2).subscribe(...callbacks);
  }

  /**
   * 外側の Observable が発行されたら、内側の Observable を合成して発行する
   */
  mergeAll(): void {
    const o1 = Rx.Observable.of("a", "b", "c", "d", "e");
    o1.map(v => Rx.Observable.interval(1000).take(10).map(i => `${v}: ${i}`))
      .mergeAll()
      .subscribe(...callbacks);
  }

  /**
   * ↑でやったことが、簡単にできた
   */
  mergeMap(): void {
    const o1 = Rx.Observable.of("a", "b", "c", "d", "e");
    o1.mergeMap(v => Rx.Observable.interval(1000).take(10).map(i => v + i))
      .subscribe(...callbacks);
  }

  /**
   * merge + mapTo
   */
  mergeMapTo(): void {
    const o1 = Rx.Observable.of("a", "b", "c", "d", "e");
    o1.mergeMapTo(Rx.Observable.interval(1000).take(10))
      .subscribe(...callbacks);
  }

  /**
   * Observable が発行する値をアキュムレーターで蓄積する
   */
  mergeScan(): void {
    const o1 = Rx.Observable.interval(1000).mapTo(2);
    o1.mergeScan((acc, v) => Rx.Observable.of(acc * v), 1)
      .subscribe(...callbacks);
  }

  /**
   * Observable の中で最大の値を発行する
   */
  min(): void {
    const o1 = Rx.Observable.of(5, 4, 7, 8, 2);
    o1.min().subscribe(...callbacks);
  }

  /**
   * 複数の購読を行う
   */
  multicast(): void {
    const o1 = Rx.Observable.interval(1000).take(10).do(() => console.log("AAAAA"));
    const multicast = o1.multicast(() => new Rx.Subject());
    multicast.subscribe(v => console.log(`Multi(1): ${v}`))
    multicast.subscribe(v => console.log(`Multi(2): ${v}`))
    multicast.connect();
  }

  /**
   * 発行は「次のタイミング」で行う
   */
  observeOn(): void {
    const o1: Rx.Observable<any> = Rx.Observable.create(observer => {
      console.log("[1] before next()");
      observer.next(1);
      console.log("[1] after next()");

      console.log("[2] before next()");
      observer.next(2);
      console.log("[2] after next()");

      console.log("[3] before complete()");
      observer.complete();
      console.log("[3] after complete()");
    });

    console.log("[4] before subscribe");
    o1.observeOn(Rx.Scheduler.async).subscribe(
      next => console.log(`[e] next: ${next}`),
      err => console.log(`[e] error: ${err}`),
      () => console.log(`[e] complete: `)
    );
    console.log("[4] after subscribe");
  }

  /**
   * catch みたいなもん。
   * エラーハンドリングするなら catch 使え。
   */
  onErrorResumeNext(): void {
    const o1 = Rx.Observable.of(1, 2, 3, 4, 5)
      .map(n => {
        if (n == 4) {
          throw "four!";
        }
        return n;
      });

    o1.onErrorResumeNext(Rx.Observable.of("I", "II", "III", "IV", "V"))
      .subscribe(...callbacks);
  }

  /**
   * 2つの発行がペアになる
   */
  pairwise(): void {
    const o1 = Rx.Observable.of("a", "b", "c", "d", "e");
    o1.pairwise().subscribe(...callbacks);
  }

  /**
   * Observable を分離する
   */
  partition(): void {
    const o1 = Rx.Observable.of(1, 2, 3, 4, 5, 6, 7, 8, 9);
    const p = o1.partition(v => v % 2 === 1);
    Rx.Observable.concat(...p).subscribe(...callbacks);
  }

  /**
   * メソッドチェーンではなくパイプでやる
   */
  pipe(): void {
    const o1 = Rx.Observable.of("a", "b", "c", "d", "e");
    o1.pipe(map(v => v.toUpperCase()))
      .subscribe(...callbacks);
  }

  /**
   * 特定のキーのみを発行する
   */
  pluck(): void {
    const o1 = Rx.Observable.of(
      { name: "AAAAA", age: 10 },
      { name: "BBBBB", age: 20 },
      { name: "CCCCC", age: 30 }
    );

    o1.pluck("name")
      .subscribe(...callbacks);
  }

  /**
   * `multicast` との違いがわからない
   */
  publish(): void {
    const o1 = Rx.Observable.of("a", "b", "c", "d", "e");
    const pub = o1.publish();
    pub.subscribe(...callbacks);
    pub.subscribe(...callbacks);
    pub.connect();
  }

  /**
   * 発行の先頭に値を追加する `publish` ？
   */
  publishBefavior(): void {
    const o1 = Rx.Observable.of("a", "b", "c", "d", "e");
    const pub = o1.publishBehavior("test");
    pub.subscribe(...callbacks);
    pub.subscribe(...callbacks);
    pub.connect();
  }

  /**
   * 最後のみを発行する `publish`
   */
  publishLast(): void {
    const o1 = Rx.Observable.of("a", "b", "c", "d", "e");
    const pub = o1.publishLast();
    pub.subscribe(...callbacks);
    pub.subscribe(...callbacks);
    pub.connect();
  }

  /**
   * もはやわからん
   */
  publishReplay(): void {
    const o1 = Rx.Observable.of("a", "b", "c", "d", "e");
    const pub = o1.publishReplay()
    pub.subscribe(...callbacks);
    pub.subscribe(...callbacks);
    pub.connect();
  }

  /**
   * 一番速い奴が発行される
   */
  race(): void {
    const o1 = Rx.Observable.interval(1500).map(v => `1500ms: ${v}`);
    const o2 = Rx.Observable.interval(1000).map(v => `1000ms: ${v}`);
    const o3 = Rx.Observable.interval(500).map(v => `500ms: ${v}`);
    o1.race(o2, o3)
      .subscribe(...callbacks);
  }

  /**
   * Array.reduce と同じ
   */
  reduce(): void {
    const o1 = Rx.Observable.of(1, 2, 3, 4, 5, 6, 7, 8, 9);
    o1.reduce((acc, c) => acc + c, 0)
      .subscribe(...callbacks);
  }

  /**
   * Observable を繰り返す
   */
  repeat(): void {
    const o1 = Rx.Observable.of(1, 2, 3, 4, 5, 6, 7, 8, 9);
    o1.repeat(3)
      .subscribe(...callbacks);
  }

  /**
   * attempts の使い方がわからないが、リトライ条件を指定できる
   */
  repeatWhen(): void {
    Rx.Observable.of(1, 2, 3)
      .repeatWhen(attempts => attempts.delay(1000))
      .subscribe(...callbacks);
  }

  /**
   *エラーが発生したときにリトライする
   */
  retry(): void {
    Rx.Observable.of(1, 2, 3, 4, 5)
      .map(n => {
        if (n == 4) {
          throw "four!";
        }
        return n;
      })
      .retry(2)
      .subscribe(...callbacks);
  }

  /**
   *エラーが発生したときにリトライする
   */
  retryWhen(): void {
    Rx.Observable.of(1, 2, 3, 4, 5)
      .map(n => {
        if (n == 4) {
          throw "four!";
        }
        return n;
      })
      .retryWhen(errors => errors.delay(1000))
      .subscribe(...callbacks);
  }

  /**
   * 特定タイミングの最新の値を発行する。
   * `特定のタイミング` は `sample()` 渡す Observable に委ねられる
   * 最新の値に変化がない場合は何も起きない
   */
  sample(): void {
    const clickMock = Rx.Observable.interval(5000).map(v => `CLICK_MOCK: ${v}`);
    Rx.Observable.interval(1000)
      .sample(clickMock)
      .subscribe(...callbacks);
  }

  /**
   * 特定タイミングの最新の値を発行する。
   * `特定のタイミング` は `sample()` 渡す Observable に委ねられる
   * 最新の値に変化がない場合は何も起きない
   */
  sampleTime(): void {
    const clickMock = Rx.Observable.interval(100).map(v => `CLICK_MOCK: ${v}`);
    clickMock.sampleTime(1000)
      .subscribe(...callbacks);
  }

  /**
   * `reduce` と似てるが、毎回発行を行う
   */
  scan(): void {
    const o1 = Rx.Observable.of(1, 2, 3, 4, 5, 6, 7, 8, 9);
    o1.scan((acc, c) => acc + c, 0)
      .subscribe(...callbacks);
  }

  /**
   * 同じ発行のある Observable かどうかを判定する
   */
  sequenceEqual(): void {
    const compareObservable = Rx.Observable.interval(1000).take(10);
    Rx.Observable.of(0,1,2,3,4,5,6,7,8,9)
      .sequenceEqual(compareObservable)
      .subscribe(...callbacks);
  }

  /**
   * multicast publish との違いがわからない
   */
  share(): void {
    const o1 = Rx.Observable.interval(1000).map(v => `SOURCE: ${v}`).do(_ => console.log("DO"));
    o1.subscribe(...callbacks);
    o1.subscribe(...callbacks);
    const share = o1.share();
    share.subscribe(...callbacks);
    share.subscribe(...callbacks);
  }

  /**
   * もはやわからん
   */
  shareReplay(): void {
  }

  /**
   * `predicate` で指定する値が１つしかない場合は成功。
   */
  single(): void {
    Rx.Observable.of("a", "b", "c", "b", "c")
      .single((v) => v === "a")
      .subscribe(...callbacks);
  }

  /**
   * `count` 分スキップする
   */
  skip(): void {
    Rx.Observable.of("a", "b", "c", "d", "e")
      .skip(3)
      .subscribe(...callbacks);
  }

  /**
   * `count` 分、後ろからスキップする
   */
  skipLast(): void {
    Rx.Observable.of("a", "b", "c", "d", "e")
      .skipLast(1)
      .subscribe(...callbacks);
  }

  /**
   * `notifier` による通知があるまでスキップする
   */
  skipUntil(): void {
    Rx.Observable.interval(1000).map(v => `SOURCE: ${v}`)
      .skipUntil(Rx.Observable.interval(3000))
      .subscribe(...callbacks);
  }

  /**
   * `predicate` で指定する条件の間スキップする
   * 一度条件から外れるとずっと放出し続けるっぽい
   */
  skipWhile(): void {
    Rx.Observable.interval(1000)
      .skipWhile((v) => v < 5)
      .subscribe(...callbacks);
  }

  /**
   * Observable の先頭に値を追加する
   */
  startWith(): void {
    Rx.Observable.of(1, 2, 3)
      .startWith(<any>"a")
      .subscribe(...callbacks);
  }

  /**
   * 発行は同期的に行う
   */
  subscribeOn(): void {
    const o1: Rx.Observable<any> = Rx.Observable.create(observer => {
      console.log("[1] before next()");
      observer.next(1);
      console.log("[1] after next()");

      console.log("[2] before next()");
      observer.next(2);
      console.log("[2] after next()");

      console.log("[3] before complete()");
      observer.complete();
      console.log("[3] after complete()");
    });

    console.log("[4] before subscribe");
    o1.subscribeOn(Rx.Scheduler.async).subscribe(
      next => console.log(`[5] next: ${next}`),
      err => console.log(`[5] error: ${err}`),
      () => console.log(`[5] complete: `)
    );
    console.log("[4] after subscribe");
  }

  /**
   * 外側の Observable が発行する度に、内側の Observable に切り替わる
   */
  switch(): void {
    const clickMock = Rx.Observable.interval(5000).map(v => `CLICK_MOCK: ${v}`);
    clickMock.map(v => Rx.Observable.interval(1000))
      .switch()
      .subscribe(...callbacks);
  }

  /**
   * 1行で書けるか書けないかの違い？
   */
  switchMap(): void {
    const clickMock = Rx.Observable.interval(5000).map(v => `CLICK_MOCK: ${v}`);
    clickMock.switchMap(v => Rx.Observable.interval(1000))
      .subscribe(...callbacks);
  }

  /**
   * 前の値を利用するかしないかの違い？
   */
  switchMapTo(): void {
    const clickMock = Rx.Observable.interval(5000).map(v => `CLICK_MOCK: ${v}`);
    clickMock.switchMapTo(Rx.Observable.interval(1000))
      .subscribe(...callbacks);
  }

  /**
   * n回発行する Observable のうち m回発行する
   */
  take(): void {
    Rx.Observable.of("a", "b", "c", "d", "e")
      .take(2)
      .subscribe(...callbacks);
  }

  /**
   * n回発行する Observable のうちラスト m回を発行する
   */
  takeLast(): void {
    Rx.Observable.interval(1000)
      .take(5)
      .takeLast(2)
      .subscribe(...callbacks);
  }

  /**
   * `notifier` に指定された Observable が発行するまで発行する
   */
  takeUntil(): void {
    const clickMock = Rx.Observable.interval(5000).map(v => `CLICK_MOCK: ${v}`);
    Rx.Observable.interval(1000)
      .takeUntil(clickMock)
      .subscribe(...callbacks)
  }

  /**
   * `predicate` が true の間発行をし続ける
   * 条件から外れたら終了
   */
  takeWhile(): void {
    Rx.Observable.interval(1000)
      .takeWhile(v => v < 5)
      .subscribe(...callbacks);
  }

  /**
   * sample との違いがわからない
   * Observable が外にあるか中にあるかの違い？
   */
  throttle(): void {
    const clickMock = Rx.Observable.interval(5000).map(v => `CLICK_MOCK: ${v}`);
    Rx.Observable.interval(1000).throttle(v => clickMock.map(vv => v))
      .subscribe(...callbacks);
  }

  /**
   * throttle と同じ
   */
  throttleTime(): void {
    Rx.Observable.interval(1000)
      .throttleTime(5000)
      .subscribe(...callbacks)
  }

  /**
   * よくわからん
   */
  timeInterval(): void {
    Rx.Observable.of("a", "b", "c")
      .timeInterval()
      .subscribe(...callbacks);
  }

  /**
   * タイムアウト時刻まで発行がない場合はエラー
   */
  timeout(): void {
    Rx.Observable.interval(1000)
      .timeout(500)
      .subscribe(...callbacks);
  }

  /**
   * タイムアウト時刻まで発行がない場合は別の Observable を実行
   */
  timeoutWith(): void {
    const o1 = Rx.Observable.interval(1000);
    const o2 = Rx.Observable.interval(100);
    o1.timeoutWith(900, o2)
      .subscribe(...callbacks);
  }

  /**
   * timestamp が付与された
   */
  timestamp(): void {
    Rx.Observable.interval(1000).timestamp().subscribe(...callbacks);
  }

  /**
   * 発行を配列化する
   */
  toArray(): void {
    Rx.Observable.of("a", "b", "c")
      .toArray()
      .subscribe(...callbacks);
  }

  /**
   * `windowBoundaries` が発行する度に本線が分岐する
   */
  window(): void {
    const clickMock = Rx.Observable.interval(100).map(v => `CLICK_MOCK: ${v}`);
    clickMock.window(Rx.Observable.interval(1000))
      .map(w => w.take(2))
      .mergeAll()
      .subscribe(...callbacks);
  }

  /**
   * `windowSize` 毎に本線が分岐する
   */
  windowCount(): void {
    const clickMock = Rx.Observable.interval(1000).map(v => `CLICK_MOCK: ${v}`);
    clickMock.windowCount(3)
      .map(w => w.skip(1)) // 3番目が毎回スキップされる
      .mergeAll()
      .subscribe(...callbacks);

    const clickMock2 = Rx.Observable.interval(1000).map(v => `CLICK_MOCK: ${v}`);
    clickMock2.windowCount(2, 10) // 10回ごとに2回出力
      .mergeAll()
      .subscribe(...callbacks);
  }

  /**
   * `openings` 毎に本線が分岐し `closing` されるまで発行される
   */
  windowToggle(): void {
    const clickMock = Rx.Observable.interval(100).map(v => `CLICK_MOCK: ${v}`);
    clickMock.windowToggle(Rx.Observable.interval(5000), (v) => {
      return v % 2 === 0 ? Rx.Observable.interval(1000) : Rx.Observable.empty();
    }).mergeAll()
      .subscribe(...callbacks);
  }

  /**
   * `closing` 毎に本線が分岐する
   */
  windowWhen(): void {
    const clickMock = Rx.Observable.interval(100).map(v => `CLICK_MOCK: ${v}`);
    clickMock.windowWhen(() => Rx.Observable.interval(1000))
      .map(w => w.take(2))
      .mergeAll()
      .subscribe(...callbacks);
  }

  /**
   * Observable が発行するとき、もう一方の Observable の最新と合成して出力する
   */
  withLatestFrom(): void {
    const clickMock = Rx.Observable.interval(100).map(v => `CLICK_MOCK: ${v}`);
    const seconds = Rx.Observable.interval(1000);
    seconds.withLatestFrom(clickMock)
      .subscribe(...callbacks);
  }

  /**
   * 複数の Observable を組み合わせて新しい値を作成する
   */
  zip(): void {
    const clickMock = Rx.Observable.interval(5000).map(v => `CLICK_MOCK: ${v}`);
    const age = Rx.Observable.of(10, 20, 30);
    const name = Rx.Observable.of("Hoge", "Foo", "Bar");
    const developer = Rx.Observable.of(true, true, false);
    clickMock.zip(age, name, developer)
      .subscribe(...callbacks);
  }

  /**
* よくわからない
   */
   zipAll(): void {
    const clickMock = Rx.Observable.interval(5000).map(v => `CLICK_MOCK: ${v}`);
    const age = Rx.Observable.of(10, 20, 30);
    const name = Rx.Observable.of("Hoge", "Foo", "Bar");
    const developer = Rx.Observable.of(true, true, false);
    clickMock.map(v => `TEST: ${v}`)
      .zipAll()
      .subscribe(...callbacks);
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
//test.forEach();
//test.groupBy();
//test.ignoreElements();
//test.isEmpty();
//test.last();
//test.let();
//test.lift();
//test.map();
//test.mapTo();
//test.materialize();
//test.max();
//test.merge();
//test.mergeAll();
//test.mergeMap();
//test.mergeMapTo();
//test.mergeScan();
//test.min();
//test.multicast();
//test.observeOn();
//test.onErrorResumeNext();
//test.pairwise();
//test.partition();
//test.pipe();
//test.pluck();
//test.publish();
//test.publishBehabior();
//test.publishLast();
//test.publishReplay();
//test.race();
//test.reduce();
//test.repeat();
//test.repeatWhen();
//test.retry();
//test.retryWhen();
//test.sample();
//test.sampleTime();
//test.scan();
//test.sequenceEqual();
//test.share();
//test.single();
//test.skip();
//test.skipLast();
//test.skipUntil();
//test.skipWhile();
//test.startWith();
//test.subscribeOn();
//test.switch();
//test.switchMap();
//test.switchMapTo();
//test.take();
//test.takeLast();
//test.takeUntil();
//test.takeWhile();
//test.throttle();
//test.throttleTime();
//test.timeInterval();
//test.timeout();
//test.timeoutWith();
//test.timestamp();
//test.toArray();
//test.window();
//test.windowCount();
//test.windowToggle();
//test.windowWhen();
//test.withLatestFrom();
//test.zip();
test.zipAll();
