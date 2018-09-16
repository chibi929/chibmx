# Mathematical and Aggregate Operators

| Method Type | Method Name |
|-------------|-------------|
| instance method | [count](#count) |
| instance method | [max](#max) |
| instance method | [min](#min) |

## count

- Observable が発行する値の個数を発行する

```ts
Rx.Observable.of('a', 'bb', 'ccc')
  .count()
  .subscribe(res => console.log(res));

// => 3
```

```ts
Rx.Observable.of('a', 'bb', 'ccc')
  .count(v => v.length >= 2)
  .subscribe(res => console.log(res));

// => 2
```

## max

- Observable が発行する値の中で最大値を発行する

```ts
Rx.Observable.of(5, 4, -1, 8, 2)
  .max()
  .subscribe(res => console.log(res));

// => 8
```

## min

- Observable が発行する値の中で最小値を発行する

```ts
Rx.Observable.of(5, 4, -1, 8, 2)
  .min()
  .subscribe(res => console.log(res));

// => -1
```
