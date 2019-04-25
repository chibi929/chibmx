import { Const } from './const';
import { Controller } from './controller';

const ctrl = new Controller(Const.OBNIZ_ID);
document.querySelector('.button.up').addEventListener('click', ctrl.up);
document.querySelector('.button.left').addEventListener('click', ctrl.left);
document.querySelector('.button.right').addEventListener('click', ctrl.right);
document.querySelector('.button.down').addEventListener('click', ctrl.down);
