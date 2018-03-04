import { QuizType } from './quiz-type';
import { MugenQuiz } from './mugen-quiz';
import { PickupQuiz } from './pickup-quiz';
import { IQuizAdapter, Quiz } from './quiz-adapter';

/**
 * クイズの設定
 */
export interface IQuizConfig {
  type: QuizType,
  quizFilePath: string,
  options: {
    Mugen?: {
      startIndex: number
    },
    Pickup?: {
      numberOfQuestions: number
    }
  }
}

/**
 * クイズ管理
 */
export class QuizManager {
  private readonly quizAdapter: IQuizAdapter;

  constructor(config: IQuizConfig) {
    const typeString = QuizType[config.type];
    const options = config.options[typeString];
    const quizzes = this.readJson(config.quizFilePath);

    switch (config.type) {
    case QuizType.Mugen: this.quizAdapter = new MugenQuiz(quizzes, options.startIndex); break;
    case QuizType.Pickup: this.quizAdapter = new PickupQuiz(quizzes, options.numberOfQuestions); break;
    default:
      throw new Error(`Unsupported QuizType: ${QuizType[config.type]}`);
    }
  }

  hasNext(): boolean {
    return this.quizAdapter.hasNext();
  }

  getCurrentQuiz(): Quiz {
    return this.quizAdapter.getCurrentQuiz();
  }

  nextQuiz(): Quiz {
    return this.quizAdapter.nextQuiz();
  }

  private readJson(filePath: string): any {
    return ["aaaaa", "bbbbb", "ccccc", "ddddd", "eeeee"];
  }
}
