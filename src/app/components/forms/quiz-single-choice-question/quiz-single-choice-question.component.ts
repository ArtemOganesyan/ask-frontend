import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {SingleChoiceQuizQuestion} from '../../../models/quiz.single-choice.question';
import {AcErrorStateMatcher} from '../../../helpers/AcErrorStateMatcher';
import {FormHelperService} from '../../../services/form-helper.service';

@Component({
  selector: 'ac-quiz-single-choice-question',
  templateUrl: './quiz-single-choice-question.component.html',
  styleUrls: ['./quiz-single-choice-question.component.scss']
})
export class QuizSingleChoiceQuestionComponent implements OnInit {

  @Input() questionForm: FormGroup;
  @Input() question: SingleChoiceQuizQuestion;
  @Input() isPreview: boolean = false;
  @Input() questionNumber: number = 0;
  @Input() assignmentId: number = 0;

  public matcher = new AcErrorStateMatcher();

  constructor(public fh: FormHelperService) { }

  ngOnInit() {
  }

}
