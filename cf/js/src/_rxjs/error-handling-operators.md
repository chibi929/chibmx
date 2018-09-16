# Error Handling Operators

| Method Type | Method Name |
|-------------|-------------|
| instance method | [catch](#catch) |
| instance method | [retry](#retry) |
| instance method | [retryWhen](#retryehen) |
| **instance method** | [**onErrorResumeNext**](#onerrorresumenext) |

## catch

- Observable がエラーを発行したら次の Observable を発行する

```ts
Rx.Observable.throw('Error')
  .catch(err => Rx.Observable.of('a', 'bb', 'ccc'))
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

```ts
Rx.Observable.interval(1000)
  .map(v => {
    if (v === 4) {
      throw 'Error';
    }
    return v;
  })
  .catch(err => Rx.Observable.of('IV', 'V', 'VI'))
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => 1
// => 2
// => 3
// => IV
// => V
// => VI
// => complete
```

## retry

- Observable がエラーを発行したら `count` だけリトライする

```ts
Rx.Observable.throw('Error')
  .retry(3)
  .subscribe(
    res => console.log(res),
    err => console.log(err),
    () => console.log('ここには来ない')
  );

// => Error
```

```ts
Rx.Observable.interval(1000)
  .map(v => {
    if (v === 4) {
      throw 'Error';
    }
    return v;
  })
  .retry(3)
  .subscribe(
    res => console.log(res),
    err => console.log(err),
    () => console.log('ここには来ない')
  );

// => 1
// => 2
// => 3
// => 1
// => 2
// => 3
// => 1
// => 2
// => 3
// => 1
// => 2
// => 3
// => Error
```

## retryWhen

- Observable がエラーを発行したら `notifier` を基にリトライを行う
    - `retry()` を先に知っておいたほうが良い
    - あまりよくわかってないが、たぶん `retry()` とだいたい同じ

```ts
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
    () => console.log(`do(complete)`)
  )
  .retryWhen(errors => {
    return errors.delay(200).do(
      res => console.log(`errors(res): ${res}`), // エラーが発生するとここに飛んでくるんだな？
      err => console.log(`errors(err): ${err}`),
      () => console.log(`errors(complete)`)
    );
  })
  .subscribe(
    res => console.log(`res: ${res}`),
    err => console.log(`err: ${err}`),
    () => console.log(`complete`),
  );

// => do(res): 0
// => res: 0
// => do(res): 1
// => res: 1
// => do(res): 2
// => res: 2
// => do(res): 3
// => res: 3
// => do(err): Error
// => errors(res): Error
// => do(res): 0
// => res: 0
// => do(res): 1
// => res: 1
// => do(res): 2
// => res: 2
// => do(res): 3
// => res: 3
// => do(err): Error
// => errors(res): Error
// ...
```

## **onErrorResumeNext**

- Observable がエラーを発行したら次の Observable を発行する
    - `catch` と同じような感じ
    - 但し、コールバックに `err` は飛んでこないのでエラーハンドリングしたい場合は `catch` を使うと良い？

```ts
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

// => 0
// => 1
// => 2
// => 3
// => IV
// => V
// => VI
// => complete
```
