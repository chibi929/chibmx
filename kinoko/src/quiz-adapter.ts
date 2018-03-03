// 本当はちゃんと実装する
export type Quiz = string;

export interface IQuizAdapter {
  hasNext(): boolean;
  getCurrentQuiz(): Quiz;
  nextQuiz(): Quiz;
}
