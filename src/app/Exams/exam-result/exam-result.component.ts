import { Component, OnInit, Input } from '@angular/core';
import { IExam } from 'src/app/Entities/Exam';
import { IQuestion } from 'src/app/Entities/Question';
import { ExamsService } from 'src/app/api/Exams/exams.service';

@Component({
  selector: 'app-exam-result',
  templateUrl: './exam-result.component.html',
  styleUrls: ['./exam-result.component.scss']
})
export class ExamResultComponent implements OnInit {

  @Input() exam: IExam;
  private rightAnswers: IQuestion[];
  private wrongAnswers: IQuestion[];

  public get RightAnswers(): IQuestion[] {
    if (!this.rightAnswers) {
      this.rightAnswers = this.exam.questions.filter(question => question.answers.find(answer => answer.isRight && answer.isChoosed));
    }
    return this.rightAnswers;
  }

  public get WrongAnswers(): IQuestion[] {
    if (!this.wrongAnswers) {
      this.wrongAnswers = this.exam.questions.filter(question => question.answers.find(answer => answer.isRight && !answer.isChoosed));
    }
    return this.wrongAnswers;
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  getFinalGrade(): number {
    return this.exam.questions.length ? this.RightAnswers.length / this.exam.questions.length * 100 : 0;
  }
}
