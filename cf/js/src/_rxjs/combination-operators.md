# Combination Operators

| Method Type | Method Name |
|-----|-----|
| class method | [combineLatest](#combinelatest) |
| class method | [concat](#concat) |
| class method | [forkJoin](#forkjoin) |
| class method | [merge](#merge) |
| class method | [zip](#zip) |
| instance method | [combineAll](#combineall) |
| instance method | [combineLatest](#combinelatest-1) |
| instance method | [concat](#concat-1) |
| instance method | [concatAll](#concatall) |
| instance method | [exhaust](#exhaust) |
| instance method | [merge](#merge-1) |
| instance method | [mergeAll](#mergeall) |
| instance method | [race](#race) |
| instance method | [startWith](#startwith) |
| instance method | [switch](#switch) |
| instance method | [withLatestFrom](#withlatestfrom) |
| instance method | [zip](#zip-1) |
| instance method | [zipAll](#zipall) |

## combineLatest

- 複数の Observable を組み合わせる


```ts
const observable1 = Rx.Observable.timer(0, 1000).map(v => `A${v}`);
const observable2 = Rx.Observable.timer(0, 3000).map(v => `B${v}`);
Rx.Observable.combineLatest(observable1, observable2)
  .subscribe(res => console.log(res));

// => [ 'A0', 'B0' ]
// (1s 待機)
// => [ 'A1', 'B0' ]
// (1s 待機)
// => [ 'A2', 'B0' ]
// (1s 待機)
// => [ 'A2', 'B1' ]
// => [ 'A3', 'B1' ]
// (1s 待機)
// => [ 'A4', 'B1' ]
// (1s 待機)
// => [ 'A5', 'B1' ]
// (1s 待機)
// => [ 'A5', 'B2' ]
// => [ 'A6', 'B2' ]
// (1s 待機)
// => [ 'A7', 'B2' ]
// (1s 待機)
// => [ 'A8', 'B2' ]
// (1s 待機)
// => [ 'A8', 'B3' ]
// => [ 'A9', 'B3' ]
// (1s 待機)
// ...
```

## concat

- 複数の Observable を順次実行する

```ts
const observable1 = Rx.Observable.timer(0, 1000).map(v => `A${v}`).take(5);
const observable2 = Rx.Observable.timer(0, 500).map(v => `B${v}`).take(5);
const observable3 = Rx.Observable.timer(0, 2000).map(v => `C${v}`).take(5);
Rx.Observable.concat(observable1, observable2, observable3)
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => A0
// => A1
// => A2
// => A3
// => A4
// => B0
// => B1
// => B2
// => B3
// => B4
// => C0
// => C1
// => C2
// => C3
// => C4
// => complete
```

## forkJoin

- 複数の Observable を並列実行し、最後の値のみ発行する

```ts
const observable1 = Rx.Observable.timer(0, 1000).map(v => `A${v}`).take(5);
const observable2 = Rx.Observable.timer(0, 500).map(v => `B${v}`).take(5);
const observable3 = Rx.Observable.timer(0, 2000).map(v => `C${v}`).take(5);
Rx.Observable.forkJoin(observable1, observable2, observable3)
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );
```

## merge

- 複数の Observable を並列実行し、それぞれ値を発行する

```ts
const observable1 = Rx.Observable.timer(0, 1000).map(v => `A${v}`).take(5);
const observable2 = Rx.Observable.timer(0, 500).map(v => `B${v}`).take(5);
const observable3 = Rx.Observable.timer(0, 2000).map(v => `C${v}`).take(5);
Rx.Observable.merge(observable1, observable2, observable3)
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => A0
// => B0
// => C0
// => B1
// => A1
// => B2
// => B3
// => C1
// => A2
// => B4
// => A3
// => C2
// => A4
// => C3
// => C4
// => complete
```

## zip

- 複数の Observable を合成して値を発行する

```ts
const age = Rx.Observable.of(10, 20, 30);
const name = Rx.Observable.of('Hoge', 'Foo', 'Bar');
const developer = Rx.Observable.of(true, true, false);
Rx.Observable.zip(age, name, developer)
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => [ 10, 'Hoge', true ]
// => [ 20, 'Foo', true ]
// => [ 30, 'Bar', false ]
// => complete
```

## combineAll

- 外側 Observable の発行が完了したら、内側の複数の Observable が組み合わされて発行される

```ts
Rx.Observable.timer(0, 1000).map(v => `Outer(${v})`).take(5)
  .do(
    res => console.log(`do(res): ${res}`),
    err => console.log('do(err): ここには来ない'),
    () => console.log('do(complete): complete')
  )
  .map(v => Rx.Observable.of(`Inner: ${v}`))
  .combineAll()
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => do(res): Outer(0)
// => do(res): Outer(1)
// => do(res): Outer(2)
// => do(res): Outer(3)
// => do(res): Outer(4)
// => do(complete): complete
// => [ 'Inner: Outer(0)', 'Inner: Outer(1)', 'Inner: Outer(2)', 'Inner: Outer(3)', 'Inner: Outer(4)' ]
// => complete

```

## combineLatest

- 複数の Observable を組み合わせる
    - instance method 版

```ts
Rx.Observable.timer(0, 1000).map(v => `A${v}`)
  .combineLatest(Rx.Observable.timer(0, 3000).map(v => `B${v}`))
  .subscribe(res => console.log(res));

// => [ 'A0', 'B0' ]
// (1s 待機)
// => [ 'A1', 'B0' ]
// (1s 待機)
// => [ 'A2', 'B0' ]
// (1s 待機)
// => [ 'A2', 'B1' ]
// => [ 'A3', 'B1' ]
// (1s 待機)
// => [ 'A4', 'B1' ]
// (1s 待機)
// => [ 'A5', 'B1' ]
// (1s 待機)
// => [ 'A5', 'B2' ]
// => [ 'A6', 'B2' ]
// (1s 待機)
// => [ 'A7', 'B2' ]
// (1s 待機)
// => [ 'A8', 'B2' ]
// (1s 待機)
// => [ 'A8', 'B3' ]
// => [ 'A9', 'B3' ]
```

## concat

- 複数の Observable を順次実行する
    - instance method 版

```ts
Rx.Observable.timer(0, 1000).map(v => `A${v}`).take(5)
  .concat(Rx.Observable.timer(0, 500).map(v => `B${v}`).take(5))
  .concat(Rx.Observable.timer(0, 2000).map(v => `C${v}`).take(5))
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => A0
// => A1
// => A2
// => A3
// => A4
// => B0
// => B1
// => B2
// => B3
// => B4
// => C0
// => C1
// => C2
// => C3
// => C4
// => complete
```

## concatAll

- 外側の Observable が発行されたら内側の Observable の発行が完了するまで待つ
    - `concat()` を先に知っておいた方が良い

```ts
Rx.Observable.of('A', 'B', 'C', 'D', 'E').map(v => `Outer(${v})`)
  .map(v => Rx.Observable.timer(0, 1000).take(3).map(vv => `Inner(${vv}): ${v}`))
  .concatAll()
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => Inner(0): Outer(A)
// => Inner(1): Outer(A)
// => Inner(2): Outer(A)
// => Inner(0): Outer(B)
// => Inner(1): Outer(B)
// => Inner(2): Outer(B)
// => Inner(0): Outer(C)
// => Inner(1): Outer(C)
// => Inner(2): Outer(C)
// => Inner(0): Outer(D)
// => Inner(1): Outer(D)
// => Inner(2): Outer(D)
// => Inner(0): Outer(E)
// => Inner(1): Outer(E)
// => Inner(2): Outer(E)
// => complete
```

## exhaust

- 外側の Observable が発行されたら内側の Observable が発行し始める
- 内側の Observable の発行完了前に次の外側 の Observable が発行したら無視される

```ts
// concatAll と同じ動き？
Rx.Observable.timer(0, 5000).take(3).map(v => `Outer(${v})`)
  .map(v => Rx.Observable.of(`Inner: ${v}`))
  .exhaust()
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => Inner: Outer(0)
// => Inner: Outer(1)
// => Inner: Outer(2)
// => complete
```

```ts
// concatAll と同じ動き？
Rx.Observable.timer(0, 5000).take(3).map(v => `Outer(${v})`)
  .map(v => Rx.Observable.timer(0, 1000).take(4).map(vv => `Inner(${vv}): ${v}`))
  .exhaust()
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => Inner(0): Outer(0)
// => Inner(1): Outer(0)
// => Inner(2): Outer(0)
// => Inner(3): Outer(0)
// => Inner(0): Outer(1)
// => Inner(1): Outer(1)
// => Inner(2): Outer(1)
// => Inner(3): Outer(1)
// => Inner(0): Outer(2)
// => Inner(1): Outer(2)
// => Inner(2): Outer(2)
// => Inner(3): Outer(2)
// => complete
```

```ts
Rx.Observable.timer(0, 5000).take(3).map(v => `Outer(${v})`)
  .map(v => Rx.Observable.timer(0, 1000).take(7).map(vv => `Inner(${vv}): ${v}`))
  .exhaust()
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => Inner(0): Outer(0)
// => Inner(1): Outer(0)
// => Inner(2): Outer(0)
// => Inner(3): Outer(0)
// => Inner(4): Outer(0)
// => Inner(5): Outer(0)
// => Inner(6): Outer(0)
// => Inner(0): Outer(2)
// => Inner(1): Outer(2)
// => Inner(2): Outer(2)
// => Inner(3): Outer(2)
// => Inner(4): Outer(2)
// => Inner(5): Outer(2)
// => Inner(6): Outer(2)
// => complete
```

## merge

- 複数の Observable を並列実行し、それぞれ値を発行する
    - instance method 版

```ts
Rx.Observable.timer(0, 1000).take(5).map(v => `A${v}`)
  .merge(Rx.Observable.timer(0, 500).take(5).map(v => `B${v}`))
  .merge(Rx.Observable.timer(0, 2000).take(5).map(v => `C${v}`))
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => A0
// => B0
// => C0
// => B1
// => A1
// => B2
// => B3
// => C1
// => A2
// => B4
// => A3
// => C2
// => A4
// => C3
// => C4
// => complete
```

## mergeAll

- 外側の Observable が発行されたら内側の Observable が発行し始める
- 内側の Observable の発行完了前に次の外側の Observable が発行したらそれぞれの値を発行する
    - `merge()` を先に知っておいた方が良い

```ts
Rx.Observable.timer(0, 5000).take(3).map(v => `Outer(${v})`)
  .map(v => Rx.Observable.timer(0, 1000).take(7).map(vv => `Inner(${vv}): ${v}`))
  .mergeAll()
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => Inner(0): Outer(0)
// => Inner(1): Outer(0)
// => Inner(2): Outer(0)
// => Inner(3): Outer(0)
// => Inner(4): Outer(0)
// => Inner(0): Outer(1)
// => Inner(5): Outer(0)
// => Inner(1): Outer(1)
// => Inner(6): Outer(0)
// => Inner(2): Outer(1)
// => Inner(3): Outer(1)
// => Inner(4): Outer(1)
// => Inner(0): Outer(2)
// => Inner(5): Outer(1)
// => Inner(1): Outer(2)
// => Inner(6): Outer(1)
// => Inner(2): Outer(2)
// => Inner(3): Outer(2)
// => Inner(4): Outer(2)
// => Inner(5): Outer(2)
// => Inner(6): Outer(2)
// => complete
```

## race

- 一番発行の速い Observable が採用される

```ts
Rx.Observable.interval(1000).take(2).map(v => `A${v}`)
  .race(Rx.Observable.interval(500).take(5).map(v => `B${v}`))
  .race(Rx.Observable.interval(2000).take(1).map(v => `C${v}`))
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => B0
// => B1
// => B2
// => B3
// => B4
// => complete
```

## startWith

- Observable の先頭に値を追加する

```ts
Rx.Observable.range(1, 5)
  .startWith('A' as any)
  .subscribe(...callbacks);

// => A
// => 1
// => 2
// => 3
// => 4
// => 5
// => complete

```

## switch

- 外側の Observable が発行する度に内側の Observable に切り替わる

```ts
Rx.Observable.timer(0, 5000).take(3).map(v => `Outer(${v})`)
  .map(v => Rx.Observable.timer(0, 1000).map(vv => `Inner(${vv}): ${v}`))
  .switch()
  .subscribe(res => console.log(res));

// => Inner(0): Outer(0)
// => Inner(1): Outer(0)
// => Inner(2): Outer(0)
// => Inner(3): Outer(0)
// => Inner(4): Outer(0)
// => Inner(0): Outer(1)
// => Inner(1): Outer(1)
// => Inner(2): Outer(1)
// => Inner(3): Outer(1)
// => Inner(4): Outer(1)
// => Inner(0): Outer(2)
// => Inner(1): Outer(2)
// => Inner(2): Outer(2)
// => Inner(3): Outer(2)
// => Inner(4): Outer(2)
// => Inner(5): Outer(2)
// => Inner(6): Outer(2)
// => Inner(7): Outer(2)
```

## withLatestFrom

- Observable が発行するときに、別の Observable の最新の値と合成して発行する

```ts
Rx.Observable.timer(0, 5000).take(3).map(v => `A${v}`)
  .withLatestFrom(Rx.Observable.timer(0, 1000).map(v => `B${v}`))
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => [ 'A(0)', 'B0' ]
// => [ 'A(1)', 'B4' ]
// => [ 'A(2)', 'B9' ]
// => complete
```

## zip

- 複数の Observable を合成して値を発行する
    - instance method 版

```ts
const age = Rx.Observable.of(10, 20, 30);
const name = Rx.Observable.of('Hoge', 'Foo', 'Bar');
const developer = Rx.Observable.of(true, true, false);
age.zip(name, developer)
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => [ 10, 'Hoge', true ]
// => [ 20, 'Foo', true ]
// => [ 30, 'Bar', false ]
// => complete
```

```ts
const age = Rx.Observable.of(10, 20, 30);
const name = Rx.Observable.of('Hoge', 'Foo', 'Bar');
const developer = Rx.Observable.of(true, true, false);
age.zip(name)
  .zip(developer)
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => [ [ 10, 'Hoge' ], true ]
// => [ [ 20, 'Foo' ], true ]
// => [ [ 30, 'Bar' ], false ]
// => complete
```

## zipAll

- 外側の Observable を内側の Observable に合成して発行する
    - `zip()` を先に知っておいた方が良い

```ts
Rx.Observable.timer(0, 5000).take(3).map(v => `Outer(${v})`)
  .map(v => Rx.Observable.timer(0, 1000).take(7).map(vv => `Inner(${vv}): ${v}`))
  .zipAll()
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => [ 'Inner(0): Outer(0)', 'Inner(0): Outer(1)', 'Inner(0): Outer(2)' ]
// => [ 'Inner(1): Outer(0)', 'Inner(1): Outer(1)', 'Inner(1): Outer(2)' ]
// => [ 'Inner(2): Outer(0)', 'Inner(2): Outer(1)', 'Inner(2): Outer(2)' ]
// => [ 'Inner(3): Outer(0)', 'Inner(3): Outer(1)', 'Inner(3): Outer(2)' ]
// => [ 'Inner(4): Outer(0)', 'Inner(4): Outer(1)', 'Inner(4): Outer(2)' ]
// => [ 'Inner(5): Outer(0)', 'Inner(5): Outer(1)', 'Inner(5): Outer(2)' ]
// => [ 'Inner(6): Outer(0)', 'Inner(6): Outer(1)', 'Inner(6): Outer(2)' ]
```
