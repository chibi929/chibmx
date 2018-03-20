import * as Rx from 'rxjs';
import { callbacks } from './subscribe-callback-impl';

export namespace MathematicalAggregateOperators {
  /**
   * Observable が発行する値の個数を発行する
   */
  export function count(): void {
    Rx.Observable.of('a', 'bb', 'ccc')
      .count()
      .subscribe(...callbacks);

    Rx.Observable.of('a', 'bb', 'ccc')
      .count(v => v.length >= 2)
      .subscribe(...callbacks);
  }

  /**
   * Observable が発行する値の中で最大値を発行する
   */
  export function max(): void {
    Rx.Observable.of(5, 4, -1, 8, 2)
      .max()
      .subscribe(...callbacks);
  }

  /**
   * Observable が発行する値の中で最小値を発行する
   */
  export function min(): void {
    Rx.Observable.of(5, 4, -1, 8, 2)
      .min()
      .subscribe(...callbacks);
  }
}

//MathematicalAggregateOperators.count();
//MathematicalAggregateOperators.max();
//MathematicalAggregateOperators.min();
