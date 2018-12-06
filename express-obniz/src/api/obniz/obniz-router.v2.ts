import * as express from 'express';
import { of, Subscription, Observable } from 'rxjs';
import { delay, repeat, retry } from 'rxjs/operators';
import { ObnizHolder } from './holder/obniz-holder';

export class ObnizRouterV2 {
  static getRouter() {
    const router = express.Router();
    let xmas: { [id: number]: { subscription: Subscription; iot: any } } = {} as any;

    /**
     * PIKA!
     */
    const pika = id => {
      let on = true;
      xmas[id].iot.move(true);
      return of({})
        .pipe(
          delay(100),
          repeat()
        )
        .subscribe(() => {
          if (!xmas[id] || !xmas[id].iot) {
            return console.log(`WARNING: xmas[${id}] = ${xmas[id]}, xmas[${id}].iot = ${xmas[id].iot}`);
          }
          on = !on;
          on ? xmas[id].iot.move(true) : xmas[id].iot.stop();
        });
    };

    router.get('/', (req, res) => {
      res.send({ message: `Hello /v2/obniz` });
    });

    router.get('/connect', (req, res) => {
      ObnizHolder.connect(process.env.OBNIZ_ID);
      res.send({ message: `Calling the GET '/obniz/connect'` });
    });

    router.get('/disconnect', (req, res) => {
      ObnizHolder.disconnect();
      Object.keys(xmas).forEach(key => {
        if (!!xmas[key].subscription) {
          xmas[key].subscription.unsubscribe();
        }
      });
      xmas = {};
      res.send({ message: `Calling the GET '/obniz/disconnect'` });
    });

    router.get('/xmas/:id/on', (req, res) => {
      if (!ObnizHolder.connected) {
        res.status(400).send({ message: `Bad Request: Obniz is not connected.` });
        return;
      }

      const id = req.params['id'];
      if (isNaN(id) || id < 0 || 5 < id) {
        res.status(400).send({ message: `Failed to id: ${id}` });
        return;
      }

      if (!xmas[id]) {
        const pin1 = id * 2;
        const pin2 = pin1 + 1;
        xmas[id] = {} as any;
        xmas[id].iot = ObnizHolder.obniz.wired('DCMotor', { forward: pin1, back: pin2 });
        xmas[id].iot.power(10);
      } else if (!!xmas[id].subscription) {
        res.status(400).send({ message: `Already PIKA PIKA. id: ${id}` });
        return;
      }

      xmas[id].subscription = pika(id);
      res.send({ message: `Calling the GET '/obniz/v2/xmas/:id/on'` });
    });

    router.get('/xmas/:id/off', (req, res) => {
      if (!ObnizHolder.connected) {
        res.status(400).send({ message: `Bad Request: Obniz is not connected.` });
        return;
      }

      const id = req.params['id'];
      if (isNaN(id) || id < 0 || 5 < id) {
        res.status(400).send({ message: `Failed to :id: ${id}` });
        return;
      }

      if (!xmas[id]) {
        res.status(400).send({ message: `Not PIKA PIKA. id: ${id}` });
        return;
      } else if (!xmas[id].subscription) {
        res.status(400).send({ message: `Already Stop PIKA PIKA. id: ${id}` });
        return;
      }

      xmas[id].subscription.unsubscribe();
      delete xmas[id].subscription;
      xmas[id].iot.stop();
      res.send({ message: `Calling the GET '/obniz/xmas/:id/off'` });
    });

    /**
     * 特化型 ON!
     */
    router.get('/xmas/specialized/on', (req, res) => {
      if (!ObnizHolder.obniz && !ObnizHolder.connected) {
        ObnizHolder.connect(process.env.OBNIZ_ID);
      } else {
        res.status(400).send({ message: `Bad Request: Call the 'GET /obniz/v2/xmas/specialized/off' first` });
        return;
      }

      const connectTimeoutHandler = () => {
        res.status(504).send({ message: `Timeout: Failed to try connect to Obniz!` });
      };
      const connectCompleteHandler = () => {
        const wires = [{ forward: 0, back: 1 }, { forward: 2, back: 3 }, { forward: 4, back: 5 }];
        wires.forEach((w, i) => {
          xmas[i] = {} as any;
          xmas[i].iot = ObnizHolder.obniz.wired('DCMotor', w);
          xmas[i].iot.power(10);
        });

        wires.forEach((_, i) => {
          xmas[i].subscription = pika(i);
        });
        res.send({ message: `Calling the GET '/obniz/v2/xmas/specialized/on'` });
      };

      new Observable(observer => {
        if (!ObnizHolder.connected) {
          observer.error();
          return;
        }
        observer.next();
        observer.complete();
      })
        .pipe(
          delay(1000),
          retry(60)
        )
        .subscribe(null, connectTimeoutHandler, connectCompleteHandler);
    });

    /**
     * 特化型 OFF!
     * ※といいつつただの 'GET /obniz/v2/disconnect'.
     */
    router.get('/xmas/specialized/off', (req, res) => {
      ObnizHolder.disconnect();
      Object.keys(xmas).forEach(key => {
        if (!!xmas[key].subscription) {
          xmas[key].subscription.unsubscribe();
        }
      });
      xmas = {};
      res.send({ message: `Calling the GET '/obniz/v2/xmas/specialized/off'` });
    });

    return router;
  }
}
