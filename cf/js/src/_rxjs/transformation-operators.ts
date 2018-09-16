import * as Rx from 'rxjs';
import { callbacks } from './subscribe-callback-impl';

export namespace TransformationOperators {
  /**
   * Observable が発行する値を `closingNotifier` による通知があるまでバッファしておく
   */
  export function buffer(): void {
    Rx.Observable.interval(1000)
      .buffer(Rx.Observable.interval(5000))
      .subscribe(...callbacks);

    Rx.Observable.interval(1000)
      .buffer(Rx.Observable.interval(5000).take(3))
      .subscribe(...callbacks);
  }

  /**
   * Obaservable が発行する値を `bufferSize` だけバッファしておく
   * - `buffer()` を先に知っておいた方が良い
   */
  export function bufferCount(): void {
    Rx.Observable.interval(1000)
      .bufferCount(5)
      .subscribe(...callbacks);
  }

  /**
   * Observable が発行する値を `bufferTimeSpan` が経過するまでバッファしておく
   * - `buffer()` を先に知っておいた方が良い
   */
  export function bufferTime(): void {
    Rx.Observable.interval(1000)
      .bufferTime(5000)
      .subscribe(...callbacks);
  }

  /**
   * Observable が発行する値を `openings` による通知があった時から `closingSelector` による通知があるまでバッファしておく
   * - `buffer()` を先に知っておいた方が良い
   */
  export function bufferToggle(): void {
    Rx.Observable.interval(1000)
      .bufferToggle(Rx.Observable.interval(10000), v => Rx.Observable.interval(5000))
      .subscribe(...callbacks);
  }

  /**
   * Observable が発行する値を `closingSelector` による通知があるまでバッファしてとく
   * - `buffer()` を先に知っておいた方が良い
   * - `buffer()` との違いは `closingSelector` の Observable に `.take(3)` とか付けても効き目がない？
   */
  export function bufferWhen(): void {
    Rx.Observable.interval(1000)
      .bufferWhen(() => Rx.Observable.interval(5000))
      .subscribe(...callbacks);

    Rx.Observable.interval(1000)
      .bufferWhen(() => Rx.Observable.interval(5000).take(3))
      .subscribe(...callbacks);
  }

  /**
   * Observable が発行した値を `project` で指定した Observable に使うことができる
   * `project` が発行中の時は待つ
   * - `concat()`, `map()` を先に知っておいた方が良い
   */
  export function concatMap(): void {
    // `concatMap()` と同じ動き
    Rx.Observable.interval(5000)
      .take(3)
      .concatMap(v => Rx.Observable.of(v * 10, v * 100, v * 1000))
      .subscribe(...callbacks);

    Rx.Observable.interval(5000)
      .take(3)
      .concatMap(v => Rx.Observable.interval(1000).take(4))
      .subscribe(...callbacks);

    Rx.Observable.interval(5000)
      .take(3)
      .concatMap(v => Rx.Observable.interval(1000).take(10))
      .subscribe(...callbacks);
  }

  /**
   * Observable が発行した値を `observable` として発行する
   * - `concat()`, `mapTo()` を先に知っておいた方が良い
   */
  export function concatMapTo(): void {
    Rx.Observable.interval(5000)
      .take(3)
      .concatMapTo(Rx.Observable.of('A', 'B', 'C'))
      .subscribe(...callbacks);
  }

  /**
   * `concatMap()` とだいたい同じ？
   * - `project` が発行中の時に Observable が発行すると無視される
   * - `exhaust()`, `map()` を先に知っておいた方が良い
   */
  export function exhaustMap(): void {
    // `concatMap()` と同じ動き
    Rx.Observable.interval(5000)
      .take(3)
      .exhaustMap(v => Rx.Observable.of(v * 10, v * 100, v * 1000))
      .subscribe(...callbacks);

    // `concatMap()` と同じ動き
    Rx.Observable.interval(5000)
      .take(3)
      .exhaustMap(v => Rx.Observable.interval(1000).take(4))
      .subscribe(...callbacks);

    Rx.Observable.interval(5000)
      .take(3)
      .exhaustMap(v => Rx.Observable.interval(1000).take(10))
      .subscribe(...callbacks);
  }

  /**
   * Observalue が発行する値を再帰的に処理する
   * - Observale の出力は1つ目のみを使用？
   */
  export function expand(): void {
    Rx.Observable.of(1, 2, 3)
      .expand(v => Rx.Observable.of(2 * v))
      .take(5)
      .subscribe(...callbacks);
  }

  /**
   * Observable が発行する値をグループ化する
   */
  export function groupBy(): void {
    Rx.Observable.of(
      {id: 1, name: "A1"},
      {id: 1, name: "B1"},
      {id: 2, name: "B2"},
      {id: 1, name: "C1"},
      {id: 2, name: "C2"},
      {id: 3, name: "C3"},
      {id: 1, name: "D1"},
      {id: 2, name: "D2"},
      {id: 3, name: "D3"},
      {id: 4, name: "D4"},
    ).groupBy(v => v.id)
      .flatMap(v => v.reduce((acc, v2) => [...acc, v2], []))
      .subscribe(...callbacks);
  }

  /**
   * Observable の値を変換して発行する
   * - `Array.map()` とだいたい同じ
   */
  export function map(): void {
    Rx.Observable.range(1, 5)
      .map(v => v * 10)
      .subscribe(...callbacks);
  }

  /**
   * Observable の値を特定の値に変換して発行する
   * - `map()` を先に知っておいた方が良い
   */
  export function mapTo(): void {
    Rx.Observable.range(1, 5)
      .mapTo("A")
      .subscribe(...callbacks);
  }

  /**
   * Observable の値を変換して、別の Observable と合成する
   * - `merge()`, `map()` を先に知っておいた方が良い
   */
  export function mergeMap(): void {
    Rx.Observable.range(1, 5)
      .mergeMap((v) => Rx.Observable.of(`${v}A`, `${v}B`, `${v}C`))
      .subscribe(...callbacks);
  }

  /**
   * Observable の値を特定の Observable に変換して発行する
   * - `merge()`, `mapTo()` を先に知っておいた方が良い
   */
  export function mergeMapTo(): void {
    Rx.Observable.range(1, 5)
      .mergeMapTo(Rx.Observable.of('A', 'B', 'C'))
      .subscribe(...callbacks);
  }

  /**
   * Observable の値を別の Observable に変換してアキュムレーターで蓄積する
   * - `mergeMap()`, `scan()` を先に知っておいた方が良い
   */
  export function mergeMapScan(): void {
    Rx.Observable.range(1, 5)
      .mergeScan((acc, v) => Rx.Observable.of(acc * v), 1)
      .subscribe(...callbacks);
  }

  /**
   * Observable の値のうち2つをペアにする
   */
  export function pairwise(): void {
    Rx.Observable.of("a", "b", "c", "d", "e")
      .pairwise()
      .subscribe(...callbacks);
  }

  /**
   * Observable 自体を `predicate` の条件で分離する
   */
  export function partition(): void {
    Rx.Observable.range(1, 10)
      .partition(v => v % 2 === 0)
      .forEach(p => {
        p.subscribe(...callbacks);
      });
  }

  /**
   * Observable の値のうち特定のキーのみを発行する
   */
  export function pluck(): void {
    Rx.Observable.of(
      {name: 'AAAAA', age: 10},
      {name: 'BBBBB', age: 20},
      {name: 'CCCCC', age: 30},
    ).pluck('name')
      .subscribe(...callbacks);
  }

  /**
   * Observable の値をアキュムレーターに蓄積しつつ毎回発行する
   */
  export function scan(): void {
    Rx.Observable.range(1, 10)
      .scan((acc, v) => acc + v, 0)
      .subscribe(...callbacks);
  }

  /**
   * Observable が発行する度に `project` で指定された Observable が発行する
   * - `switch()`. `map()` を先に知っておいた方が良い
   */
  export function switchMap(): void {
    Rx.Observable.interval(5000)
      .switchMap(v => Rx.Observable.of(`${v}A`))
      .subscribe(...callbacks);

    Rx.Observable.interval(5000)
      .switchMap(v => Rx.Observable.interval(1000))
      .subscribe(...callbacks);
  }

  /**
   * Observable が発行する度に `observable` で指定された Observable が発行する
   * - `switch()`, `mapTo()` を先に知っておいた方が良い
   */
  export function switchMapTo(): void {
    /*
      Rx.Observable.interval(5000)
      .switchMapTo(Rx.Observable.of('A', 'B', 'C'))
      .subscribe(...callbacks);
    */

    Rx.Observable.interval(5000)
      .switchMapTo(Rx.Observable.interval(1000))
      .subscribe(...callbacks);
  }

  /**
   * `windowBoundaries` で指定された Observable が発行する度に本線が分岐する
   * - あまり良くわかってない
   */
  export function window(): void {
    Rx.Observable.interval(100)
      .window(Rx.Observable.interval(1000))
      .map(w => w.take(2))
      .mergeAll()
      .subscribe(...callbacks);
  }

  /**
   * `windowSize` 毎に本線が分岐する
   * - `window()` を先に知っておいたほうが良い
   * - あまり良くわかってない
   */
  export function windowCount(): void {
    Rx.Observable.interval(100)
      .windowCount(10)
      .map(w => w.take(2))
      .mergeAll()
      .subscribe(...callbacks);
  }

  /**
   * Observable が発行する値を `openings` 毎に本線が分岐し `closingSelector` されるまで発行される
   * - `window()` を先に知っておいたほうが良い
   * - あまり良くわかってない
   */
  export function windowToggle(): void {
    Rx.Observable.interval(100)
      .windowToggle(Rx.Observable.interval(1000), v => Rx.Observable.interval(500))
      .mergeAll()
      .subscribe(...callbacks);
  }

  /**
   * `closingSelector`毎に本線が分岐する
   * - `window()` を先に知っておいたほうが良い
   * - あまり良くわかってない
   * - `window()` との違いもわからない
   */
  export function windowWhen(): void {
    Rx.Observable.interval(100)
      .windowWhen(() => Rx.Observable.interval(1000))
      .map(w => w.take(2))
      .mergeAll()
      .subscribe(...callbacks);
  }

  /**
   * Observable の値をアキュムレーターに蓄積し、最後の結果を発行する
   */
  export function reduce(): void {
    Rx.Observable.range(1, 10)
      .reduce((acc, v) => acc + v, 0)
      .subscribe(...callbacks);
  }
}

//TransformationOperators.buffer();
//TransformationOperators.bufferCount();
//TransformationOperators.bufferTime();
//TransformationOperators.bufferToggle();
//TransformationOperators.bufferWhen();
//TransformationOperators.concatMap();
//TransformationOperators.concatMapTo();
//TransformationOperators.exhaustMap();
//TransformationOperators.expand();
//TransformationOperators.groupBy();
//TransformationOperators.map();
//TransformationOperators.mapTo();
//TransformationOperators.mergeMap();
//TransformationOperators.mergeMapTo();
//TransformationOperators.mergeMapScan();
//TransformationOperators.pairwise();
//TransformationOperators.partition();
//TransformationOperators.pluck();
//TransformationOperators.scan();
//TransformationOperators.switchMap();
//TransformationOperators.switchMapTo();
//TransformationOperators.window();
//TransformationOperators.windowCount();
//TransformationOperators.windowToggle();
//TransformationOperators.windowWhen();
//TransformationOperators.reduce();
