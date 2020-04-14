import { IQuestion } from './Question';

export class IExam {
    constructor(public name: string,
                public id: string,
                public questions: IQuestion[],
                public currentQuestionIndex: number,
                public currentQuestion: IQuestion) {
                }
}
