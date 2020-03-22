import { Component, OnInit, Input } from '@angular/core';
import { IQuestion } from 'src/app/Entities/Question';
import { IExam } from 'src/app/Entities/Exam';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() exam: IExam;
  @Input() question: IQuestion;
  constructor() { }

  ngOnInit(): void {
  }

}
