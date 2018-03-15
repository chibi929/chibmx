import { QuizType } from './quiz-type';
import { MugenQuiz, IOptions as IMugenOptions } from './mugen-quiz';
import { PickupQuiz, IOptions as IPickupOptions } from './pickup-quiz';
import { IQuizAdapter, Quiz } from './quiz-adapter';

/**
 * クイズの設定
 */
export interface IQuizConfig {
  type: QuizType,
  quizFilePath: string,
  options: IMugenOptions | IPickupOptions
}

/**
 * クイズ管理
 */
export class QuizManager {
  private readonly quizAdapter: IQuizAdapter;

  /**
   * コンストラクタ
   *
   * @param config クイズ設定オブジェクト
   * @param onLoaded クイズ読み込み完了コールバック
   */
  constructor(config: IQuizConfig, onLoaded: (err, data?) => void) {
    if (config.type != QuizType.Mugen && config.type != QuizType.Pickup) {
      throw new Error(`Unsupported QuizType: ${config.type}`);
    }

    const options = config.options;
    this.readJson(config.quizFilePath).then(quizzes => {
      // `this.quizAdapter` は `readonly` でありたいので、いわゆる const 外しをしている
      switch (config.type) {
      case QuizType.Mugen:
        (<any>this).quizAdapter = new MugenQuiz(quizzes, <IMugenOptions>options);
        break;
      case QuizType.Pickup:
        (<any>this).quizAdapter = new PickupQuiz(quizzes, <IPickupOptions>options);
        break;
      default:
        // パラメータチェックにより弾いているので、ここには来ない
      }
      onLoaded(null, quizzes);
    }).catch(() => {
      onLoaded(new Error("Read error"));
    });
  }

  /**
   * 次のクイズがあるかどうか
   *
   * @returns true: ある, false: ない
   */
  hasNext(): boolean {
    return this.quizAdapter.hasNext();
  }

  /**
   * 現在のクイズオブジェクトを返す
   *
   * @returns クイズオブジェクト
   */
  getCurrentQuiz(): Quiz {
    return this.quizAdapter.getCurrentQuiz();
  }

  /**
   * 次のクイズに進める
   *
   * @returns 次のクイズオブジェクト
   */
  nextQuiz(): Quiz {
    return this.quizAdapter.nextQuiz();
  }

  /**
   * 本当はちゃんと実装する
   */
  private readJson(filePath: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      resolve(["aaaaa", "bbbbb", "ccccc", "ddddd", "eeeee"]);
    });
  }
}
