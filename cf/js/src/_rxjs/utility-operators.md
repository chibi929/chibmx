# Utility Operators

| Method Type | Method Name |
|-------------|-------------|
| instance method | [delay](#delay) |
| instance method | [delayWhen](#delayehen) |
| instance method | [dematerialize](#dematerialize) |
| instance method | [do](#do) |
| instance method | [materialize](#materialize) |
| instance method | [observeOn](#observeon) |
| instance method | [subscribeOn](#subscribeon) |
| instance method | [timeInterval](#timeinterval) |
| instance method | [timeout](#timeout) |
| instance method | [timeoutWith](#timeoutwith) |
| instance method | [timestamp](#timestamp) |
| instance method | [toArray](#toarray) |
| **class method** | [**webSocket**](#websocket) |
| **instance method** | [**finally**](#finally) |
| **instance method** | [**forEach**](#foreach) |
| **instance method** | [**let**](#let) |
| **instance method** | [**lift**](#lift) |
| **instance method** | [**pipe**](#pipe) |
| **instance method** | [**toPromise**](#topromise) |

## delay

- Observable の発行を遅延させる

```ts
Rx.Observable.of('a', 'bb', 'ccc')
  .delay(5000)
  .subscribe(res => console.log(res));

// => a (5s after)
// => bb
// => ccc
```

## delayWhen

- Observable の発行を `delayDurationSelector` で返却する Observable が発行させる
    - `delay()` を先に知っておいたほうが良い

```ts
Rx.Observable.of('a', 'bbbb', 'cccccccc')
  .delayWhen(v => {
    return Rx.Observable.timer(v.length * 1000)
  })
  .subscribe(res => console.log(res));

// => a (1s after)
// => bbbb (4s after)
// => cccccccc (8s after)
```

## dematerialize

- `Rx.Notification` を `Observable` に変換する？
    - `materialize()` の逆(先に `materialize()` 見たほうがいいかも)
    - あまりよくわかってない

```ts
const notifA = new Rx.Notification('N', 'a');
const notifB = new Rx.Notification('N', 'b');
const notifE = new Rx.Notification('E', undefined, new TypeError('x.toUpperCase() is not a function'));

Rx.Observable.of(notifA, notifB, notifE)
  .dematerialize()
  .subscribe(
    res => console.log(res),
    err => console.log(err.message),
    () => console.log('ここには来ない'));

// => a
// => b
// => x.toUpperCase() is not a function
```

## do

- Observable の発行を subscribe する前にフックする

```ts
Rx.Observable.of('a', 'bb', 'ccc')
  .do(
    res => console.log(`do(res): ${res}`),
    err => console.log(`ここには来ない`),
    () => console.log(`do(complete)`)
  )
  .subscribe(
    res => console.log(`res: ${res}`),
    err => console.log(`ここには来ない`),
    () => console.log(`complete`)
  );

// => do(res): a
// => res: a
// => do(res): bb
// => res: bb
// => do(res): ccc
// => res: ccc
// => do(complete)
// => complete
```

## materialize

- `Observable` を `Rx.Notification` に変換する？
    - あまりよくわかってない

```ts
Rx.Observable.of<any>('a', 'b', undefined, 'd').map(v => v.toUpperCase())
  .materialize()
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => Notification { kind: 'N', value: 'A', error: undefined, hasValue: true }
// => Notification { kind: 'N', value: 'B', error: undefined, hasValue: true }
// => Notification {
//    kind: 'E',
//    value: undefined,
//    error: TypeError: Cannot read property 'toUpperCase' of undefined
//    ...
// complete
```

## observeOn

- Observable の発行を「次のタイミング」で行う？
    - あまりよくわかってない

```ts
const observable: Rx.Observable<any> = Rx.Observable.create(observer => {
  console.log('[1] before next()');
  observer.next(1);
  console.log('[1] after next()');

  console.log('[2] before next()');
  observer.next(2);
  console.log('[2] after next()');

  console.log('[3] before complete()');
  observer.complete();
  console.log('[3] after complete()');
});

console.log('[4] before subscribe');
observable.observeOn(Rx.Scheduler.async)
  .subscribe(
    next => console.log(`[emit] next: ${next}`),
    err => console.log(`[emit] error: ${err}`),
    () => console.log(`[emit] complete`)
  );
console.log('[4] after subscribe');

// => [4] before subscribe
// => [1] before next()
// => [1] after next()
// => [2] before next()
// => [2] after next()
// => [3] before complete()
// => [3] after complete()
// => [4] after subscribe
// => [emit] next: 1
// => [emit] next: 2
// => [emit] complete
```

## subscribeOn

- Observable の実行を「次のタイミング」で行う？
    - あまりよくわかってない

```ts
const o1: Rx.Observable<any> = Rx.Observable.create(observer => {
  console.log('[1] before next()');
  observer.next(1);
  console.log('[1] after next()');

  console.log('[2] before next()');
  observer.next(2);
  console.log('[2] after next()');

  console.log('[3] before complete()');
  observer.complete();
  console.log('[3] after complete()');
});

console.log('[4] before subscribe');
o1.subscribeOn(Rx.Scheduler.async)
  .subscribe(
    next => console.log(`[emit] next: ${next}`),
    err => console.log(`[emit] error: ${err}`),
    () => console.log(`[emit] complete`)
  );
console.log('[4] after subscribe');

// => [4] before subscribe
// => [4] after subscribe
// => [1] before next()
// => [emit] next: 1
// => [1] after next()
// => [2] before next()
// => [emit] next: 2
// => [2] after next()
// => [3] before complete()
// => [emit] complete: 
// => [3] after complete()
```

## timeInterval

- 前の発行からどれくらい経ったかを発行する

```ts
Rx.Observable.of('a', 'bbbb', 'cccccccc')
  .delayWhen(v => Rx.Observable.timer(v.length * 1000))
  .timeInterval()
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    res => console.log('complete'),
  );

// => TimeInterval { value: 'a', interval: 1005 }
// => TimeInterval { value: 'bbbb', interval: 3000 }
// => TimeInterval { value: 'cccccccc', interval: 4000 }
// => complete
```

## timeout

- タイムアウト時刻まで発行が無い場合はエラーを発行する

```ts
Rx.Observable.timer(5000, 1000)
  .timeout(1000)
  .subscribe(
    res => console.log('ここには来ない'),
    err => console.log(err.message),
    () => console.log('ここには来ない')
  );

// => Timeout has occurred
```

## timeoutWith

- タイムアウト時刻まで発行が無い場合は別の Observable を発行する
    - `timeout()` を先に知っておいたほうが良い
    - `timeout()` + `catch()` な感じ？

```ts
Rx.Observable.timer(5000, 1000)
  .timeoutWith(1000, Rx.Observable.of('a', 'bb', 'ccc'))
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => a
// => bb
// => ccc
// => complete
```

## timestamp

- 発行時刻が付加される

```ts
Rx.Observable.of('a', 'bbbb', 'cccccccc')
  .delayWhen(v => Rx.Observable.timer(v.length * 1000))
  .timestamp()
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => Timestamp { value: 'a', timestamp: 1521783521464 }
// => Timestamp { value: 'bbbb', timestamp: 1521783524459 }
// => Timestamp { value: 'cccccccc', timestamp: 1521783528462 }
// => complete
```

## toArray

- 発行された値を配列に変換する

```ts
Rx.Observable.of('a', 'b', 'c')
  .toArray()
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => [ 'a', 'b', 'c' ]
// => complete
```

## **webSocket**

- WebSocket を WebSocketSubject にラップする
    - あまりよくわかってない
    - うまく動かせなかった

```ts
const ws = Rx.Observable.webSocket('ws://localhost:8081');
ws.subscribe(
  res => console.log('message received: ' + res),
  err => console.log(err),
  () => console.log('complete')
);
ws.next(JSON.stringify({ op: 'hello' }));
```

## **finally**

- 一番最後に発火する関数を定義する

```ts
Rx.Observable.of('a', 'bb', 'ccc')
  .finally(() => {
    console.log('Finally!')
  })
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => a
// => bb
// => ccc
// => complete
// => Finally!
```

```ts
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
  .subscribe(
    res => console.log(res),
    err => console.log(err.message),
    () => console.log('ここには来ない')
  );

// => a
// => bb
// => Error!
// => Finally!
```

## **forEach**

- Subscribe ではなく Promise で購読する

```ts
Rx.Observable.of('a', 'bb', 'ccc')
  .forEach(v => console.log(`v: ${v}`))
  .then(res => console.log(`then: ${res}`))
  .catch(err => console.log('ここには来ない'));

// => v: a
// => v: bb
// => v: ccc
// => then: undefined
```

```ts
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

// => v: a
// => v: bb
// => catch: Error!
```

## **let**

- Observable が発行を Subscribeする前にフックできる？
    - `do()` の Observable 版？
    - あまりよくわかってない

```ts
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

// => let.do(res): a
// => do(res): a
// => res: a
// => let.do(res): bbbb
// => do(res): bbbb
// => res: bbbb
// => let.do(res): cccccccc
// => do(res): cccccccc
// => res: cccccccc
// => let.do(complete)
// => do(complete)
// => complete
```

## **lift**

- カスタムオペレータを差し込めるらしい
    - あまりよくわかってない
    - うまく動かせなかった

```ts
```

## **pipe**

- メソッドチェーンではない書き方ができる
    - メリットがわからない

```ts
Rx.Observable.range(1, 10)
  .pipe(
    filter(v => v % 2 === 0),
    map(v => v * 10),
    scan((acc, v) => acc + v, 0)
  )
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => 20
// => 60
// => 120
// => 200
// => 300
// => complete
```

## **toPromise**

-  Observable ではなく Promise で最後の値を取得する
    - Promise で購読する場合は `forEach()` を使う？


```ts
Rx.Observable.of('a', 'bbbb', 'cccccccc')
  .toPromise()
  .then(res => console.log(res))
  .catch(err => console.log('ここには来ない'));

// => cccccccc
```

```ts
Rx.Observable.of('a', 'bbbb', 'cccccccc')
  .map(v => {
    if (v.length > 4) {
      // throw しても catch には飛ばない
      return new Error('Error!');
    }
    return v;
  })
  .toPromise()
  .then(res => console.log(res))
  .catch(err => console.log('ここには来ない'));

// => Error: Error!
```
