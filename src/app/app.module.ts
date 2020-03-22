import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http'
import { from } from 'rxjs';
import { QuestionComponent } from './Exams/question/question.component';
import { AnswerComponent } from './Exams/answer/answer.component';
import { NavigatorComponent } from './Exams/navigator/navigator.component';
import { ExamResultComponent } from './Exams/exam-result/exam-result.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    AnswerComponent,
    NavigatorComponent,
    ExamResultComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
