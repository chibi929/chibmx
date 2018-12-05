import * as express from 'express';
import { of, Subscription } from 'rxjs';
import { delay, repeat } from 'rxjs/operators';
import { ObnizHolder } from './holder/obniz-holder';

export class ObnizRouterV2 {
  static getRouter() {
    const router = express.Router();
    let xmas: { [id: number]: { subscription: Subscription; iot: any } } = {} as any;

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

      let on = true;
      xmas[id].subscription = of({})
        .pipe(
          delay(100),
          repeat()
        )
        .subscribe(() => {
          if (!xmas[id] || !xmas[id].iot) {
            return console.log(`WARNING: xmas[${id}] = ${xmas[id]}, xmas[${id}].iot = ${xmas[id].iot}`);
          }
          on = !on;
          on ? xmas[id].iot.move(on) : xmas[id].iot.stop();
        });
      xmas[id].iot.move(on);
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

    return router;
  }
}
