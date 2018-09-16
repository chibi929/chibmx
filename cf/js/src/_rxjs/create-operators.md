# Create Operators

| Method Type | Method Name |
|-------------|-------------|
| class method | [bindCallback](#bindcallback) |
| class method | [bindNodeCallback](#bindnodecallback) |
| class method | [create](#create) |
| class method | [defer](#defer) |
| class method | [empty](#empty) |
| class method | [from](#from) |
| class method | [fromEvent](#fromevent) |
| class method | [fromEventPattern](#fromeventpattern) |
| class method | [fromPromise](#frompromise) |
| class method | [interval](#interval) |
| class method | [never](#never) |
| class method | [of](#of) |
| class method | [range](#range) |
| class method | [throw](#throw) |
| class method | [timer](#timer) |
| instance method | [repeat](#repeat) |
| instance method | [repeatWhen](#repeatwhen) |

## bindCallback

- コールバック付きの関数から Observable を作成する

```ts
function func(cb: () => void) {
  setTimeout(() => {
    cb();
  }, 1000);
}

const observable = Rx.Observable.bindCallback(func);
observable().subscribe(() => console.log('success'));

// => success
```

```ts
function func(cb: (s1) => void) {
  setTimeout(() => {
    cb('Hello');
  }, 1000);
}

const observable = Rx.Observable.bindCallback(func);
observable().subscribe(res => console.log(res));

// => Hello
```

```ts
function func(cb: (s1, s2) => void) {
  setTimeout(() => {
    cb('Hello', 'World!');
  }, 1000);
}

const observable = Rx.Observable.bindCallback(func);
observable().subscribe(res => console.log(res));

// => [ 'Hello', 'World' ]
```

```ts
function func(value: number, cb: (n1) => void) {
  setTimeout(() => {
    cb(value * 10);
  }, 1000);
}

const observable = Rx.Observable.bindCallback(func);
observable(5).subscribe(res => console.log(res));

// => 50
```

## bindNodeCallback

- `(err, data) => void` のような良くあるコールバック付きの関数から Observable を作成する
  - `bindCallback()` を先に知っておいたほうが良い
  - `bindCallback()` とだいたい同じ

```ts
function func(cb: (err, data) => void) {
  setTimeout(() => {
    cb(null, 'Hello');
  }, 1000);
}

const observable = Rx.Observable.bindNodeCallback(func);
observable().subscribe(res => console.log(res));

// => Hello
```

```ts
function func(cb: (err, data1, data2) => void) {
  setTimeout(() => {
    cb(null, 'Hello', 'World!');
  }, 1000);
}

const observable = Rx.Observable.bindNodeCallback(func);
observable().subscribe(res => console.log(res));

// => [ 'Hello', 'World!' ]
```

```ts
function func(cb: (err, data?) => void) {
  setTimeout(() => {
    cb('Error');
  }, 1000);
}

const observable = Rx.Observable.bindNodeCallback(func);
observable().subscribe(
  res => console.log('ここには来ない'),
  err => console.log(err)
);

// => Error
```

## create

- 新しい Observable を作成する

```ts
const observable = Rx.Observable.create(observer => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
});
observable.subscribe(res => console.log(res));

// => 1
// => 2
// => 3
```

```ts
const observable = Rx.Observable.create(observer => {
  observer.next(1);
  observer.error('Error');
  observer.next(2);
  observer.complete();
});
observable.subscribe(
  res => console.log(res),
  err => console.log(err)
);

// => 1
// => Error
```

## defer

- 遅延して Observable を作成する

```ts
Rx.Observable.defer(() => Rx.Observable.of('a', 'b', 'c'))
  .subscribe(res => console.log(res));

// => a
// => b
// => c
```

## empty

- 何も発行せず `complete` する Observable を作成する

```ts
Rx.Observable.empty()
  .subscribe(
    res => console.log('ここには来ない'),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => complete
```

## from

- 配列から Observable を作成する

```ts
Rx.Observable.from([10, 20, 30])
  .subscribe(res => console.log(res));

// => a
// => b
// => c
```

## fromEvent

- DOM Events や EventEmitter から Observable を作成する

```ts
Rx.Observable.fromEvent(document, 'click')
  .subscribe(evt => console.log(`x: ${evt.x}, y: ${evt.y}`));

// => x: 299, y: 527
// => x: 332, y: 547
// => x: 343, y: 328
```

## fromEventPattern

- `addHandler` , `removeHandler` に基づいて Observable を作成する
  - `fromEvent()` を先に知っておいたほうが良い
  - あまりよくわかってないが、たぶん `fromEvent()` とだいたい同じ

```ts
Rx.Observable.fromEventPattern(
  (handler: any) => document.addEventListener('click', handler),
  (handler: any) => document.removeEventListener('click', handler)
).subscribe(evt => console.log(`x: ${evt.x}, y: ${evt.y}`));

// => x: 299, y: 527
// => x: 332, y: 547
// => x: 343, y: 328
```

## fromPromise

- Promise から Observable を作成する

```ts
function func(cb: () => void) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success');
    }, 1000);
  });
}

Rx.Observable.fromPromise(func())
  .subscribe(res => console.log(res));

// => success
```

```ts
function func(cb: () => void) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('error');
    }, 1000);
  });
}

Rx.Observable.fromPromise(func())
  .subscribe(
    res => console.log('ここには来ない'),
    err => console.log(err)
  );

// => error
```

## interval

- 定期的に発行する Observable を作成する

```ts
Rx.Observable.interval(1000)
  .subscribe(res => console.log(res));

// => 0
// => 1
// => 2
// ...
```

## never

- 何もしない Observable を作成する

```ts
Rx.Observable.never()
  .subscribe(
    res => console.log('ここには来ない'),
    err => console.log('ここには来ない'),
    () => console.log('ここには来ない')
  );

// => (何も起きない)
```

## of

- 指定した値を発行する Observable を作成する

```ts
Rx.Observable.of(1, 2, 3)
  .subscribe(res => console.log(res));

// => 1
// => 2
// => 3
```

```ts
Rx.Observable.of('a', 'b', 'c')
  .subscribe(res => console.log(res));

// => a
// => b
// => c
```

```ts
Rx.Observable.of<any>([1, 2, 3], ['a', 'b', 'c'])
  .subscribe(res => console.log(res));

// => [ 1, 2, 3 ]
// => [ 'a', 'b', 'c' ]
```

## range

- `start` から `count` 個の数値を発行する Observable を作成する

```ts
Rx.Observable.range(1, 10)
  .subscribe(res => console.log(res));

// => 1
// => 2
// => 3
// => ...
// => 9
// => 10
```

```ts
Rx.Observable.range(5, 10)
  .subscribe(res => console.log(res));

// => 5
// => 6
// => 7
// => ...
// => 13
// => 14
```

## throw

- エラーを発行する Observable を作成する

```ts
Rx.Observable.throw('Error')
  .subscribe(
    res => console.log('ここには来ない'),
    err => console.log(err)
  );

// => Error
```

## timer

- 開始時間を指定して定期的に発行する Observable を作成する
  - `interval()` とだいたい同じ

```ts
Rx.Observable.timer(3000, 1000)
  .subscribe(res => console.log(res));

// => 0
// => 1
// => 2
// => ...
```

## repeat

- 本線を指定回数繰り返す Observable を作成する

```ts
Rx.Observable.of('a', 'b', 'c')
  .repeat(3)
  .subscribe(res => console.log(res));

// => a
// => b
// => c
// => a
// => b
// => c
// => a
// => b
// => c
```

## repeatWhen

- `notifier` が発行された時に本線を繰り返す Observable を作成する？
  - `repeat()` を先に知っておいたほうが良い
  - あまりよくわかってないが、たぶん `repeat()` とだいたい同じ

```ts
Rx.Observable.of('a', 'b', 'c')
  .repeatWhen(notifier => notifier.take(3)) // +3回繰り返される
  .subscribe(res => console.log(res));

// => a
// => b
// => c
// => a
// => b
// => c
// => a
// => b
// => c
// => a
// => b
// => c
```
