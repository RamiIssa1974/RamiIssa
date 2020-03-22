import { Component, OnInit } from '@angular/core';
import { ExamsService } from './api/Exams/exams.service';
import { IExam } from './Entities/Exam';
import { Observable } from 'rxjs';
import { IQuestion } from './Entities/Question';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'ZoomExam';
  exam: IExam;
  examId: string = "1";
  errorMessage: string = '';    
  currentQuestionId: number = 1;
  currentQuestion : IQuestion;
  
  constructor(private examService: ExamsService) {
  }
  ngOnInit(): void {
    this.examService.getExams().subscribe(
      (data => {
          this.exam = data.filter(itm => itm.id == this.examId)[0];
          this.exam.status ='ready';
          this.exam.currentQuestionIndex = 0; 
          this.exam.currentQuestion = this.exam.questions[this.exam.currentQuestionIndex];         
        })
    );
  }
}