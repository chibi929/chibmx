import './extension/array.extenstion';

// 本当はちゃんと実装する
type Quiz = string;

export class PickupQuiz {
  private readonly pickupQuizzes: Quiz[];

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

  debug(): void {
    console.log(`quizzes: ${this.quizzes}`);
    console.log(`pickupQuizzes: ${this.pickupQuizzes}`);
  }
}
