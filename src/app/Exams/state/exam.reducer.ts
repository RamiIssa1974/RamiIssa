import { IQuestion } from 'src/app/Entities/Question';
import { IExam } from 'src/app/Entities/Exam';
import { ExamActions, ExamActionTypes } from './exam.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AnswerComponent } from '../answer/answer.component';
import { stat } from 'fs';


export class ExamState {
    exam: IExam = new IExam('', '-1', [], -1, new IQuestion(-1, '', [], false));
    currentQuestion: IQuestion;
    examStatus: string;
    currentQuestionId: number;
    selectedAnswerId: number;
    answeredAnswerId: number;
    error: string;
}

const initialState: ExamState = {
    exam: null,
    currentQuestion: null,
    examStatus: 'ready',
    currentQuestionId: 0,
    selectedAnswerId: -1,
    answeredAnswerId: -1,
    error: ''
};

const getExamFeatureState = createFeatureSelector<ExamState>('exam');

export const getCurrenQuestion = createSelector(
    getExamFeatureState,
    state => state.currentQuestion
);

export const getExam = createSelector(
    getExamFeatureState,
    state => (state ? state.exam : null)
);

export const getCurrenAnswer = createSelector(
    getExamFeatureState,
    state => state.selectedAnswerId
);

export const getError = createSelector(
    getExamFeatureState,
    state => state.error
);

export const getExamStatus = createSelector(
    getExamFeatureState,
    state => state ? state.examStatus : 'loading'
);

export function reducer(state: ExamState = initialState, action: ExamActions): ExamState {
    state = state ? state : initialState;
    switch (action.type) {
        case ExamActionTypes.LoadExamSuccess:
            return {
                ...state,
                exam: { ...action.payload },
                currentQuestion: action.payload.questions[0],
                error: ''
            };
        case ExamActionTypes.LoadExamFail:
            return {
                ...state,
                error: action.payload
            };

        case ExamActionTypes.GetNextQuestion:
            const isFinished = state.exam.questions.length === state.currentQuestionId + 1;
            return {
                ...state,
                currentQuestionId: !isFinished ? state.currentQuestionId + 1 : state.currentQuestionId,
                currentQuestion: !isFinished ? state.exam.questions[state.currentQuestionId + 1] : state.currentQuestion,
                examStatus: isFinished ? 'finished' : 'ready'
            };

        case ExamActionTypes.SelectAnswer:
            const copyOfAnswers = state.currentQuestion.answers.map(ans => ({
                ...ans,
                isChoosed: (ans.id === action.payload),
                isSelected: (ans.id === action.payload),
            }));
            const copyOfQuestions = state.exam.questions.map(question => {
                if (question.id === state.currentQuestionId) {
                    return {
                        ...question,
                        answers: copyOfAnswers
                    };
                } else {
                    return question;
                }
            });
            return {
                ...state,
                exam: {
                    ...state.exam,
                    questions: copyOfQuestions
                },
                currentQuestion: { ...state.currentQuestion, answers: copyOfAnswers },
                selectedAnswerId: action.payload,
                examStatus: 'selected'
            };

        case ExamActionTypes.AnswerQuestion:
            return {
                ...state,
                examStatus: 'answered'
            };
    }
    return null;
}

export interface State {
    exam: ExamState;
}
