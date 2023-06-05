import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {SingleChoiceQuizQuestion} from '../../../models/quiz.single-choice.question';
import {FormHelperService} from '../../../services/form-helper.service';
import {AcErrorStateMatcher} from '../../../helpers/AcErrorStateMatcher';

@Component({
  selector: 'ac-quiz-textual-question',
  templateUrl: './quiz-textual-question.component.html',
  styleUrls: ['./quiz-textual-question.component.scss']
})
export class QuizTextualQuestionComponent implements OnInit {

  @Input() questionForm: FormGroup;
  @Input() question: SingleChoiceQuizQuestion;
  @Input() isPreview = false;
  @Input() questionNumber: number = 0;
  @Input() assignmentId: number = 0;

  public matcher = new AcErrorStateMatcher();

  constructor(public fh: FormHelperService) {
  }

  ngOnInit() {
  }

}
