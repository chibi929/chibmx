import * as Rx from 'rxjs';
import { callbacks } from './subscribe-callback-impl';

export namespace CreateOperators {
  /**
   * コールバック付きの関数から Observable を作成する
   */
  export function bindCallback(): void {
    function m1(cb: () => void) {
      setTimeout(() => {
        cb();
      });
    }
    const o1 = Rx.Observable.bindCallback(m1);
    o1().subscribe(...callbacks);

    function m2(cb: (s1) => void) {
      setTimeout(() => {
        cb('Hello');
      });
    }
    const o2 = Rx.Observable.bindCallback(m2);
    o2().subscribe(...callbacks);

    function m3(cb: (s1, s2) => void) {
      setTimeout(() => {
        cb('Hello', 'World!');
      });
    }
    const o3 = Rx.Observable.bindCallback(m3);
    o3().subscribe(...callbacks);

    function m4(value: number, cb: (n1) => void) {
      setTimeout(() => {
        cb(value * 10);
      });
    }
    const o4 = Rx.Observable.bindCallback(m4);
    o4(5).subscribe(...callbacks);
  }

  /**
   * `(err, data) => void` のような良くあるコールバック付きの関数から Observable を作成する
   * - `bindCallback` とだいたい同じ
   */
  export function bindNodeCallback(): void {
    function m1(cb: (err, data?) => void) {
      setTimeout(() => {
        cb(null, "Hello");
      });
    }
    const o1 = Rx.Observable.bindNodeCallback(m1);
    o1().subscribe(...callbacks);

    function m2(cb: (err, data1, data2) => void) {
      setTimeout(() => {
        cb(null, 'Hello', 'World!');
      });
    }
    const o2 = Rx.Observable.bindNodeCallback(m2);
    o2().subscribe(...callbacks);

    function m3(cb: (err, data?) => void) {
      setTimeout(() => {
        cb("Error");
      });
    }
    const o3 = Rx.Observable.bindNodeCallback(m3);
    o3().subscribe(...callbacks);
  }

  /**
   * 新しい Observable を作成する
   */
  export function create(): void {
    const o1: Rx.Observable<any> = Rx.Observable.create(observer => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.complete();
    });
    o1.subscribe(...callbacks);

    const o2: Rx.Observable<any> = Rx.Observable.create(observer => {
      observer.next(1);
      observer.error("Error");
      observer.next(3);
      observer.complete();
    });
    o2.subscribe(...callbacks);
  }

  /**
   * 遅延して Observable を作成する
   */
  export function defer(): void {
    Rx.Observable.defer(() => Rx.Observable.of('a', 'b', 'c'))
      .subscribe(...callbacks);
  }

  /**
   * 何も発行せず complete する Observable を作成する
   */
  export function empty(): void {
    Rx.Observable.empty()
      .subscribe(...callbacks);
  }

  /**
   * 配列から Observable を作成する
   */
  export function from(): void {
    Rx.Observable.from([10, 20, 30])
      .subscribe(...callbacks);
  }

  /**
   * DOM Events や EventEmmiter から Observable を作成する
   */
  export function fromEvent(): void {
    Rx.Observable.fromEvent(document, 'click')
      .subscribe(...callbacks);
  }

  /**
   * `addHandler` , `removeHandler` に基づいて Observable を作成する
   * - あまりよくわかってない
   * - たぶん `fromEvent` とだいたい同じ
   */
  export function fromEventPattern(): void {
    Rx.Observable.fromEventPattern(
      (handler: any) => document.addEventListener('click', handler),
      (handler: any) => document.removeEventListener('click', handler)
    ).subscribe(...callbacks);
  }

  /**
   * Promise から Observable を作成する
   */
  export function fromPromise(): void {
    const func1 = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    };
    Rx.Observable.fromPromise(func1())
      .subscribe(...callbacks);

    const func2 = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("FUNC2");
        }, 1000);
      });
    };
    Rx.Observable.fromPromise(func2())
      .subscribe(...callbacks);

    const func3 = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject("FUNC3");
        }, 1000);
      });
    };
    Rx.Observable.fromPromise(func3())
      .subscribe(...callbacks);
  }

  /**
   * 定期的に発行する Observable を作成する
   */
  export function interval(): void {
    Rx.Observable.interval(1000)
      .subscribe(...callbacks);
  }

  /**
   * 何もしない Observable を作成する
   */
  export function never(): void {
    Rx.Observable.never()
      .subscribe(...callbacks);
  }

  /**
   * 指定した値を発行する Observable を作成する
   */
  export function of(): void {
    Rx.Observable.of(10, 20, 30)
      .subscribe(...callbacks);

    Rx.Observable.of('a', 'b', 'c')
      .subscribe(...callbacks);

    Rx.Observable.of<any>([1, 2, 3], ["a", "b", "c"])
      .subscribe(...callbacks);
  }

  /**
   * `start` から `count` 個の数値を発行する Observable を作成する
   */
  export function range(): void {
    Rx.Observable.range(1, 10)
      .subscribe(...callbacks);

    Rx.Observable.range(5, 10)
      .subscribe(...callbacks);
  }

  /**
   * エラーを発行する Observable を作成する
   */
  export function throw_(): void {
    Rx.Observable.throw("error")
      .subscribe(...callbacks);
  }

  /**
   * 開始時刻を指定して定期的に発行する Observable を作成する
   * - `interval` とだいたい同じ
   */
  export function timer(): void {
    Rx.Observable.timer(3000, 1000)
      .subscribe(...callbacks);
  }

  /**
   * 本線を指定回数繰り返す Observable を作成する
   */
  export function repeat(): void {
    Rx.Observable.of('a', 'b', 'c')
      .repeat(3)
      .subscribe(...callbacks);
  }

  /*
   * `notifier` が発行された時に本線を繰り返す Observable を作成する？
   * - あまりよくわかってない
   */
  export function repeatWhen(): void {
    Rx.Observable.of('a', 'b', 'c')
      .repeatWhen(notifier => notifier.take(3))
      .subscribe(...callbacks);
  }
}

// 動作確認
// CreateOperators.bindCallback();
// CreateOperators.bindNodeCallback();
// CreateOperators.create();
// CreateOperators.defer();
// CreateOperators.empty();
// CreateOperators.from();
// CreateOperators.fromEvent();
// CreateOperators.fromEventPattern();
// CreateOperators.fromPromise();
// CreateOperators.interval();
// CreateOperators.never();
// CreateOperators.of();
// CreateOperators.range();
// CreateOperators.throw_();
// CreateOperators.timer();
// CreateOperators.repeat();
// CreateOperators.repeatWhen();
