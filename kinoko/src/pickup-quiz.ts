import './extension/array.extension';

// 本当はちゃんと実装する
type Quiz = string;

export class PickupQuiz {
  private readonly pickupQuizzes: Quiz[];
  private currentIndex: number = 0;

  constructor(
    private readonly quizzes: Quiz[],
    private readonly count: number
  ) {
    this.pickupQuizzes = [].concat(quizzes);
    this.pickupQuizzes.shuffle();

    if (this.pickupQuizzes.length > count) {
      this.pickupQuizzes.length = count;
    }
  }

  hasNext(): boolean {
    return this.currentIndex + 1 < this.pickupQuizzes.length;
  }

  getCurrentQuiz(): Quiz {
    return this.pickupQuizzes[this.currentIndex];
  }

  nextQuiz(): Quiz {
    this.currentIndex++;
    return this.pickupQuizzes[this.currentIndex];
  }
}
