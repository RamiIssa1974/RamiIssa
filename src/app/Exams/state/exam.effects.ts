import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ExamsService } from 'src/app/api/Exams/exams.service';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { IExam } from 'src/app/Entities/Exam';
import * as examActions from './exam.actions';
import { of } from 'rxjs';

@Injectable()
export class ExamEffects {
    constructor(private actions$: Actions,
                private examsService: ExamsService) {
    }
    @Effect()
    loadProcess$ = this.actions$.pipe(
        ofType(examActions.ExamActionTypes.LoadExam),
        mergeMap((action: examActions.LoadExam) =>
            this.examsService.getExam().pipe(
                map((exam: IExam) => (new examActions.LoadExamSuccess(exam))),
                catchError(err => of(new examActions.LoadExamFail(err)))
            ))
    );
}
