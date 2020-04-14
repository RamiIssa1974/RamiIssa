import { Component, OnInit } from '@angular/core';
import { IQuestion } from './Entities/Question';
import { Store, select } from '@ngrx/store';
import * as examActions from './Exams/state/exam.actions';
import * as fromExam from './Exams/state/exam.reducer';
import { Observable } from 'rxjs';
import { IExam } from './Entities/Exam';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'ZoomExam';
  exam$: Observable<IExam>;
  examStatus: string;
  currentQuestion$: Observable<IQuestion>;
  examId = '1';
  errorMessage = '';
  currentQuestionId = 0;
  errorMessage$: Observable<string>;

  constructor(private store: Store<fromExam.ExamState>) { }

  ngOnInit(): void {
    this.store.dispatch(new examActions.LoadExam());
    this.errorMessage$ = this.store.pipe(select(fromExam.getError));
    this.exam$ = this.store.pipe(select(fromExam.getExam));
    this.currentQuestion$ = this.store.pipe(select(fromExam.getCurrenQuestion));
    this.errorMessage$ = this.store.pipe(select(fromExam.getError));
    this.store.pipe(select(fromExam.getExamStatus)).subscribe(
      status => {
        this.examStatus = status;
      }
    );
  }
}

