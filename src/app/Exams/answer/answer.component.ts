import { Component, OnInit, Input } from '@angular/core';
import { IAnswer } from 'src/app/Entities/Answer';
import { ExamsService } from 'src/app/api/Exams/exams.service';
import { Store, select } from '@ngrx/store';
import * as examActions from '../state/exam.actions';
import * as fromExam from '../state/exam.reducer';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  @Input() answer: IAnswer;
  examStatus = 'OK';
  isSelected = false;

  constructor(private store: Store<fromExam.ExamState>) { }

  ngOnInit(): void {
    this.store.pipe(select(fromExam.getExamStatus)).subscribe(
      status => this.examStatus = status
    );
  }

  onClick() {
    if (this.examStatus === 'ready' || this.examStatus === 'selected') {
      this.store.dispatch(new examActions.SelectAnswer(this.answer.id));
    }
  }
}
