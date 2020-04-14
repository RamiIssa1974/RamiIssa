import { Component, OnInit, Input } from '@angular/core';
import { IExam } from 'src/app/Entities/Exam';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as examActions from '../state/exam.actions';
import * as fromExam from '../state/exam.reducer';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit {

  ButtonText: string;
  @Input() exam: IExam;
  examStatus = 'OK';
  currentQuestionId = 0;
  constructor(private store: Store<fromExam.ExamState>) { }

  ngOnInit(): void {
    this.store.pipe(select(fromExam.getExamStatus)).subscribe(
      status => this.examStatus = status
    );
    this.store.pipe(select(fromExam.getCurrenQuestion)).subscribe(
      question => this.currentQuestionId = question.id
    );
  }
  getButtonText(): string {
    switch (this.examStatus) {
      case 'ready':
        return 'OK';
      case 'selected':
        return 'OK';
      case 'answered':
        return 'Continue';
      default:
        return '';
    }
  }

  onAnswerSelected() {
    if (this.examStatus !== 'ready') {
      if (this.examStatus === 'answered') {
        this.store.dispatch(new examActions.GetNextQuestion());
      } else {
        this.store.dispatch(new examActions.AnswerQuestion());
      }
    }
  }
}
