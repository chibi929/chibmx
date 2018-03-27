import * as Rx from 'rxjs';
import { callbacks } from './subscribe-callback-impl';

export namespace FilteringOperators {
  /**
   * Observable は `durationSelector` で指定した Observable が発行したら最新の値を発行する
   */
  export function audit(): void {
    Rx.Observable.interval(100)
      .audit(v => Rx.Observable.timer(10000))
      .subscribe(...callbacks);

    Rx.Observable.interval(100)
      .audit(v => {
        if (v > 100) {
          throw new Error('Error!');
        }
        return Rx.Observable.timer(10000);
      })
      .subscribe(...callbacks);
  }

  /**
   * Observable は `duration` で指定された時刻が来たら最新の値を発行する
   * - 細かい指定はできないが `audit` とだいたい同じ
   */
  export function auditTime(): void {
    Rx.Observable.interval(100)
      .auditTime(10000)
      .subscribe(...callbacks);
  }

  /**
   * `durationSelector` で指定した Observable が発行するまで遅延する
   * - `durationSelector` が発火する前に次の値が発行したら遅延した値は消える
   * - あまりよくわかってないが、そんな感じと思われる・・・。
   */
  export function debounce(): void {
    Rx.Observable.interval(1000)
      .debounce(v => Rx.Observable.timer(500))
      .subscribe(...callbacks);
  }

  /**
   * `dueTime` で指定した時間まで遅延する
   * - `dueTime` が経つ前に次の値が発行したら遅延した値は消える
   * - あまりよくわかってないが、そんな感じと思われる・・・。
   * - `debounce` とだいたい同じ
   */
  export function debounceTime(): void {
    Rx.Observable.interval(1000)
      .debounceTime(2000)
      .subscribe(...callbacks);
  }

  /**
   * Observable が発行する値の重複を排除する
   */
  export function distinct(): void {
    Rx.Observable.of(1, 1, 2, 2, 2, 1, 2, 4, 3, 2, 3, 1)
      .distinct()
      .subscribe(...callbacks);
  }

  /**
   * Observable が発行する値のうち、直前の値と同じ場合は排除する
   */
  export function distinctUntilChanged(): void {
    Rx.Observable.of(1, 1, 2, 2, 2, 1, 2, 4, 3, 2, 3, 1)
      .distinctUntilChanged()
      .subscribe(...callbacks);
  }

  /**
   * Observable が発行する値のうち、特定の Key に対して直前の値と同じ場合は排除する
   */
  export function distinctUntilKeyChanged(): void {
    Rx.Observable.of(
      { age: 10, name: "Hoge" },
      { age: 20, name: "Foo" },
      { age: 30, name: "Foo" },
      { age: 10, name: "Hoge" })
      .distinctUntilKeyChanged("name")
      .subscribe(...callbacks);

    Rx.Observable.of(
      { age: 10, name: "Hoge" },
      { age: 20, name: "Foo" },
      { age: 20, name: "Hoge" },
      { age: 10, name: "Foo" })
      .distinctUntilKeyChanged("age")
      .subscribe(...callbacks);
  }

  /**
   * Observable が発行する値のうち、特定の値を発行する
   */
  export function elementAt(): void {
    Rx.Observable.of('A', 'B', 'C')
      .elementAt(1)
      .subscribe(...callbacks);
  }

  /**
   * Observable が発行する値を `predicate` で指定した条件にフィルタする
   * - Array.filter と同じ
   */
  export function filter(): void {
    Rx.Observable.range(1, 5)
      .filter(v => v % 2 === 0)
      .subscribe(...callbacks);
  }

  /**
   * Observable が最初に発行する値のみにフィルタする
   * - `predicate` を指定して条件を指定することも可能
   */
  export function first(): void {
    Rx.Observable.range(1, 5)
      .first()
      .subscribe(...callbacks);

    Rx.Observable.range(1, 5)
      .first(v => v % 2 === 0)
      .subscribe(...callbacks);
  }

  /**
   * Observable が発行する全ての値を無視する
   */
  export function ignoreElements(): void {
    Rx.Observable.range(1, 5)
      .ignoreElements()
      .subscribe(...callbacks);
  }

  /**
   * Observable が最後に発行する値のみにフィルタする
   * - `predicate` を指定して条件を指定することも可能
   */
  export function last(): void {
    Rx.Observable.range(1, 5)
      .last()
      .subscribe(...callbacks);

    Rx.Observable.range(1, 5)
      .last(v => v % 2 === 0)
      .subscribe(...callbacks);
  }

  /**
   * `notifier` で指定された Observable による通知があった時に最新の値を発行する
   * - 最新の値に変化がない場合は何も起きない
   */
  export function sample(): void {
    Rx.Observable.interval(1000)
      .sample(Rx.Observable.interval(5000))
      .subscribe(...callbacks);

    Rx.Observable.interval(5000)
      .sample(Rx.Observable.interval(1000))
      .subscribe(...callbacks);
  }

  /**
   * `period` で指定された時間が経った時に最新の値を発行する
   * - 最新の値に変化がない場合は何も起きない
   */
  export function sampleTime(): void {
    Rx.Observable.interval(1000)
      .sampleTime(5000)
      .subscribe(...callbacks);

    Rx.Observable.interval(5000)
      .sampleTime(1000)
      .subscribe(...callbacks);
  }

  /**
   * Observable が発行する値を `count` だけスキップする
   */
  export function skip(): void {
    Rx.Observable.range(1, 5)
      .skip(3)
      .subscribe(...callbacks);
  }

  /**
   * Observable が発行する値を `count` だけ後ろからスキップする
   */
  export function skipLast(): void {
    Rx.Observable.range(1, 5)
      .skipLast(3)
      .subscribe(...callbacks);
  }

  /**
   * `notifier` で指定された Observable による通知があるまでスキップする
   */
  export function skipUntil(): void {
    Rx.Observable.interval(1000)
      .skipUntil(Rx.Observable.timer(5000))
      .subscribe(...callbacks);
  }

  /**
   * `predicate` で指定する条件が true の間はスキップする
   * - 一度条件から外れると発行が行われる
   * - (途中から再びスキップされる。とかは無い)
   */
  export function skipWhile(): void {
    Rx.Observable.interval(1000)
      .skipWhile(v => v < 5)
      .subscribe(...callbacks);

    Rx.Observable.interval(1000)
      .skipWhile(v => v > 5)
      .subscribe(...callbacks);
  }

  /**
   * Observable が発行する値のうち `count` 回だけ発行する
   */
  export function take(): void {
    Rx.Observable.interval(1000)
      .take(3)
      .subscribe(...callbacks);
  }

  /**
   * Observable が発行する値のうち、ラスト `count` 回だけ発行する
   */
  export function takeLast(): void {
    Rx.Observable.interval(1000)
      .take(5)
      .takeLast(2)
      .subscribe(...callbacks);
  }

  /**
   * `notifier` に指定された Observable による通知があるまで発行する
   */
  export function takeUntil(): void {
    Rx.Observable.interval(1000)
      .takeUntil(Rx.Observable.timer(5000))
      .subscribe(...callbacks);
  }

  /**
   * `predicate` が true の間は発行する
   * - 一度条件から外れたら終了
   * - (途中から再び発行し始める。とかは無い)
   */
  export function takeWhile(): void {
    Rx.Observable.interval(1000)
      .takeWhile(v => v < 5)
      .subscribe(...callbacks);
  }

  /**
   * だいたい `sample()` と同じ動きをする
   * `durationSelector` が発行されるまで Observable の発行は無視される
   */
  export function throttle(): void {
    Rx.Observable.interval(1000)
      .throttle(v => Rx.Observable.timer(5000))
      .subscribe(...callbacks);
  }

  /**
   * `duration` で指定するバージョン
   */
  export function throttleTime(): void {
    Rx.Observable.interval(1000)
      .throttleTime(5000)
      .subscribe(...callbacks);
  }
}
//FilteringOperators.audit();
//FilteringOperators.auditTime();
//FilteringOperators.debounce();
//FilteringOperators.debounceTime();
//FilteringOperators.distinct();
//FilteringOperators.distinctUntilChanged();
//FilteringOperators.distinctUntilKeyChanged();
//FilteringOperators.elementAt();
//FilteringOperators.filter();
//FilteringOperators.first();
//FilteringOperators.ignoreElements();
//FilteringOperators.last();
//FilteringOperators.sample();
//FilteringOperators.sampleTime();
//FilteringOperators.skip();
//FilteringOperators.skipLast();
//FilteringOperators.skipUntil();
//FilteringOperators.skipWhile();
//FilteringOperators.take();
//FilteringOperators.takeLast();
//FilteringOperators.takeUntil();
//FilteringOperators.takeWhile();
//FilteringOperators.throttle();
//FilteringOperators.throttleTime();
