import { Const } from './const';
import { IController, Controller, MockController } from './controller';

const buttons = document.querySelectorAll('.obniz-controller .button');
buttons.forEach(v => v.setAttribute('disabled', 'disabled'));

const obnizIdElm = document.querySelector('.field.obniz-id .input') as HTMLInputElement;
obnizIdElm.value = window.sessionStorage.getItem(Const.STORAGE_KEY_OBNIZ_ID) || '';

const sensorElm = document.querySelector('.is-checkradio.sensor') as HTMLInputElement;

document.querySelector('.field.obniz-id .button').addEventListener('click', () => {
  const ctrl = new Controller(obnizIdElm.value, () => {
    window.sessionStorage.setItem(Const.STORAGE_KEY_OBNIZ_ID, obnizIdElm.value);
    ctrl.useSensor(sensorElm.checked);

    document.querySelector('.button.led').addEventListener('mousedown', () => ctrl.on());
    document.querySelector('.button.led').addEventListener('touchstart', () => ctrl.on());
    document.querySelector('.button.led').addEventListener('mouseup', () => ctrl.off());
    document.querySelector('.button.led').addEventListener('touchend', () => ctrl.off());

    document.querySelector('.button.up').addEventListener('mousedown', () => ctrl.up());
    document.querySelector('.button.up').addEventListener('touchstart', () => ctrl.up());
    document.querySelector('.button.left').addEventListener('mousedown', () => ctrl.left());
    document.querySelector('.button.left').addEventListener('touchstart', () => ctrl.left());
    document.querySelector('.button.right').addEventListener('mousedown', () => ctrl.right());
    document.querySelector('.button.right').addEventListener('touchstart', () => ctrl.right());
    document.querySelector('.button.down').addEventListener('mousedown', () => ctrl.down());
    document.querySelector('.button.down').addEventListener('touchstart', () => ctrl.down());

    document.querySelector('.button.up').addEventListener('mouseup', () => ctrl.stop());
    document.querySelector('.button.up').addEventListener('touchend', () => ctrl.stop());
    document.querySelector('.button.left').addEventListener('mouseup', () => ctrl.stop());
    document.querySelector('.button.left').addEventListener('touchend', () => ctrl.stop());
    document.querySelector('.button.right').addEventListener('mouseup', () => ctrl.stop());
    document.querySelector('.button.right').addEventListener('touchend', () => ctrl.stop());
    document.querySelector('.button.down').addEventListener('mouseup', () => ctrl.stop());
    document.querySelector('.button.down').addEventListener('touchend', () => ctrl.stop());

    document.querySelector('.is-checkradio.sensor').addEventListener('click', () => ctrl.useSensor(sensorElm.checked));
    window.addEventListener('devicemotion', evt => {
      ctrl.deviceMotion(evt.accelerationIncludingGravity.x, evt.accelerationIncludingGravity.y);
    });
    buttons.forEach(v => v.removeAttribute('disabled'));
  });
});
