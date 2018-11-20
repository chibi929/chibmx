import * as express from 'express';
import { ObnizHolder } from './holder/obniz-holder';

export class ObnizRouter {
  static getRouter() {
    const router = express.Router();
    const xmas: { [id: number]: { intervalId: any; iot: any } } = {} as any;

    router.get('/', (req, res) => {
      res.send(`Hello /obniz`);
    });

    router.get('/connect', (req, res) => {
      ObnizHolder.connect(process.env.OBNIZ_ID);
      res.send(`Calling the GET '/obniz/connect'`);
    });

    router.get('/disconnect', (req, res) => {
      ObnizHolder.disconnect();
      (<any>xmas) = {};
      res.send(`Calling the GET '/obniz/disconnect'`);
    });

    router.get('/xmas/:id/on', (req, res) => {
      const id = req.params['id'];
      if (isNaN(id) || id < 0 || 5 < id) {
        res.status(400).send(`Failed to :id: ${id}`);
        return;
      }
      const pin1 = id * 2;
      const pin2 = pin1 + 1;

      if (!xmas[id]) {
        xmas[id] = {} as any;
        xmas[id].iot = ObnizHolder.obniz.wired('DCMotor', { forward: pin1, back: pin2 });
        xmas[id].iot.power(10);
      }

      let on = true;
      xmas[id].intervalId = setInterval(() => {
        on = !on;
        on ? xmas[id].iot.move(on) : xmas[id].iot.stop();
      }, 100);

      xmas[id].iot.move(on);
      res.send(`Calling the GET '/obniz/xmas/:id'`);
    });

    router.get('/xmas/:id/off', (req, res) => {
      const id = req.params['id'];
      if (isNaN(id) || id < 0 || 5 < id) {
        res.status(400).send(`Failed to :id: ${id}`);
        return;
      }

      clearInterval(xmas[id].intervalId);
      xmas[id].iot.stop();
      res.send(`Calling the GET '/obniz/xmas/:id/off'`);
    });

    router.get('/voltage', async (req, res) => {
      ObnizHolder.obniz.io0.output(true);
      ObnizHolder.obniz.io1.output(false);
      const voltage = await ObnizHolder.obniz.ad0.getWait();
      console.log(voltage);
      ObnizHolder.obniz.wait(1000);
      ObnizHolder.obniz.io0.output(false);
      res.send(`Calling the GET '/obniz/voltage'`);
    });

    router.get('/led/on', (req, res) => {
      const led = ObnizHolder.obniz.wired('LED', { anode: 0, cathode: 1 });
      led.on();
      res.send(`Calling the GET '/obniz/led/on'`);
    });

    router.get('/led/off', (req, res) => {
      const led = ObnizHolder.obniz.wired('LED', { anode: 0, cathode: 1 });
      led.off();
      res.send(`Calling the GET '/obniz/led/off'`);
    });

    router.get('/led/blink', (req, res) => {
      const led = ObnizHolder.obniz.wired('LED', { anode: 0, cathode: 1 });
      led.blink();
      res.send(`Calling the GET '/obniz/led/blink'`);
    });

    router.get('/led/endBlink', (req, res) => {
      const led = ObnizHolder.obniz.wired('LED', { anode: 0, cathode: 1 });
      led.endBlink();
      res.send(`Calling the GET '/obniz/led/endBlink'`);
    });

    return router;
  }
}
