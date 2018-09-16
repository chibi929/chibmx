# Filtering Operators

| Method Type | Method Name |
|-------------|-------------|
| instance method | [audit](#audit) |
| instance method | [auditTime](#audittime) |
| instance method | [debounce](#debounce) |
| instance method | [debounceTime](#debouncetime) |
| instance method | [distinct](#distinct) |
| instance method | [distinctUntilChanged](#distinctuntilchanged) |
| instance method | [distinctUntilKeyChanged](#distinctuntilkeychanged) |
| instance method | [elementAt](#elementat) |
| instance method | [filter](#filter) |
| instance method | [first](#first) |
| instance method | [ignoreElements](#ignoreelements) |
| instance method | [last](#last) |
| instance method | [sample](#sample) |
| instance method | [sampleTime](#sampletime) |
| instance method | [skip](#skip) |
| instance method | [skipLast](#skiplast) |
| instance method | [skipUntil](#skipuntil) |
| instance method | [skipWhile](#skipwhile) |
| instance method | [take](#take) |
| instance method | [takeLast](#takelast) |
| instance method | [takeUntil](#takeuntil) |
| instance method | [takeWhile](#takewhile) |
| instance method | [throttle](#throttle) |
| instance method | [throttleTime](#throttletime) |

## audit

- Observable は `durationSelector` で指定した Observable が発行したら最新の値を発行する

```ts
Rx.Observable.interval(100)
  .audit(v => Rx.Observable.timer(10000))
  .subscribe(res => console.log(res));

// => 97
// => 195
// => 293
// ...
```

```ts
Rx.Observable.interval(100)
  .map(v => {
    if (v > 100) {
      throw 'Error!';
    }
    return Rx.Observable.timer(10000);
  })
  .subscribe(
    res => console.log(res),
    err => console.log(err.message),
    () => console.log('ここには来ない')
  );

// => 96
// => 195
// => Error!
```

## auditTime

- Observable は `duration` で指定された時刻が来たら最新の値を発行する
    - `audit()` を先に知っておいた方が良い

```ts
Rx.Observable.interval(100)
  .auditTime(10000)
  .subscribe(res => console.log(res));

// => 98
// => 198
// => 298
// ...
```

## debounce

- `durationSelector` で指定した Observable が発行するまで遅延する
    - `durationSelector` が発火する前に次の値が発行したら遅延した値は消える
    - あまりよくわかってないが、そんな感じと思われる・・・。

```ts
Rx.Observable.interval(1000)
  .debounce(v => Rx.Observable.timer(500))
  .subscribe(res => console.log(res));

// => 0
// => 1
// => 2
// ...
```

## debounceTime

- `dueTime` で指定した時間まで遅延する
    - `debounce()` を先に知っておいた方が良い
    - `dueTime` が経つ前に次の値が発行したら遅延した値は消える
    - あまりよくわかってないが、そんな感じと思われる・・・。

```ts
Rx.Observable.interval(1000)
  .debounceTime(2000)
  .subscribe(res => console.log(res));
```

## distinct

- Observable が発行する値の重複を排除する

```ts
Rx.Observable.of(1, 1, 2, 2, 2, 1, 2, 4, 3, 2, 3, 1)
  .distinct()
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => 1
// => 2
// => 4
// => 3
// => complete
```

## distinctUntilChanged

- Observable が発行する値のうち、直前の値と同じ場合は排除する
    - `distinct()` を先に知っておいた方が良い

```ts
Rx.Observable.of(1, 1, 2, 2, 2, 1, 2, 4, 3, 2, 3, 1)
  .distinctUntilChanged()
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => 1
// => 2
// => 1
// => 2
// => 4
// => 3
// => 2
// => 3
// => 1
// => complete
```

## distinctUntilKeyChanged

- Observable が発行する値のうち、特定の Key に対して直前の値と同じ場合は排除する
    - `distinct()` を先に知っておいた方が良い

```ts
Rx.Observable.of(
  { age: 10, name: 'Hoge' },
  { age: 20, name: 'Foo' },
  { age: 30, name: 'Foo' },
  { age: 10, name: 'Hoge' })
  .distinctUntilKeyChanged('name')
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => { age: 10, name: 'Hoge' }
// => { age: 20, name: 'Foo' }
// => { age: 10, name: 'Hoge' }
// => complete
```

```ts
Rx.Observable.of(
  { age: 10, name: 'Hoge' },
  { age: 20, name: 'Foo' },
  { age: 20, name: 'Hoge' },
  { age: 10, name: 'Foo' })
  .distinctUntilKeyChanged('age')
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => { age: 10, name: 'Hoge' }
// => { age: 20, name: 'Foo' }
// => { age: 10, name: 'Foo' }
// => complete
```

## elementAt

- Observable が発行する値のうち、特定の値を発行する

```ts
Rx.Observable.of('A', 'B', 'C')
  .elementAt(1)
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => B
// => complete
```

## filter

- Observable が発行する値を `predicate` で指定した条件にフィルタする
    - `Array.filter()` と同じ

```ts
Rx.Observable.range(1, 5)
  .filter(v => v % 2 === 0)
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => 2
// => 4
// => complete
```

## first

- Observable が最初に発行する値のみにフィルタする
    - `predicate` を指定して条件を指定することも可能

```ts
Rx.Observable.range(1, 5)
  .first()
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => 1
// => complete
```

```ts
Rx.Observable.range(1, 5)
  .first(v => v % 2 === 0)
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => 2
// => complete
```

## ignoreElements

- Observable が発行する全ての値を無視する

```ts
Rx.Observable.range(1, 5)
  .ignoreElements()
  .subscribe(
    res => console.log('ここには来ない'),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => complete
```

## last

- Observable が最初に発行する値のみにフィルタする
    - `predicate` を指定して条件を指定することも可能

```ts
Rx.Observable.range(1, 5)
  .last()
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => 5
// => complete
```

```ts
Rx.Observable.range(1, 5)
  .last(v => v % 2 === 0)
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => 4
// => complete
```

## sample

-  `notifier` で指定された Observable による通知があった時に最新の値を発行する
    - 最新の値に変化がない場合は何も起きない

```ts
Rx.Observable.interval(1000)
  .sample(Rx.Observable.interval(5000))
  .subscribe(res => console.log(res));

// => 3
// => 8
// => 13
// => ...
```

```ts
Rx.Observable.interval(5000)
  .sample(Rx.Observable.interval(1000))
  .subscribe(res => console.log(res));

// => 0
// => 1
// => 2
// => 3
// => ...
```

## sampleTime

- `period` で指定された時間が経った時に最新の値を発行する
    - `sample()` を先に知っておいた方が良い
    - 最新の値に変化がない場合は何も起きない

```ts
Rx.Observable.interval(1000)
  .sampleTime(5000)
  .subscribe(res => console.log(res));

// => 3
// => 8
// => 13
// => ...
```

```ts
Rx.Observable.interval(5000)
  .sampleTime(1000)
  .subscribe(res => console.log(res));

// => 0
// => 1
// => 2
// => 3
// => ...
```

## skip

- Observable が発行する値を `count` だけスキップする

```ts
Rx.Observable.range(1, 5)
  .skip(3)
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => 4
// => 5
// => complete
```

## skipLast

- Observable が発行する値を `count` だけ後ろからスキップする
    - `skip()` を先に知っておいた方が良い

```ts
Rx.Observable.range(1, 5)
  .skipLast(3)
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => 1
// => 2
// => complete
```

## skipUntil

- `notifier` で指定された Observable による通知があるまでスキップする
    - `skip()` を先に知っておいた方が良い

```ts
Rx.Observable.interval(1000)
  .skipUntil(Rx.Observable.timer(5000))
  .subscribe(res => console.log(res));

// => 4
// => 5
// => ...
```

## skipWhile

- `predicate` で指定する条件が true の間はスキップする
    - `skip()` を先に知っておいた方が良い
    - 一度条件から外れると発行が行われる
    - (途中から再びスキップされる。とかは無い)

```ts
Rx.Observable.interval(1000)
  .skipWhile(v => v < 5)
  .subscribe(res => console.log(res));

// => 5
// => 6
// => ...
```

```ts
Rx.Observable.interval(1000)
  .skipWhile(v => v > 5)
  .subscribe(res => console.log(res));

// => 0
// => 1
// => 2
// => 3
// => 4
// => 5
// => 6
// => 7
// => ...
```

## take

- Observable が発行する値のうち `count` 回だけ発行する

```ts
Rx.Observable.interval(1000)
  .take(3)
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => 0
// => 1
// => 2
// => complete
```

## takeLast

- Observable が発行する値のうち、ラスト `count` 回だけ発行する
    - `take()` を先に知っておいた方が良い

```ts
Rx.Observable.interval(1000)
  .take(5)
  .takeLast(2)
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => 3
// => 4
// => complete
```

## takeUntil

- `notifier` に指定された Observable による通知があるまで発行する
    - `take()` を先に知っておいた方が良い

```ts
Rx.Observable.interval(1000)
  .takeUntil(Rx.Observable.timer(5000))
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => 0
// => 1
// => 2
// => 3
// => complete
```

## takeWhile

- `predicate` が true の間は発行する
    - `take()` を先に知っておいた方が良い
    - 一度条件から外れたら終了
    - (途中から再び発行し始める。とかは無い)

```ts
Rx.Observable.interval(1000)
  .takeWhile(v => v < 5)
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => 0
// => 1
// => 2
// => 3
// => 4
// => complete
```

## throttle

- だいたい `sample()` と同じ動きをする？
    - `durationSelector` が発行されるまで Observable の発行は無視される

```ts
Rx.Observable.interval(1000)
  .throttle(v => Rx.Observable.timer(5000))
  .subscribe(res => console.log(res));

// => 0
// => 5
// => 10
// => ...
```

## throttleTime

- `duration` で指定するバージョン
    - `throttle()` を先に知っておいた方が良い

```ts
Rx.Observable.interval(1000)
  .throttleTime(5000)
  .subscribe(res => console.log(res));

// => 0
// => 5
// => 10
// => ...
```
