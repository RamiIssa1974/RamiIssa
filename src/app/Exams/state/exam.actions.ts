import { Action } from '@ngrx/store';
import { IExam } from 'src/app/Entities/Exam';
import { IQuestion } from 'src/app/Entities/Question';

export enum ExamActionTypes {
    LoadExam = '[Exam] Load Exam',
    LoadExamSuccess = '[Exam] Load exam Success',
    LoadExamFail = '[Exam] Load exam Fail',
    GetNextQuestion = '[exam] Get Next Question',
    SelectAnswer = '[exam] Select Answer',
    AnswerQuestion = '[exam] Answer Question',
    SetExamStatus = '[exam] Answer Question'
}

export class LoadExam implements Action {
    readonly type = ExamActionTypes.LoadExam;
}

export class LoadExamSuccess implements Action {
    readonly type = ExamActionTypes.LoadExamSuccess;
    constructor(public payload: IExam) {
    }
}

export class LoadExamFail implements Action {
    readonly type = ExamActionTypes.LoadExamFail;
    constructor(public payload: string) {
    }
}

export class GetNextQuestion implements Action {
    readonly type = ExamActionTypes.GetNextQuestion;
}

export class SelectAnswer implements Action {
    readonly type = ExamActionTypes.SelectAnswer;
    constructor(public payload: number) {
    }
}

export class AnswerQuestion implements Action {
    readonly type = ExamActionTypes.AnswerQuestion;
    constructor() {
    }
}

export type ExamActions = LoadExamSuccess
    | LoadExamFail
    | LoadExam
    | GetNextQuestion
    | SelectAnswer
    | AnswerQuestion;

