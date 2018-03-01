export {};

declare global {
  interface Array<T> {
    shuffle(): void;
  }
}

Array.prototype.shuffle = function() {
  if (this == null) {
    throw new TypeError('Array.prototype.shuffle called on null or undefined');
  }

  // Fisher-Yates アルゴリズムによるシャッフル
  for (var i = this.length -1; i > 0; i--) {
    var r = Math.floor(Math.random() * (i + 1));
    var tmp = this[i];
    this[i] = this[r];
    this[r] = tmp;
  }
};
