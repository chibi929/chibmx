// 本当はちゃんと実装する
type Quiz = string;

export class MugenQuiz {
  constructor(
    private readonly quizzes: Quiz[],
    private currentIndex: number
  ) {
  }

  hasNext(): boolean {
    return true;
  }

  getCurrentQuiz(): Quiz {
    const index = this.currentIndex % this.quizzes.length;
    return this.quizzes[index];
  }

  nextQuiz(): Quiz {
    this.currentIndex++;
    const index = this.currentIndex % this.quizzes.length;
    return this.quizzes[index];
  }
}
