// 本当はちゃんと実装する
type Quiz = string;

/**
 * 無限ループ用クイズクラス
 * 現行のシステムの一部をクラスに分離したもの
 */
export class MugenQuiz {
  /**
   * コンストラクタ
   *
   * @param quizzes クイズオブジェクト配列
   * @param currentIndex 現在のインデックス(途中から開始可能)
   */
  constructor(
    private readonly quizzes: Quiz[],
    private currentIndex: number
  ) {
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
