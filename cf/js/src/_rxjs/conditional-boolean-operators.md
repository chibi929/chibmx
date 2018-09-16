# Conditional and Boolean Operators

| Method Type | Method Name |
|-------------|-------------|
| instance method | [defaultIfEmpty](#defaultifempty) |
| instance method | [every](#every) |
| instance method | [find](#find) |
| instance method | [findIndex](#findindex) |
| instance method | [isEmpty](#isempty) |
| **instance method** | [**sequenceEqual**](#sequenceequal) |
| **instance method** | [**single**](#single) |

## defaultIfEmpty

- Observable の発行が Empty だった場合にデフォルト値を発行する

```ts
Rx.Observable.empty()
  .defaultIfEmpty('defaultValue')
  .subscribe(res => console.log(res));

// => defaultValue
```

```ts
Rx.Observable.empty()
  .defaultIfEmpty({ data: 'defaultValue'})
  .subscribe(res => console.log(res));

// => d{ data: 'defaultValue' }
```

```ts
Rx.Observable.of('a', 'bb', 'ccc')
  .defaultIfEmpty('defaultValue')
  .subscribe(res => console.log(res));

// => a
// => bb
// => ccc
```

## every

- `predicate` で指定する条件を全ての値が満たしているかどうかを発行する
    - `Array.every()` と同じ

```ts
Rx.Observable.of(1, 2, 3, 4, 5)
  .every(v => v <= 5)
  .subscribe(res => console.log(res));

// => true
```

```ts
Rx.Observable.of(1, 2, 3, 4, 5)
  .every(v => v < 5)
  .subscribe(res => console.log(res));

// => false
```

## find

- `predicate` で指定する条件を満たす値を発行する
    - `Array.find()` と同じ

```ts
Rx.Observable.of(1, 2, 3, 4, 5)
  .find(v => v === 4)
  .subscribe(res => console.log(res));

// => 4
```

```ts
Rx.Observable.of(1, 2, 3, 4, 5)
  .find(v => v % 2 === 0)
  .subscribe(res => console.log(res));

// => 2
```

```ts
Rx.Observable.of(1, 2, 3, 4, 5)
  .find(v => v === 10)
  .subscribe(res => console.log(res));

// => undefined
```

## findIndex

- `predicate` で指定する条件を満たす値のインデックスを発行する
    - `Array.findIndex()` と同じ

```ts
Rx.Observable.of(1, 2, 3, 4, 5)
  .findIndex(v => v === 4)
  .subscribe(res => console.log(res));

// => 3
```

```ts
Rx.Observable.of(1, 2, 3, 4, 5)
  .findIndex(v => v % 2 === 0)
  .subscribe(res => console.log(res));

// => 1
```

```ts
Rx.Observable.of(1, 2, 3, 4, 5)
  .findIndex(v => v === 10)
  .subscribe(res => console.log(res));

// => -1
```

## isEmpty

- Observable の発行する値が Empty かどうかを発行する

```ts
Rx.Observable.empty()
  .isEmpty()
  .subscribe(res => console.log(res));

// => true
```

```ts
Rx.Observable.of('a', 'bb', 'ccc')
  .isEmpty()
  .subscribe(res => console.log(res));

// => false
```

## **sequenceEqual**

- 同じ発行のある Observable かどうかを発行する

```ts
const compareObservable = Rx.Observable.range(5, 10);
Rx.Observable.of(5, 6, 7, 8, 9, 10, 11, 12, 13, 14)
  .sequenceEqual(compareObservable)
  .subscribe(res => console.log(res));

// => true
```

```ts
const compareObservable = Rx.Observable.range(5, 10);
Rx.Observable.of(5, 6, 7, 8, 9, 10)
  .sequenceEqual(compareObservable)
  .subscribe(res => console.log(res));

// => false
```

## **single**

- `predicate` で指定する値が１つしかない場合は成功

```ts
Rx.Observable.of('a', 'b', 'c', 'b', 'e')
  .single(v => v === 'a')
  .subscribe(
    res => console.log(res),
    err => console.log('ここには来ない'),
    () => console.log('complete')
  );

// => a
// => complete
```

```ts
Rx.Observable.of('a', 'b', 'c', 'b', 'e')
  .single(v => v === 'b')
  .subscribe(
    res => console.log('ここには来ない'),
    err => console.log(err),
    () => console.log('ここには来ない')
  );

// => Sequence contains more than one element
```
