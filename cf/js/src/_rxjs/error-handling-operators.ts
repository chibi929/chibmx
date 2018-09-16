import * as Rx from 'rxjs';
import { callbacks } from './subscribe-callback-impl';

export namespace ErrorHandlingOperators {
  /**
   * Observable がエラーを発行したら次の Observable を発行する
   */
  export function catch_(): void {
    Rx.Observable.throw('Error')
      .catch(err => Rx.Observable.of('a', 'bb', 'ccc'))
        .subscribe(...callbacks);

    Rx.Observable.interval(1000)
      .map(v => {
        if (v === 4) {
          throw 'Error';
        }
        return v;
      })
      .catch(err => Rx.Observable.of('IV', 'V', 'VI'))
        .subscribe(...callbacks);
  }

  /**
   * Observable がエラーを発行したら `count` だけリトライする
   */
  export function retry(): void {
    Rx.Observable.throw('Error')
      .retry(3)
      .subscribe(...callbacks);

    Rx.Observable.interval(1000)
      .map(v => {
        if (v === 4) {
          throw 'Error';
        }
        return v;
      })
      .retry(3)
      .subscribe(...callbacks);
  }

  /**
   * Observable がエラーを発行したら `notifier` を基にリトライを行う
   * - `retry()` を先に知っておいたほうが良い
   * - あまりよくわかってないが、たぶん `retry()` とだいたい同じ
   */
  export function retryWhen(): void {
    Rx.Observable.interval(1000)
      .map(v => {
        if (v === 4) {
          throw 'Error';
        }
        return v;
      })
      .do(
        res => console.log(`do(res): ${res}`),
        err => console.log(`do(err): ${err}`),
        () => console.log(`do(complete)`),
      )
        .retryWhen(errors => {
          return errors.delay(200).do(
            res => console.log(`errors(res): ${res}`), // エラーが発生するとここに飛んでくるんだな？
            err => console.log(`errors(err): ${err}`),
            () => console.log(`errors(complete)`),
          );
        })
      .subscribe(...callbacks);
  }

  /**
   * Observable がエラーを発行したら次の Observable を発行する
   * - `catch` と同じような感じ
   * - 但し、コールバックに `err` は飛んでこないのでエラーハンドリングしたい場合は `catch` を使うと良い？
   */
  export function onErrorResumeNext(): void {
    Rx.Observable.interval(1000)
      .map(v => {
        if (v === 4) {
          throw 'Error';
        }
        return v;
      })
      .onErrorResumeNext(Rx.Observable.of('IV', 'V', 'VI'))
      .subscribe(
        res => console.log(res),
        err => console.log('ここには来ない'),
        () => console.log('complete')
      );
  }
}

//ErrorHandlingOperators.catch_();
//ErrorHandlingOperators.retry();
//ErrorHandlingOperators.retryWhen();
//ErrorHandlingOperators.onErrorResumeNext();
