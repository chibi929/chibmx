import { IQuizAdapter, Quiz } from './quiz-adapter';

/**
 * MugenQuiz のオプション
 */
export interface IOptions {
  /**
   * 開始位置のインデックス
   */
  startIndex: number;
}

/**
 * 無限ループ用クイズクラス
 * 現行のシステムの一部をクラスに分離したもの
 */
export class MugenQuiz implements IQuizAdapter {
  private currentIndex: number = 0;

  /**
   * コンストラクタ
   *
   * @param quizzes クイズオブジェクト配列
   * @param options オプション
   */
  constructor(
    private readonly quizzes: Quiz[],
    options: IOptions
  ) {
    this.currentIndex = options.startIndex || this.currentIndex;
  }

  /**
   * 次のクイズがあるかどうか
   *
   * @returns 必ず true を返す
   */
  hasNext(): boolean {
    return true;
  }

  /**
   * 現在のクイズオブジェクトを返す
   * - 無限ループするので剰余算で index を決定する
   *
   * @returns クイズオブジェクト
   */
  getCurrentQuiz(): Quiz {
    const index = this.currentIndex % this.quizzes.length;
    return this.quizzes[index];
  }

  /**
   * 次のクイズに進める
   * - 無限ループするので剰余算で index を決定する
   *
   * @returns 次のクイズオブジェクト
   */
  nextQuiz(): Quiz {
    this.currentIndex++;
    const index = this.currentIndex % this.quizzes.length;
    return this.quizzes[index];
  }
}
