import * as Rx from 'rxjs';
import { callbacks } from './subscribe-callback-impl';

import { map, filter, scan } from 'rxjs/operators';

export namespace UtilityOperators {
  /**
   * Observable の発行を遅延させる
   */
  export function delay(): void {
    Rx.Observable.of('a', 'bb', 'ccc')
      .delay(5000)
      .subscribe(...callbacks);
  }

  /**
   * Observable の発行を `delayDurationSelector` で返却する Observable が発行させる
   * - `delay()` を先に知っておいたほうが良い
   */
  export function delayWhen(): void {
    Rx.Observable.of('a', 'bbbb', 'cccccccc')
      .delayWhen(v => {
        return Rx.Observable.timer(v.length * 1000)
      })
      .subscribe(...callbacks);
  }

  /**
   * `Rx.Notification` を `Observable` に変換する？
   * - `materialize()` の逆(先に `materialize()` 見たほうがいいかも)
   * - あまりよくわかってない
   */
  export function dematerialize(): void {
    const notifA = new Rx.Notification('N', 'a');
    const notifB = new Rx.Notification('N', 'b');
    const notifE = new Rx.Notification('E', undefined, new TypeError('x.toUpperCase() is not a function'));

    Rx.Observable.of(notifA, notifB, notifE)
      .dematerialize()
      .subscribe(...callbacks);
  }

  /**
   * Observable の発行を subscribe する前にフックする
   */
  export function do_(): void {
    Rx.Observable.of('a', 'bb', 'ccc')
      .do(
        res => console.log(`do(res): ${res}`),
        err => console.log(`do(err): ${err}`),
        () => console.log(`do(complete)`),
      )
        .subscribe(...callbacks);
  }

  /**
   * `Observable` を `Rx.Notification` に変換する？
   * - あまりよくわかってない
   */
  export function materialize(): void {
    Rx.Observable.of<any>('a', 'b', undefined, 'd').map(v => v.toUpperCase())
      .materialize()
      .subscribe(...callbacks);
  }

  /**
   * Observable の発行を「次のタイミング」で行う？
   * - あまりようわかってない
   */
  export function observeOn(): void {
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
    o1.observeOn(Rx.Scheduler.async)
      .subscribe(
        next => console.log(`[emit] next: ${next}`),
        err => console.log(`[emit] error: ${err}`),
        () => console.log(`[emit] complete: `)
      );
    console.log("[4] after subscribe");
  }

  /**
   * Observable の実行を「次のタイミング」で行う？
   * - あまりよくわかってない
   */
  export function subscribeOn(): void {
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
    o1.subscribeOn(Rx.Scheduler.async)
      .subscribe(
        next => console.log(`[emit] next: ${next}`),
        err => console.log(`[emit] error: ${err}`),
        () => console.log(`[emit] complete: `)
      );
    console.log("[4] after subscribe");
  }

  /**
   * 前の発行からどれくらい経ったかを発行する
   */
  export function timeInterval(): void {
    Rx.Observable.of('a', 'bbbb', 'cccccccc')
      .delayWhen(v => Rx.Observable.timer(v.length * 1000))
      .timeInterval()
      .subscribe(...callbacks);
  }

  /**
   * タイムアウト時刻まで発行が無い場合はエラーを発行する
   */
  export function timeout(): void {
    Rx.Observable.timer(5000, 1000)
      .timeout(1000)
      .subscribe(...callbacks);
  }

  /**
   * タイムアウト時刻まで発行が無い場合は別の Observable を発行する
   * - `timeout()` を先に知っておいたほうが良い
   * - `timeout` + `catch` な感じ？
   */
  export function timeoutWith(): void {
    Rx.Observable.timer(5000, 1000)
      .timeoutWith(1000, Rx.Observable.of('a', 'bb', 'ccc'))
      .subscribe(...callbacks);
  }

  /**
   * 発行時刻が付加される
   */
  export function timestamp(): void {
    Rx.Observable.of('a', 'bbbb', 'cccccccc')
      .delayWhen(v => Rx.Observable.timer(v.length * 1000))
      .timestamp()
      .subscribe(...callbacks);
  }

  /**
   * 発行された値を配列に変換する
   */
  export function toArray(): void {
    Rx.Observable.of("a", "b", "c")
      .toArray()
      .subscribe(...callbacks);
  }

  /**
   * WebSocket を WebSocketSubject にラップする
   * - あまりよくわかってない
   * - うまく動かせなかった
   */
  export function webSocket(): void {
  }

  /**
   * 一番最後に発火する関数を定義する
   */
  export function finally_(): void {
    Rx.Observable.of('a', 'bb', 'ccc')
      .finally(() => {
        console.log('Finally!')
      })
        .subscribe(...callbacks);

    Rx.Observable.of('a', 'bb', 'ccc')
      .map(v => {
        if (v.length > 2) {
          throw new Error('Error!');
        }
        return v;
      })
      .finally(() => {
        console.log('Finally!')
      })
        .subscribe(...callbacks);
  }

  /**
   * Subscribe ではなく Promise で購読する
   */
  export function forEach(): void {
    Rx.Observable.of('a', 'bb', 'ccc')
      .forEach(v => console.log(`v: ${v}`))
      .then(res => console.log(`then: ${res}`))
      .catch(err => console.log('ここには来ない'));

    Rx.Observable.of('a', 'bb', 'ccc')
      .map(v => {
        if (v.length > 2) {
          throw new Error('Error!')
        }
        return v;
      })
      .forEach(v => console.log(`v: ${v}`))
      .then(res => console.log('ここには来ない'))
      .catch(err => console.log(`catch: ${err.message}`));
  }

  /**
   * Observable が発行を Subscribeする前にフックできる？
   * - `do()` の Observable 版？
   * - あまりよくわかってない
   */
  export function let_(): void {
    Rx.Observable.of('a', 'bbbb', 'cccccccc')
      .let(selector => {
        return selector.do(
          res => console.log(`let.do(res): ${res}`),
          err => console.log(`let.do(err): ${err}`),
          () => console.log(`let.do(complete)`)
        );
      })
      .do(
        res => console.log(`do(res): ${res}`),
        err => console.log(`do(err): ${err}`),
        () => console.log(`do(complete)`)
      )
        .subscribe(
          res => console.log(`res: ${res}`),
          err => console.log(`err: ${err}`),
          () => console.log(`complete`)
        );
  }

  /**
   * カスタムオペレータを差し込めるらしい
   * - あまりよくわかってない
   * - うまく動かせなかった
   */
  export function lift(): void {
  }

  /**
   * メソッドチェーンではない書き方ができる
   * - メリットがわからない
   */
  export function pipe(): void {
    Rx.Observable.range(1, 10)
      .pipe(
        filter(v => v % 2 === 0),
        map(v => v * 10),
        scan((acc, v) => acc + v, 0)
      )
      .subscribe(...callbacks);
  }

  /**
   * Observable ではなく Promise で最後の値を取得する
   * - Promise で購読する場合は `forEach()` を使う？
   */
  export function toPromise(): void {
    Rx.Observable.of('a', 'bbbb', 'cccccccc')
      .toPromise()
      .then(res => console.log(res))
      .catch(err => console.log(err));

    Rx.Observable.of('a', 'bbbb', 'cccccccc')
      .map(v => {
        if (v.length > 4) {
          return new Error('Error!');
        }
        return v;
      })
      .toPromise()
      .then(res => console.log(res))
      .catch(err => console.log('ここには来ない'));
  }
}

//UtilityOperators.delay();
//UtilityOperators.delayWhen();
//UtilityOperators.dematerialize();
//UtilityOperators.do_();
//UtilityOperators.materialize();
//UtilityOperators.observeOn();
//UtilityOperators.subscribeOn();
//UtilityOperators.timeInterval();
//UtilityOperators.timeout();
//UtilityOperators.timeoutWith();
//UtilityOperators.timestamp();
//UtilityOperators.toArray();
//UtilityOperators.webSocket();
//UtilityOperators.finally_();
//UtilityOperators.forEach();
//UtilityOperators.let_();
//UtilityOperators.lift();
//UtilityOperators.pipe();
//UtilityOperators.toPromise();
