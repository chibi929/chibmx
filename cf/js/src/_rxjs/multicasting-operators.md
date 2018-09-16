# Multicasting Operators

| Method Type | Method Name |
|-------------|-------------|
| instance method | [multicast](#multicast) |
| instance method | [publish](#publish) |
| instance method | [publishBehavior](#publishbehavior) |
| instance method | [publishLast](#publishLast) |
| instance method | [publishReplay](#publishreplay) |
| instance method | [share](#share) |
| **instance method** | [**shareReplay**](#sharereplay) |

## multicast

- 単一のサブスクリプションを共有する Observable を返す？
    - あまりよくわかってない
    - 実行ログを見ると `do` 1つに対して `Multi(1), (2)` の出力が出てる

```ts
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

// => res(do): A0
// => Multi(1): A0
// => Multi(2): A0
// => res(do): A1
// => Multi(1): A1
// => Multi(2): A1
// => res(do): A2
// => Multi(1): A2
// => Multi(2): A2
// => res(do): A3
// => Multi(1): A3
// => Multi(2): A3
// => res(do): A4
// => Multi(1): A4
// => Multi(2): A4
// => complete(do)
// => Multi(1): complete
// => Multi(2): complete
```

## publish

- 単一のサブスクリプションを共有する Observable を返す？
    - あまりよくわかってない
    - `multicast()` との違いもわからない
    - 実行ログを見ると `do` 1つに対して `Pub(1), (2)` の出力が出てる

```ts
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

// => res(do): A0
// => Pub(1): A0
// => Pub(2): A0
// => res(do): A1
// => Pub(1): A1
// => Pub(2): A1
// => res(do): A2
// => Pub(1): A2
// => Pub(2): A2
// => res(do): A3
// => Pub(1): A3
// => Pub(2): A3
// => res(do): A4
// => Pub(1): A4
// => Pub(2): A4
// => complete(do)
// => Pub(1): complete
// => Pub(2): complete
```

## publishBehavior

-  先頭に値を追加する `publish()` ？
    - あまり良くわかってない
    - `publish()` を先に知っておいた方が良い
    - 実行ログを見ると先頭に `hogehoge` が追加されている

```ts
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

// => Pub(1): hogehoge
// => Pub(2): hogehoge
// => res(do): A0
// => Pub(1): A0
// => Pub(2): A0
// => res(do): A1
// => Pub(1): A1
// => Pub(2): A1
// => res(do): A2
// => Pub(1): A2
// => Pub(2): A2
// => res(do): A3
// => Pub(1): A3
// => Pub(2): A3
// => res(do): A4
// => Pub(1): A4
// => Pub(2): A4
// => complete(do)
// => Pub(1): complete
// => Pub(2): complete
```

## publishLast

- 最後の値のみを発行する `publish()` ？
    - あまり良くわかってない
    - `publish()` を先に知っておいた方が良い

```ts
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
    
// => res(do): A0
// => res(do): A1
// => res(do): A2
// => res(do): A3
// => res(do): A4
// => complete(do)
// => Pub(1): A4
// => Pub(2): A4
// => Pub(1): complete
// => Pub(2): complete
```

## publishReplay

- あまりよくわからず
- うまく動かせなかった
- `publish()` は先に知っておいた方が良い

```ts
```

## share

- 単一のサブスクリプションを共有する Observable を返す？
    - `multicast()` と `publish()` の違いはわからなかった
    - `ConnectableObservable` ではないので `connect()` が不要ということだけわかった

```ts
// => res(do): A0
// => Share(1): A0
// => Share(2): A0
// => res(do): A1
// => Share(1): A1
// => Share(2): A1
// => res(do): A2
// => Share(1): A2
// => Share(2): A2
// => res(do): A3
// => Share(1): A3
// => Share(2): A3
// => res(do): A4
// => Share(1): A4
// => Share(2): A4
// => complete(do)
// => Share(1): complete
// => Share(2): complete
```

## **shareReplay**

- あまりよくわからず。。。
- うまく動かせなかった
- `publishReplay()` とほぼ変わらないと思うのだが。。。

```ts
```
