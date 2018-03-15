import './extension/array.extension';
import { IQuizAdapter, Quiz } from './quiz-adapter';

/**
 * PickupQuiz のオプション
 */
export interface IOptions {
  /**
   * 出題数
   */
  count: number
}

/**
 * ピックアップ用クイズクラス
 */
export class PickupQuiz implements IQuizAdapter {
  private readonly pickupQuizzes: Quiz[];
  private currentIndex: number = 0;

  /**
   * コンストラクタ
   * - シャッフルを行ってピックアップ分だけ抽出する
   *
   * @param quizzes クイズオブジェクト配列
   * @param options オプション
   */
  constructor(
    private readonly quizzes: Quiz[],
    options: IOptions
  ) {
    this.pickupQuizzes = [].concat(quizzes);
    this.pickupQuizzes.shuffle();

    if (this.pickupQuizzes.length > options.count) {
      this.pickupQuizzes.length = options.count;
    }
  }

  /**
   * 次のクイズがあるかどうか
   *
   * @returns true: ある, false: ない
   */
  hasNext(): boolean {
    return this.currentIndex + 1 < this.pickupQuizzes.length;
  }

  /**
   * 現在のクイズオブジェクトを返す
   *
   * @returns クイズオブジェクト
   */
  getCurrentQuiz(): Quiz {
    return this.pickupQuizzes[this.currentIndex];
  }

  /**
   * 次のクイズに進める
   *
   * @returns 次のクイズオブジェクト
   */
  nextQuiz(): Quiz {
    this.currentIndex++;
    return this.pickupQuizzes[this.currentIndex];
  }
}
