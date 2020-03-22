import { IQuestion } from './Question';

export interface IExam {
    name: string;
    id: string;
    questions: IQuestion[];
    status: string;
    currentQuestionIndex: number;
    currentQuestion: IQuestion;
}