import {ChangeDetectionStrategy, Component, Input, Optional} from '@angular/core';
import {ControlValueAccessor, NgControl} from '@angular/forms';
import {MatSliderChange} from '@angular/material';

@Component({
  selector: 'ac-quiz-passing-percentage',
  templateUrl: './quiz-passing-percentage.component.html',
  styleUrls: ['./quiz-passing-percentage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizPassingPercentageComponent implements ControlValueAccessor {

  @Input() maxPoints: number = 0;

  public value: number;
  private onChangeCallback: any;
  private onTouchCallback: any;
  private parentNgControl: NgControl;

  constructor(@Optional() ngControl: NgControl) {
    ngControl.valueAccessor = this;
    this.parentNgControl = ngControl;
  }

  increase() {
    const event = new MatSliderChange();
    event.value = Math.min(100, this.value + 1);

    this.valueChange(event);
  }

  decrease() {
    const event = new MatSliderChange();
    event.value = Math.max(0, this.value - 1);

    this.valueChange(event);
  }

  valueChange(newValue: MatSliderChange) {
    this.writeValue(+newValue.value);
    this.onChangeCallback(+newValue.value);
  }

  get points(): number {
    return Math.floor((this.value / 100) * this.maxPoints);
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchCallback = fn;
  }

}
