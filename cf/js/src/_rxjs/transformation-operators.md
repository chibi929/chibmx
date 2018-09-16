# Transformation Operators

| Method Type | Method Name |
|-------------|-------------|
| instance method | [buffer](#buffer) |
| instance method | [bufferCount](#buffercount) |
| instance method | [bufferTime](#buffertime) |
| instance method | [bufferToggle](#buffertoggle) |
| instance method | [bufferWhen](#bufferwhen) |
| instance method | [concatMap](#concatmap) |
| instance method | [concatMapTo](#concatmapto) |
| instance method | [exhaustMap](#exhaustmap) |
| instance method | [expand](#expand) |
| instance method | [groupBy](#groupby) |
| instance method | [map](#map) |
| instance method | [mapTo](#mapto) |
| instance method | [mergeMap](#mergemap) |
| instance method | [mergeMapTo](#mergemapto) |
| instance method | [mergeMapScan](#mergemapscan) |
| instance method | [pairwise](#pairwise) |
| instance method | [partition](#partition) |
| instance method | [pluck](#pluck) |
| instance method | [scan](#scan) |
| instance method | [switchMap](#switchmap) |
| instance method | [switchMapTo](#switchmapto) |
| instance method | [window](#window) |
| instance method | [windowCount](#windowcount) |
| instance method | [windowToggle](#windowtoggle) |
| instance method | [windowWhen](#windowwhen) |
| **instance method** | [**reduce**](#reduce) |

## buffer

- Observable が発行する値をバッファしておく
    - `closingNotifier` による通知がある度にバッファを発行する

```ts
Rx.Observable.interval(1000)
  .buffer(Rx.Observable.interval(5000))
  .subscribe(res => console.log(res));

// => [ 0, 1, 2, 3 ]
// => [ 4, 5, 6, 7, 8 ]
// => [ 9, 10, 11, 12, 13 ]
// => ...
```

```ts
Rx.Observable.interval(1000)
  .buffer(Rx.Observable.interval(5000).take(3))
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => [ 0, 1, 2, 3 ]
// => [ 4, 5, 6, 7, 8 ]
// => [ 9, 10, 11, 12, 13 ]
// => complete
```

## bufferCount

- Obaservable が発行する値を `bufferSize` だけバッファしておき、溜まったら発行する
    - `buffer()` を先に知っておいた方が良い

```ts
Rx.Observable.interval(1000)
  .bufferCount(5)
  .subscribe(res => console.log(res));

// => [ 0, 1, 2, 3, 4 ]
// => [ 5, 6, 7, 8, 9 ]
// => [ 10, 11, 12, 13, 14 ]
// => ...
```

## bufferTime

- Observable が発行する値を `bufferTimeSpan` が経過するまでバッファしておく
    - `buffer()` を先に知っておいた方が良い

```ts
Rx.Observable.interval(1000)
  .bufferTime(5000)
  .subscribe(res => console.log(res));

// => [ 0, 1, 2, 3 ]
// => [ 4, 5, 6, 7, 8 ]
// => [ 9, 10, 11, 12, 13 ]
// => ...
```

## bufferToggle

- Observable が発行する値を `openings` による通知があった時から `closingSelector` による通知があるまでバッファしておく
    - `buffer()` を先に知っておいた方が良い

```ts
Rx.Observable.interval(1000)
  .bufferToggle(Rx.Observable.interval(10000), v => Rx.Observable.interval(5000))
  .subscribe(res => console.log(res));

// => [ 9, 10, 11, 12, 13 ]
// => [ 19, 20, 21, 22, 23 ]
// => [ 29, 30, 31, 32, 33 ]
// => ...
```

## bufferWhen

- Observable が発行する値を `closingSelector` による通知があるまでバッファしてとく
    - `buffer()` を先に知っておいた方が良い
    - `buffer()` との違いは `closingSelector` の Observable に `.take(3)` とか付けても効き目がない？

```ts
Rx.Observable.interval(1000)
  .bufferWhen(() => Rx.Observable.interval(5000))
  .subscribe(res => console.log(res));

// => [ 0, 1, 2, 3 ]
// => [ 4, 5, 6, 7, 8 ]
// => [ 9, 10, 11, 12, 13 ]
// => ...
```

```ts
Rx.Observable.interval(1000)
  .bufferWhen(() => Rx.Observable.interval(5000).take(3))
  .subscribe(res => console.log(res));

// => [ 0, 1, 2, 3 ]
// => [ 4, 5, 6, 7, 8 ]
// => [ 9, 10, 11, 12, 13 ]
// => ...
```

## concatMap

- Observable が発行した値を `project` で指定した Observable に使うことができる
    - `project` が発行中のときは待つ
- `concat()`, `map()` を先に知っておいた方が良い

```ts
Rx.Observable.interval(5000)
  .take(3)
  .concatMap(v => Rx.Observable.of(v * 10, v * 100, v * 1000))
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => 0
// => 0
// => 0
// => 10
// => 100
// => 1000
// => 20
// => 200
// => 2000
// => complete
```

```ts
Rx.Observable.interval(5000)
  .take(3)
  .concatMap(v => Rx.Observable.interval(1000).take(4))
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => 0
// => 1
// => 2
// => 3
// (1秒待つ)
// => 0
// => 1
// => 2
// => 3
// (1秒待つ)
// => 0
// => 1
// => 2
// => 3
// => complete
```

```ts
Rx.Observable.interval(5000)
  .take(3)
  .concatMap(v => Rx.Observable.interval(1000).take(10))
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
// => 5
// => 6
// => 7
// => 8
// => 9
// => 0
// => 1
// => 2
// => 3
// => 4
// => 5
// => 6
// => 7
// => 8
// => 9
// => 0
// => 1
// => 2
// => 3
// => 4
// => 5
// => 6
// => 7
// => 8
// => 9
// => complete
```

## concatMapTo

- Observable が発行した値を `observable` として発行する
- `concat()`, `mapTo()` を先に知っておいた方が良い

```ts
Rx.Observable.interval(5000)
  .take(3)
  .concatMapTo(Rx.Observable.of('A', 'B', 'C'))
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => A
// => B
// => C
// => A
// => B
// => C
// => A
// => B
// => C
// => complete
```

## exhaustMap

- `concatMap()` とだいたい同じ？
    - `project` が発行中の時に Observable が発行すると無視される
- `exhaust()`, `map()` を先に知っておいた方が良い

```ts
// `concatMap()` と同じ動き
Rx.Observable.interval(5000)
  .take(3)
  .exhaustMap(v => Rx.Observable.of(v * 10, v * 100, v * 1000))
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => 0
// => 0
// => 0
// => 10
// => 100
// => 1000
// => 20
// => 200
// => 2000
// => complete
```

```ts
// `concatMap()` と同じ動き
Rx.Observable.interval(5000)
  .take(3)
  .exhaustMap(v => Rx.Observable.interval(1000).take(4))
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => 0
// => 1
// => 2
// => 3
// => 0
// => 1
// => 2
// => 3
// => 0
// => 1
// => 2
// => 3
// => complete
```

```ts
Rx.Observable.interval(5000)
  .take(3)
  .exhaustMap(v => Rx.Observable.interval(1000).take(10))
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
// => 5
// => 6
// => 7
// => 8
// => 9
// => complete
```

## expand

- Observalue が発行する値を再帰的に処理する
    - Observale の出力は1つ目のみを使用？

```ts
Rx.Observable.of(1, 2, 3)
  .expand(v => Rx.Observable.of(2 * v))
  .take(5)
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => 1
// => 2
// => 4
// => 8
// => 16
// => complete
```

## groupBy

- Observable が発行する値をグループ化する

```ts
Rx.Observable.of(
  {id: 1, name: "A1"},
  {id: 1, name: "B1"},
  {id: 2, name: "B2"},
  {id: 1, name: "C1"},
  {id: 2, name: "C2"},
  {id: 3, name: "C3"},
  {id: 1, name: "D1"},
  {id: 2, name: "D2"},
  {id: 3, name: "D3"},
  {id: 4, name: "D4"}
).groupBy(v => v.id)
  .flatMap(v => v.reduce((acc, v2) => [...acc, v2], []))
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => [ { id: 1, name: 'A1' }, { id: 1, name: 'B1' }, { id: 1, name: 'C1' }, { id: 1, name: 'D1' } ]
// => [ { id: 2, name: 'B2' }, { id: 2, name: 'C2' }, { id: 2, name: 'D2' } ]
// => [ { id: 3, name: 'C3' }, { id: 3, name: 'D3' } ]
// => [ { id: 4, name: 'D4' } ]
// => complete
```

## map

- Observable の値を変換して発行する
    - `Array.map()` とだいたい同じ

```ts
Rx.Observable.range(1, 5)
  .map(v => v * 10)
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => 10
// => 20
// => 30
// => 40
// => 50
// => complete
```

## mapTo

- Observable の値を特定の値に変換して発行する
    - `map()` を先に知っておいた方が良い

```ts
Rx.Observable.range(1, 5)
  .mapTo("A")
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => A
// => A
// => A
// => A
// => A
// => complete
```

## mergeMap

- Observable の値を変換して、別の Observable と合成する
    - `merge()`, `map()` を先に知っておいた方が良い

```ts
Rx.Observable.range(1, 5)
  .mergeMap((v) => Rx.Observable.of(`${v}A`, `${v}B`, `${v}C`))
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => 1A
// => 1B
// => 1C
// => 2A
// => 2B
// => 2C
// => 3A
// => 3B
// => 3C
// => 4A
// => 4B
// => 4C
// => 5A
// => 5B
// => 5C
// => complete
```

## mergeMapTo

- Observable の値を特定の Observable に変換して発行する
    - `merge()`, `mapTo()` を先に知っておいた方が良い

```ts
Rx.Observable.range(1, 5)
  .mergeMapTo(Rx.Observable.of('A', 'B', 'C'))
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => A
// => B
// => C
// => A
// => B
// => C
// => A
// => B
// => C
// => A
// => B
// => C
// => A
// => B
// => C
// => complete
```

## mergeMapScan

- Observable の値を別の Observable に変換してアキュムレーターで蓄積する
    - `mergeMap()`, `scan()` を先に知っておいた方が良い

```ts
Rx.Observable.range(1, 5)
  .mergeScan((acc, v) => Rx.Observable.of(acc * v), 1)
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => 1
// => 2
// => 6
// => 24
// => 120
// => complete
```

## pairwise

- Observable の値のうち2つをペアにする

```ts
Rx.Observable.of("a", "b", "c", "d", "e")
  .pairwise()
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => [ 'a', 'b' ]
// => [ 'b', 'c' ]
// => [ 'c', 'd' ]
// => [ 'd', 'e' ]
// => complete
```

## partition

- Observable 自体を `predicate` の条件で分離する

```ts
Rx.Observable.range(1, 10)
  .partition(v => v % 2 === 0)
  .forEach(p => {
    p.subscribe(
      res => console.log(res),
      err => console.log('ここには来ない'),
      () => console.log('complete')
    );
  });

// => 2
// => 4
// => 6
// => 8
// => 10
// => complete
// => 1
// => 3
// => 5
// => 7
// => 9
// => complete
```

## pluck

- Observable の値のうち特定のキーのみを発行する

```ts
Rx.Observable.of(
  {name: 'AAAAA', age: 10},
  {name: 'BBBBB', age: 20},
  {name: 'CCCCC', age: 30},
).pluck('name')
 .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
 );

// => AAAAA
// => BBBBB
// => CCCCC
// => complete
```

## scan

- Observable の値をアキュムレーターに蓄積しつつ毎回発行する

```ts
Rx.Observable.range(1, 10)
  .scan((acc, v) => acc + v, 0)
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => 1
// => 3
// => 6
// => 10
// => 15
// => 21
// => 28
// => 36
// => 45
// => 55
// => complete
```

## switchMap

- Observable が発行する度に `project` で指定された Observable が発行する
- `switch()`. `map()` を先に知っておいた方が良い

```ts
Rx.Observable.interval(5000)
  .switchMap(v => Rx.Observable.of(`${v}A`))
  .subscribe(res => console.log(res));

// => 0A
// => 1A
// => 2A
// => 3A
// => ...
```

```ts
Rx.Observable.interval(5000)
  .switchMap(v => Rx.Observable.interval(1000))
  .subscribe(res => console.log(res));

// => 0
// => 1
// => 2
// => 3
// => 0
// => 1
// => 2
// => 3
// => 0
// => 1
// => 2
// => 3
// => ...
```

## switchMapTo

- Observable が発行する度に `observable` で指定された Observable が発行する
- `switch()`, `mapTo()` を先に知っておいた方が良い

```ts
Rx.Observable.interval(5000)
  .switchMapTo(Rx.Observable.of('A', 'B', 'C'))
  .subscribe(res => console.log(res));

// => A
// => B
// => C
// => A
// => B
// => C
// => A
// => B
// => C
// => ...
```

```ts
Rx.Observable.interval(5000)
  .switchMapTo(Rx.Observable.interval(1000))
  .subscribe(res => console.log(res));

// => 0
// => 1
// => 2
// => 3
// => 0
// => 1
// => 2
// => 3
// => 0
// => 1
// => 2
// => 3
// => ...
```

## window

- `windowBoundaries` で指定された Observable が発行する度に本線が分岐する
    - あまり良くわかってない

```ts
Rx.Observable.interval(100)
  .window(Rx.Observable.interval(1000))
  .map(w => w.take(2))
  .mergeAll()
  .subscribe(res => console.log(res));

// => 0
// => 1
// => 9
// => 10
// => 19
// => 20
// => 29
// => 30
// => ...
```

## windowCount

- `windowSize` 毎に本線が分岐する
    - `window()` を先に知っておいた方が良い
    - あまり良くわかってない

```ts
Rx.Observable.interval(100)
  .windowCount(10)
  .map(w => w.take(2))
  .mergeAll()
  .subscribe(res => console.log(res));

// => 0
// => 1
// => 10
// => 11
// => ...
```

## windowToggle

- Observable が発行する値を `openings` 毎に本線が分岐し `closingSelector` されるまで発行される
    - `window()` を先に知っておいた方が良い
    - あまり良くわかってない

```ts
Rx.Observable.interval(100)
  .windowToggle(Rx.Observable.interval(1000), v => Rx.Observable.interval(500))
  .mergeAll()
  .subscribe(res => console.log(res));

// => 9
// => 10
// => 11
// => 12
// => 13
// (500ms待機？)
// => 19
// => 20
// => 21
// => 22
// => 23
// (500ms待機？)
// => ...
```

## windowWhen

- `closingSelector`毎に本線が分岐する
    - `window()` を先に知っておいた方が良い
    - あまり良くわかってない
    - `window()` との違いもわからない

```ts
Rx.Observable.interval(100)
  .windowWhen(() => Rx.Observable.interval(1000))
  .map(w => w.take(2))
  .mergeAll()
  .subscribe(res => console.log(res));

// => 0
// => 1
// => 9
// => 10
// => 19
// => 20
// => ...
```

## **reduce**

- Observable の値をアキュムレーターに蓄積し、最後の結果を発行する
    - `scan()` とだいたい同じ

```ts
Rx.Observable.range(1, 10)
  .reduce((acc, v) => acc + v, 0)
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => 55
// => complete
```
