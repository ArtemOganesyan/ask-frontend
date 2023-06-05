import {Component, OnInit} from '@angular/core';
import {GlobalState} from '../../../store/states';
import {Store} from '@ngrx/store';
import {DeleteQuiz, LoadQuizzes} from '../../../store/actions/data.actions';
import {DataSelectors} from '../../../store/selectors/data.selectors';
import {MatDialog} from '@angular/material';
import {ModalConfirmationComponent} from '../../modals/modal-confirmation/modal-confirmation.component';
import {QuizPreviewComponent} from '../../modals/quiz-preview/quiz-preview.component';

@Component({
  selector: 'ac-quizzes-list',
  templateUrl: './quizzes-list.component.html',
  styleUrls: ['./quizzes-list.component.scss']
})
export class QuizzesListComponent implements OnInit {

  constructor(public store: Store<GlobalState>, public dataSelectors: DataSelectors, public dialog: MatDialog,) {
  }

  ngOnInit() {
    this.store.dispatch(new LoadQuizzes());
  }

  preview(quizId: number) {
    this.dataSelectors
      .quizzes$
      .first()
      .map(quizzes => quizzes.find(quiz => quiz.id === quizId) || null)
      .filter(quiz => quiz !== null)
      .switchMap(quiz => this.dialog
        .open(QuizPreviewComponent, {
          data: {quiz},
          width: '50em',
          height: '90%'
        })
        .afterClosed()
      )
      .subscribe(() => {
      });
  }

  deleteQuiz(quizId: number) {
    this.dialog
      .open(ModalConfirmationComponent, {
        width: '30em',
        data: {
          text: 'Are you sure want to DELETE whole quiz? This action cannot be undone!',
          action: 'Delete'
        }
      })
      .afterClosed()
      .filter(value => value === true)
      .subscribe(() => this.store.dispatch(new DeleteQuiz({quizId})));
  }

}
