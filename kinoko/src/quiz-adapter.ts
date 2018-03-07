// 本当はちゃんと実装する
export type Quiz = string;

/**
 * クイズアダプター用インターフェース
 */
export interface IQuizAdapter {
  /**
   * 次のクイズがあるかどうか
   *
   * @returns true: ある, false: ない
   */
  hasNext(): boolean;

  /**
   * 現在のクイズオブジェクトを返す
   *
   * @returns クイズオブジェクト
   */
  getCurrentQuiz(): Quiz;

  /**
   * 次のクイズに進める
   *
   * @returns 次のクイズオブジェクト
   */
  nextQuiz(): Quiz;
}
