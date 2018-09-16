import * as Rx from 'rxjs';
import { callbacks } from './subscribe-callback-impl';

export namespace ConditionalBooleanOperators {
  /**
   * Observable の発行が Empty だった場合にデフォルト値を発行する
   */
  export function defaultIfEmpty(): void {
    Rx.Observable.empty()
      .defaultIfEmpty('defaultValue')
      .subscribe(...callbacks);

    Rx.Observable.empty()
      .defaultIfEmpty({ data: 'defaultValue'})
      .subscribe(...callbacks);

    Rx.Observable.of('a', 'bb', 'ccc')
      .defaultIfEmpty('defaultValue')
      .subscribe(...callbacks);
  }

  /**
   * `predicate` で指定する条件を全ての値が満たしているかどうかを発行する
   * - `Array.every()` と同じ
   */
  export function every(): void {
    Rx.Observable.of(1, 2, 3, 4, 5)
      .every(v => v <= 5)
      .subscribe(...callbacks);

    Rx.Observable.of(1, 2, 3, 4, 5)
      .every(v => v < 5)
      .subscribe(...callbacks);
  }

  /**
   * `predicate` で指定する条件を満たす値を発行する
   * - `Array.find()` と同じ
   */
  export function find(): void {
    Rx.Observable.of(1, 2, 3, 4, 5)
      .find(v => v === 4)
      .subscribe(...callbacks);

    Rx.Observable.of(1, 2, 3, 4, 5)
      .find(v => v % 2 === 0)
      .subscribe(...callbacks);

    Rx.Observable.of(1, 2, 3, 4, 5)
      .find(v => v === 10)
      .subscribe(...callbacks);
  }

  /**
   * `predicate` で指定する条件を満たす値のインデックスを発行する
   * - `Array.findIndex()` と同じ
   */
  export function findIndex(): void {
    Rx.Observable.of(1, 2, 3, 4, 5)
      .findIndex(v => v === 4)
      .subscribe(...callbacks);

    Rx.Observable.of(1, 2, 3, 4, 5)
      .findIndex(v => v % 2 === 0)
      .subscribe(...callbacks);

    Rx.Observable.of(1, 2, 3, 4, 5)
      .findIndex(v => v === 10)
      .subscribe(...callbacks);
  }

  /**
   * Observable の発行する値が Empty かどうかを発行する
   */
  export function isEmpty(): void {
    Rx.Observable.empty()
      .isEmpty()
      .subscribe(...callbacks);

    Rx.Observable.of('a', 'bb', 'ccc')
      .isEmpty()
      .subscribe(...callbacks);
  }

  /**
   * 同じ発行のある Observable かどうかを発行する
   */
  export function sequenceEqual(): void {
    const compareObservable = Rx.Observable.range(5, 10);
    Rx.Observable.of(5, 6, 7, 8, 9, 10, 11, 12, 13, 14)
      .sequenceEqual(compareObservable)
      .subscribe(...callbacks);

    Rx.Observable.of(5, 6, 7, 8, 9, 10)
      .sequenceEqual(compareObservable)
      .subscribe(...callbacks);
  }

  /**
   * `predicate` で指定する値が１つしかない場合は成功
   */
  export function single(): void {
    Rx.Observable.of('a', 'b', 'c', 'b', 'e')
      .single(v => v === 'a')
      .subscribe(...callbacks);

    Rx.Observable.of('a', 'b', 'c', 'b', 'e')
      .single(v => v === 'b')
      .subscribe(...callbacks);
  }
}

//ConditionalBooleanOperators.defaultIfEmpty();
//ConditionalBooleanOperators.every();
//ConditionalBooleanOperators.find();
//ConditionalBooleanOperators.findIndex();
//ConditionalBooleanOperators.isEmpty();
//ConditionalBooleanOperators.sequenceEqual();
//ConditionalBooleanOperators.single();
