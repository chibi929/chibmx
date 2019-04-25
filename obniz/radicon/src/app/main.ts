import { Const } from './const';
import { Controller } from './controller';

document.querySelector('.field.obniz-id .button').addEventListener('click', () => {
  const obnizIdElement = document.querySelector('.field.obniz-id .input') as HTMLInputElement;
  const ctrl = new Controller(obnizIdElement.value);
  document.querySelector('.button.on').addEventListener('click', ctrl.on);
  document.querySelector('.button.off').addEventListener('click', ctrl.off);
  document.querySelector('.button.up').addEventListener('click', ctrl.up);
  document.querySelector('.button.left').addEventListener('click', ctrl.left);
  document.querySelector('.button.right').addEventListener('click', ctrl.right);
  document.querySelector('.button.down').addEventListener('click', ctrl.down);
});
