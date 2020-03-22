import { Component, OnInit, Input } from '@angular/core';
import { IExam } from 'src/app/Entities/Exam';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit {

  ButtonText: string;
  @Input() exam: IExam;
  @Input() currentQuestionId: IExam;
  constructor() { }

  ngOnInit(): void {
  }
  getButtonText(status: string): string {
    switch (status) {
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
    if (this.exam.status == 'answered') {
      this.exam.currentQuestionIndex++;
      this.exam.currentQuestion = this.exam.questions[this.exam.currentQuestionIndex];
    }
    this.exam.status = this.exam.status == 'selected' ? 'answered' : (this.exam.currentQuestionIndex < this.exam.questions.length ? 'ready' : 'finished');
  }
}
