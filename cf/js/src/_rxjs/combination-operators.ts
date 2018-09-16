import * as Rx from 'rxjs';
import { callbacks } from './subscribe-callback-impl';

export namespace CombinationOperators {
  export namespace C {
    /**
     * 複数の Observable を組み合わせる
     */
    export function combineLatest(): void {
      const observable1 = Rx.Observable.timer(0, 1000).map(v => `A${v}`);
      const observable2 = Rx.Observable.timer(0, 3000).map(v => `B${v}`);
      Rx.Observable.combineLatest(observable1, observable2)
        .subscribe(...callbacks);
    }

    /**
     * 複数の Observable を順次実行する
     */
    export function concat(): void {
      const observable1 = Rx.Observable.timer(0, 1000).map(v => `A${v}`).take(5);
      const observable2 = Rx.Observable.timer(0, 500).map(v => `B${v}`).take(5);
      const observable3 = Rx.Observable.timer(0, 2000).map(v => `C${v}`).take(5);
      Rx.Observable.concat(observable1, observable2, observable3)
        .subscribe(...callbacks);
    }

    /**
     * 複数の Observable を並列実行し、最後の値のみ発行する
     */
    export function forkJoin(): void {
      const observable1 = Rx.Observable.timer(0, 1000).map(v => `A${v}`).take(5);
      const observable2 = Rx.Observable.timer(0, 500).map(v => `B${v}`).take(5);
      const observable3 = Rx.Observable.timer(0, 2000).map(v => `C${v}`).take(5);
      Rx.Observable.forkJoin(observable1, observable2, observable3)
        .subscribe(...callbacks);
    }

    /**
     * 複数の Observable を並列実行し、それぞれ値を発行する
     */
    export function merge(): void {
      const observable1 = Rx.Observable.timer(0, 1000).map(v => `A${v}`).take(5);
      const observable2 = Rx.Observable.timer(0, 500).map(v => `B${v}`).take(5);
      const observable3 = Rx.Observable.timer(0, 2000).map(v => `C${v}`).take(5);
      Rx.Observable.merge(observable1, observable2, observable3)
        .subscribe(...callbacks);
    }

    /**
     * 複数の Observable を合成して値を発行する
     */
    export function zip(): void {
      const age = Rx.Observable.of(10, 20, 30);
      const name = Rx.Observable.of('Hoge', 'Foo', 'Bar');
      const developer = Rx.Observable.of(true, true, false);
      Rx.Observable.zip(age, name, developer)
        .subscribe(...callbacks);
    }
  }

  export namespace I {
    /**
     * 外側の Observable の発行が完了したら、内側の複数の Observable が組み合わされて発行される
     */
    export function combineAll(): void {
      Rx.Observable.timer(0, 1000).map(v => `Outer(${v})`).take(5)
        .do(
          res => console.log(`do(res): ${res}`),
          err => console.log('do(err): ここには来ない'),
          () => console.log('do(complete): complete')
        )
          .map(v => Rx.Observable.of(`Inner: ${v}`))
        .combineAll()
        .subscribe(...callbacks);
    }

    /**
     * 複数の Observable を組み合わせる
     * - instance method 版
     */
    export function combineLatest(): void {
      Rx.Observable.timer(0, 1000).map(v => `A${v}`)
        .combineLatest(Rx.Observable.timer(0, 3000).map(v => `B${v}`))
        .subscribe(...callbacks);
    }

    /**
     * 複数の Observable を順次実行する
     * - instance method 版
     */
    export function concat(): void {
      Rx.Observable.timer(0, 1000).map(v => `A${v}`).take(5)
        .concat(Rx.Observable.timer(0, 500).map(v => `B${v}`).take(5))
        .concat(Rx.Observable.timer(0, 2000).map(v => `C${v}`).take(5))
        .subscribe(...callbacks);
    }

    /**
     * 外側の Observable が発行されたら内側の Observable の発行が完了するまで待つ
     * - `concat()` を先に知っておいた方が良い
     */
    export function concatAll(): void {
      Rx.Observable.of('A', 'B', 'C', 'D', 'E').map(v => `Outer(${v})`)
        .map(v => Rx.Observable.timer(0, 1000).take(3).map(vv => `Inner(${vv}): ${v}`))
        .concatAll()
        .subscribe(...callbacks);
    }

    /**
     * 外側の Observable が発行されたら内側の Observable が発行し始める
     * 内側の Observable の発行完了前に次の外側の Observable が発行したら無視される
     */
    export function exhaust(): void {
      // concatAll と同じ動き？
      Rx.Observable.timer(0, 5000).take(3).map(v => `Outer(${v})`)
        .map(v => Rx.Observable.of(`Inner: ${v}`))
        .exhaust()
        .subscribe(...callbacks);
      // concatAll と同じ動き？
      Rx.Observable.timer(0, 5000).take(3).map(v => `Outer(${v})`)
        .map(v => Rx.Observable.timer(0, 1000).take(4).map(vv => `Inner(${vv}): ${v}`))
        .exhaust()
        .subscribe(...callbacks);

      Rx.Observable.timer(0, 5000).take(3).map(v => `Outer(${v})`)
        .map(v => Rx.Observable.timer(0, 1000).take(7).map(vv => `Inner(${vv}): ${v}`))
        .exhaust()
        .subscribe(...callbacks);
    }

    /**
     * 複数の Observable を並列実行し、それぞれ値を発行する
     * - instance method 版
     */
    export function merge(): void {
      Rx.Observable.timer(0, 1000).take(5).map(v => `A${v}`)
        .merge(Rx.Observable.timer(0, 500).take(5).map(v => `B${v}`))
        .merge(Rx.Observable.timer(0, 2000).take(5).map(v => `C${v}`))
        .subscribe(...callbacks);
    }

    /**
     * 外側の Observable が発行されたら内側の Observable が発行し始める
     * 内側の Observable の発行完了前に次の外側の Observable が発行したらそれぞれの値を発行する
     * - `merge()` を先に知っておいた方が良い
     */
    export function mergeAll(): void {
      Rx.Observable.timer(0, 5000).take(3).map(v => `Outer(${v})`)
        .map(v => Rx.Observable.timer(0, 1000).take(7).map(vv => `Inner(${vv}): ${v}`))
        .mergeAll()
        .subscribe(...callbacks);
    }

    /**
     * 一番発行の速い Observable が採用される
     */
    export function race(): void {
      Rx.Observable.interval(1000).take(2).map(v => `A${v}`)
        .race(Rx.Observable.interval(500).take(5).map(v => `B${v}`))
        .race(Rx.Observable.interval(2000).take(1).map(v => `C${v}`))
        .subscribe(...callbacks);
    }

    /**
     * Observable の先頭に値を追加する
     */
    export function startWith(): void {
      Rx.Observable.range(1, 5)
        .startWith('A' as any)
        .subscribe(...callbacks);
    }

    /**
     * 外側の Observable が発行する度に内側の Observable に切り替わる
     */
    export function switch_(): void {
      Rx.Observable.timer(0, 5000).take(3).map(v => `Outer(${v})`)
        .map(v => Rx.Observable.timer(0, 1000).map(vv => `Inner(${vv}): ${v}`))
        .switch()
        .subscribe(...callbacks);
    }

    /**
     * Observable が発行するときに、別の Observable の最新の値と合成して発行する
     */
    export function withLatestFrom(): void {
      Rx.Observable.timer(0, 5000).take(3).map(v => `A${v}`)
        .withLatestFrom(Rx.Observable.timer(0, 1000).map(v => `B${v}`))
        .subscribe(...callbacks);
    }

    /**
     * 複数の Observable を合成して値を発行する
     * - instance method 版
     */
    export function zip(): void {
      const age = Rx.Observable.of(10, 20, 30);
      const name = Rx.Observable.of('Hoge', 'Foo', 'Bar');
      const developer = Rx.Observable.of(true, true, false);
      age.zip(name, developer)
        .subscribe(...callbacks);

      age.zip(name)
        .zip(developer)
        .subscribe(...callbacks);
    }

    /**
     * 外側の Observable を内側の Observable に合成して発行する
     * - `zip()` を先に知っておいた方が良い
     */
    export function zipAll(): void {
      Rx.Observable.timer(0, 5000).take(3).map(v => `Outer(${v})`)
        .map(v => Rx.Observable.timer(0, 1000).take(7).map(vv => `Inner(${vv}): ${v}`))
        .zipAll()
        .subscribe(...callbacks);
    }
  }
}
//CombinationOperators.C.combineLatest();
//CombinationOperators.C.concat();
//CombinationOperators.C.forkJoin();
//CombinationOperators.C.merge();
//CombinationOperators.C.zip();
//CombinationOperators.I.combineAll();
//CombinationOperators.I.combineLatest();
//CombinationOperators.I.concat();
//CombinationOperators.I.concatAll();
//CombinationOperators.I.exhaust();
//CombinationOperators.I.merge();
//CombinationOperators.I.mergeAll();
//CombinationOperators.I.race();
//CombinationOperators.I.startWith();
//CombinationOperators.I.switch_();
//CombinationOperators.I.withLatestFrom();
//CombinationOperators.I.zip();
//CombinationOperators.I.zipAll();
