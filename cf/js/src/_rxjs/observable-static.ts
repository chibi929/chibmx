import * as Rx from 'rxjs';
import { callbacks } from './subscribe-callback-impl';

class ObservableStatic {
  /**
   * Callback のある関数を Observable を返す関数に変換する
   */
  bindCallback(): void {
    const m1 = (cb) => {
      setTimeout(() => {
        cb(`Callback`);
      }, 1000);
    }

    const m2 = (a, cb) => {
      setTimeout(() => {
        cb(`Callback: ${a}`);
      }, 1000);
    }

    const m3 = (a, b, cb) => {
      setTimeout(() => {
        cb(`Callback: ${a} ${b}!`);
      }, 1000);
    }

    const o1 = Rx.Observable.bindCallback(m1);
    o1().subscribe(...callbacks);

    const o2 = Rx.Observable.bindCallback(m2);
    o2("Hello").subscribe(...callbacks);

    const o3 = Rx.Observable.bindCallback(m3);
    o3("Hello", "World").subscribe(...callbacks);
  }

  /**
   * `(err, data) => void` のような良くある Callback も変換できる
   */
  bindNodeCallback(): void {
    const m1 = (cb) => {
      setTimeout(() => {
        cb(null, "Hello");
      }, 1000);
    }

    const m2 = (cb) => {
      setTimeout(() => {
        cb("Error");
      }, 1000);
    }

    const m3 = (a, cb) => {
      setTimeout(() => {
        cb(null, a);
      }, 1000);
    }

    const o1 = Rx.Observable.bindNodeCallback(m1);
    o1().subscribe(...callbacks);

    const o2 = Rx.Observable.bindNodeCallback(m2);
    o2().subscribe(...callbacks);

    const o3 = Rx.Observable.bindNodeCallback(m3);
    o3("Hello").subscribe(...callbacks);
  }

  /**
   * 複数の Observable を組み合わせる
   * o1: 0123456789
   * o2: 0 1 2 3 4
   * 0秒後: 0,0
   * 1秒後: 1,0
   * 2秒後: 2,0 と 2,1
   * 3秒後: 3,1
   * 4秒後: 4,1 と 4,2
   * 5秒後: 5,2
   */
  combineLatest(): void {
    const o1 = Rx.Observable.timer(0, 1000);
    const o2 = Rx.Observable.timer(0, 2000);
    Rx.Observable.combineLatest(o1, o2).subscribe(...callbacks);
  }

  /**
   * 複数の Observable を順次実行する Observable を作成する
   */
  concat(): void {
    const o1 = Rx.Observable.interval(100).take(5);
    const o2 = Rx.Observable.interval(500).take(5);
    const o3 = Rx.Observable.interval(1000).take(5);
    Rx.Observable.concat(o1, o2, o3).subscribe(...callbacks);
  }

  /**
   * 新しい Observable を作成する
   */
  create(): void {
    const o1: Rx.Observable<any> = Rx.Observable.create(observer => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.complete();
    });
    o1.subscribe(...callbacks);

    const o2: Rx.Observable<any> = Rx.Observable.create(observer => {
      observer.error("Error");
    });
    o2.subscribe(...callbacks);
  }

  /**
   * Observable を作成する Observable を作成する
   * オブザーバーが subscribe を呼んだ時に初めて Observable が作成される
   */
  defer(): void {
    const o1 = Rx.Observable.defer(() => {
      return Rx.Observable.interval(1000);
    })
    o1.subscribe(...callbacks);
  }

  /**
   * complete を発行するだけの Observable を作成する
   */
  empty(): void {
    const o1 = Rx.Observable.empty();
    o1.subscribe(...callbacks);
  }

  /**
   * 複数の Observable を並列に実行し、完了するのを待って最後の結果を結合する Observable を作成する
   */
  forkJoin(): void {
    const o1 = Rx.Observable.of(1, 2, 3, 4);
    const o2 = Rx.Observable.of(5, 6, 7, 8);
    Rx.Observable.forkJoin(o1, o2).subscribe(...callbacks);

    const o3 = Rx.Observable.interval(1000).take(3)
    const o4 = Rx.Observable.interval(500).take(4);
    Rx.Observable.forkJoin(o3, o4).subscribe(...callbacks);
  }

  /**
   * 配列から Observable を作成する
   */
  from(): void {
    const o1 = Rx.Observable.from([10, 20, 30]);
    o1.subscribe(...callbacks);
  }

  /**
   * DOM Events や EventEmitter の Observable を作成する
   */
  fromEvent(): void {
    const o1 = Rx.Observable.fromEvent(document, 'click');
    o1.subscribe(...callbacks);
  }

  /**
   * addHandler / removeHandler を Observable に変換する
   */
  fromEventPattern(): void {
    const o1 = Rx.Observable.fromEventPattern(
      (handler: any) => {
        document.addEventListener('click', handler);
      },
      (handler: any) => {
        document.removeEventListener('click', handler);
      }
    );
    o1.subscribe(...callbacks);
  }

  /**
   * Promise を Observable に変換する
   */
  fromPromise(): void {
    const func1 = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    };
    Rx.Observable.fromPromise(func1()).subscribe(...callbacks);

    const func2 = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("FUNC2");
        }, 1000);
      });
    };
    Rx.Observable.fromPromise(func2()).subscribe(...callbacks);

    const func3 = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject("FUNC3");
        }, 1000);
      });
    };
    Rx.Observable.fromPromise(func3()).subscribe(...callbacks);
  }

  /**
   * 定期的に発行する Observable を作成する
   */
  interval(): void {
    Rx.Observable.interval(1000).subscribe(...callbacks);
  }

  /**
   * 複数の Observable を並列に実行し、都度発行を行う Observable を作成する
   */
  merge(): void {
    const o1 = Rx.Observable.interval(100).take(5);
    const o2 = Rx.Observable.interval(500).take(5);
    const o3 = Rx.Observable.interval(1000).take(5);
    Rx.Observable.merge(o1, o2, o3).subscribe(...callbacks);
  }

  /**
   * 何もしない Observable を作成する
   */
  never(): void {
    Rx.Observable.never().subscribe(...callbacks);
  }

  /**
   * 指定した値を発行する Observable を作成する
   */
  of(): void {
    const o1 = Rx.Observable.of(10, 20, 30);
    o1.subscribe(...callbacks);

    const o2 = Rx.Observable.of('a', 'b', 'c');
    o2.subscribe(...callbacks);
  }

  /**
   * 指定した範囲の数値を発行する Observable を作成する
   */
  range(): void {
    const o1 = Rx.Observable.range(1, 10);
    o1.subscribe(...callbacks);

    const o2 = Rx.Observable.range(5, 10);
    o2.subscribe(...callbacks);
  }

  /**
   * エラーを発行する Observable を作成する
   */
  throw(): void {
    Rx.Observable.throw("error").subscribe(...callbacks);
  }

  /**
   * 開始時刻を指定して定期的に発行する Observable を作成する
   */
  timer(): void {
    Rx.Observable.timer(3000, 1000).subscribe(...callbacks);
  }

  /**
   * WebSocket を WebSocketSubject というものにラップする
   */
  webSocket(): void {
    const ws = Rx.Observable.webSocket('ws://localhost:8081');
    ws.subscribe(
      (msg) => console.log('message received: ' + msg),
      (err) => console.log(err),
      () => console.log('complete')
    );
    ws.next(JSON.stringify({ op: 'hello' }));
  }

  /**
   * 複数の Observable を組み合わせて新しい Observable を作成する
   */
  zip(): void {
    const age = Rx.Observable.of(10, 20, 30);
    const name = Rx.Observable.of("Hoge", "Foo", "Bar");
    const developer = Rx.Observable.of(true, true, false);
    Rx.Observable.zip(age, name, developer).subscribe(...callbacks);
  }
}

const test = new ObservableStatic();
//test.bindCallback();
//test.bindNodeCallback();
//test.combineLatest();
//test.concat();
//test.create();
//test.defer();
//test.empty();
//test.forkJoin();
//test.from();
//test.fromEvent();
//test.fromEventPattern();
//test.fromPromise();
//test.interval();
//test.merge();
//test.never();
//test.of();
//test.throw();
//test.timer();
//test.webSocket();
//test.zip();
