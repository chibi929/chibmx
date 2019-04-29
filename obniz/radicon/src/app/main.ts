import { Controller, MockController } from './controller';

document.querySelector('.field.obniz-id .button').addEventListener('click', () => {
  const obnizIdElement = document.querySelector('.field.obniz-id .input') as HTMLInputElement;
  const ctrl = new MockController(obnizIdElement.value, () => {
    window.addEventListener('mouseup', () => ctrl.stop());
    window.addEventListener('touchstart', () => ctrl.stop());

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
  });
});
