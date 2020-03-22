import { Component, OnInit, Input } from '@angular/core';
import { IExam } from 'src/app/Entities/Exam';
import { IQuestion } from 'src/app/Entities/Question';

@Component({
  selector: 'app-exam-result',
  templateUrl: './exam-result.component.html',
  styleUrls: ['./exam-result.component.scss']
})
export class ExamResultComponent implements OnInit {

  @Input() exam: IExam;
  private _rightAnswers: IQuestion[];
  private _wrongAnswers: IQuestion[];

  public get RightAnswers(): IQuestion[] {
    if (!this._rightAnswers) {
      this._rightAnswers = this.exam.questions.filter(x => x.isAnsweredRight);
    }
    return this._rightAnswers;
  }

  public get WrongAnswers(): IQuestion[] {
    if (!this._wrongAnswers) {
      this._wrongAnswers = this.exam.questions.filter(x => !x.isAnsweredRight);
    }
    return this._wrongAnswers;
  }

  constructor() { }

  ngOnInit(): void {
  }

  getFinalGrade(): number {    
    return this.RightAnswers.length / this.exam.questions.length * 100;
  }
}
