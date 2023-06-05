import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Quiz} from '../../../models/quiz';

@Component({
  selector: 'ac-quiz-preview',
  templateUrl: './quiz-preview.component.html',
  styleUrls: ['./quiz-preview.component.scss']
})
export class QuizPreviewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {quiz: Quiz}) { }

  ngOnInit() {
  }

}
