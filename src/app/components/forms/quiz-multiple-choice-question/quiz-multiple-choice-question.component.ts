import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {SingleChoiceQuizQuestion} from '../../../models/quiz.single-choice.question';
import {AcErrorStateMatcher} from '../../../helpers/AcErrorStateMatcher';
import {FormHelperService} from '../../../services/form-helper.service';

@Component({
  selector: 'ac-quiz-multiple-choice-question',
  templateUrl: './quiz-multiple-choice-question.component.html',
  styleUrls: ['./quiz-multiple-choice-question.component.scss']
})
export class QuizMultipleChoiceQuestionComponent implements OnInit {

  @Input() questionForm: FormGroup;
  @Input() question: SingleChoiceQuizQuestion;
  @Input() isPreview: boolean = false;
  @Input() questionNumber: number = 0;
  @Input() assignmentId: number = 0;

  public matcher = new AcErrorStateMatcher();

  constructor(public fh: FormHelperService) { }

  ngOnInit() {
  }

  toggle(checked: boolean, optionId: number) {
    const answersControl = this.questionForm.get('answers');
    const answers: Set<number> = answersControl.value;

    return checked
      ? answersControl.setValue(answers.add(optionId))
      : answersControl.setValue(answers.delete(optionId));
  }
}
