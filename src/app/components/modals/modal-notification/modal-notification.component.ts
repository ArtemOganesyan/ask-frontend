import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ModalConfirmationComponent} from '../modal-confirmation/modal-confirmation.component';

@Component({
  selector: 'ac-modal-notification',
  templateUrl: './modal-notification.component.html',
  styleUrls: ['./modal-notification.component.scss']
})
export class ModalNotificationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalConfirmationComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
