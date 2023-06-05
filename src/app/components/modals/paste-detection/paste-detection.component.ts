import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {IPasteDetection} from '../../../interfaces/IPasteDetection';
import {List} from 'immutable';
import * as moment from 'moment';
import {DATE_TIME_FORMAT} from '../../../app.config';

@Component({
  selector: 'ac-paste-detection',
  templateUrl: './paste-detection.component.html',
  styleUrls: ['./paste-detection.component.scss']
})
export class PasteDetectionComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { pastes: List<IPasteDetection> }) {
  }

  ngOnInit() {
  }

  convertDateToString(date: Date) {
    return moment(date).format(DATE_TIME_FORMAT);
  }

}
