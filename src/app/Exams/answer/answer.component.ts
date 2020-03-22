import { Component, OnInit, Input } from '@angular/core';
import { IAnswer } from 'src/app/Entities/Answer';
import { IExam } from 'src/app/Entities/Exam';
import { IQuestion } from 'src/app/Entities/Question';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {

  @Input() answer: IAnswer;
  @Input() question: IQuestion;  
  @Input() exam: IExam;

  isSelected: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  onClick() {   
    this.question.answers.forEach(answer=> {
      answer.isSelected = false;
      answer.isAnsweredRight = false;
    });
    this.answer.isSelected = true;
    this.answer.isAnsweredRight = this.answer.isRight;
    this.question.isAnsweredRight = this.answer.isRight;
    this.exam.status = 'selected';
  }
}
