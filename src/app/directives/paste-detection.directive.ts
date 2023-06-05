import {Directive, HostListener, Input} from '@angular/core';
import {GlobalState} from '../store/states';
import {Store} from '@ngrx/store';
import {SavePasteDetection} from '../store/actions/student.actions';

@Directive({
  selector: '[acPasteDetection]'
})
export class PasteDetectionDirective {

  @Input() questionNumber: number;
  @Input() assignmentId: number;
  @Input() notCatch: boolean = false;

  constructor(public store: Store<GlobalState>) {
  }

  @HostListener('paste', ['$event']) catchPaste(e: Event) {
    if (this.notCatch) {
      return;
    }
    const value: string = (e['clipboardData'] as DataTransfer).getData('text/plain');

    this.store.dispatch(new SavePasteDetection({
      assignmentId: this.assignmentId,
      questionNumber: this.questionNumber,
      value
    }));

    // Remove comment if you would like to prevent Pasting
    // e.preventDefault();
  }

}
