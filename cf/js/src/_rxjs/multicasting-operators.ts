import * as Rx from 'rxjs';
import { callbacks } from './subscribe-callback-impl';

export namespace MulticastingOperators {
  /**
   * 単一のサブスクリプションを共有する Observable を返す？
   * - あまりよくわかってない
   * - 実行ログを見ると `do` 1つに対して `Multi(1), (2)` の出力が出てる
   */
  export function multicast(): void {
    const multicast = Rx.Observable.timer(0, 1000).take(5).map(v => `A${v}`)
      .do(
        res => console.log(`res(do): ${res}`),
        err => console.log('err(do): ここには来ない'),
        () => console.log('complete(do)'),
      )
        .multicast(() => new Rx.Subject());

    multicast.subscribe(
      res => console.log(`Multi(1): ${res}`),
      err => console.log('Multi(1): ここには来ない'),
      () => console.log('Multi(1): complete'),
    );
    multicast.subscribe(
      res => console.log(`Multi(2): ${res}`),
      err => console.log('Multi(2): ここには来ない'),
      () => console.log('Multi(2): complete'),
    );
    multicast.connect();
  }

  /**
   * 単一のサブスクリプションを共有する Observable を返す？
   * - あまりよくわかってない
   * - `multicast()` との違いもわからない
   * - 実行ログを見ると `do` 1つに対して `Pub(1), (2)` の出力が出てる
   */
  export function publish(): void {
    const publish = Rx.Observable.timer(0, 1000).take(5).map(v => `A${v}`)
      .do(
        res => console.log(`res(do): ${res}`),
        err => console.log('err(do): ここには来ない'),
        () => console.log('complete(do)'),
      )
        .publish();

    publish.subscribe(
      res => console.log(`Pub(1): ${res}`),
      err => console.log('Pub(1): ここには来ない'),
      () => console.log('Pub(1): complete'),
    );
    publish.subscribe(
      res => console.log(`Pub(2): ${res}`),
      err => console.log('Pub(2): ここには来ない'),
      () => console.log('Pub(2): complete'),
    );
    publish.connect();
  }

  /**
   * 先頭に値を追加する `publish()` ？
   * - あまり良くわかってない
   * - `publish()` を先に知っておいた方が良い
   * - 実行ログを見ると先頭に `hogehoge` が追加されている
   */
  export function publishBehavior(): void {
    const publish = Rx.Observable.timer(0, 1000).take(5).map(v => `A${v}`)
      .do(
        res => console.log(`res(do): ${res}`),
        err => console.log('err(do): ここには来ない'),
        () => console.log('complete(do)'),
      )
        .publishBehavior('hogehoge');

    publish.subscribe(
      res => console.log(`Pub(1): ${res}`),
      err => console.log('Pub(1): ここには来ない'),
      () => console.log('Pub(1): complete'),
    );
    publish.subscribe(
      res => console.log(`Pub(2): ${res}`),
      err => console.log('Pub(2): ここには来ない'),
      () => console.log('Pub(2): complete'),
    );
    publish.connect();
  }

  /**
   * 最後の値のみを発行する `publish()` ？
   * - あまり良くわかってない
   * - `publish()` を先に知っておいた方が良い
   */
  export function publishLast(): void {
    const publish = Rx.Observable.timer(0, 1000).take(5).map(v => `A${v}`)
      .do(
        res => console.log(`res(do): ${res}`),
        err => console.log('err(do): ここには来ない'),
        () => console.log('complete(do)'),
      )
        .publishLast();

    publish.subscribe(
      res => console.log(`Pub(1): ${res}`),
      err => console.log('Pub(1): ここには来ない'),
      () => console.log('Pub(1): complete'),
    );
    publish.subscribe(
      res => console.log(`Pub(2): ${res}`),
      err => console.log('Pub(2): ここには来ない'),
      () => console.log('Pub(2): complete'),
    );
    publish.connect();
  }

  /**
   * - あまりよくわからず。。。
   * - うまく動かせなかった
   * - `publish()` は先に知っておいた方が良い
   */
  export function publishReplay(): void {
  }

  /**
   * 単一のサブスクリプションを共有する Observable を返す？
   * - `multicast()` と `publish()` の違いはわからなかった
   * - `ConnectableObservable` ではないので `connect()` が不要ということだけわかった
   */
  export function share(): void {
    const share = Rx.Observable.timer(0, 1000).take(5).map(v => `A${v}`)
      .do(
        res => console.log(`res(do): ${res}`),
        err => console.log('err(do): ここには来ない'),
        () => console.log('complete(do)'),
      )
        .share();

    share.subscribe(
      res => console.log(`Share(1): ${res}`),
      err => console.log('Share(1): ここには来ない'),
      () => console.log('Share(1): complete'),
    );
    share.subscribe(
      res => console.log(`Share(2): ${res}`),
      err => console.log('Share(2): ここには来ない'),
      () => console.log('Share(2): complete'),
    );
  }

  /**
   * - あまりよくわからず。。。
   * - うまく動かせなかった
   * - `publishReplay()` とほぼ変わらないと思うのだが。。。
   */
  export function shareReplay(): void {
  }

}

//MulticastingOperators.multicast();
//MulticastingOperators.publish();
//MulticastingOperators.publishBehavior();
//MulticastingOperators.publishLast();
//MulticastingOperators.publishReplay();
//MulticastingOperators.share();
//MulticastingOperators.shareReplay();
