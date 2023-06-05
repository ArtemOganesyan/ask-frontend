import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'ac-registration-confirmation-page',
  templateUrl: './registration-confirmation-page.component.html',
  styleUrls: ['./registration-confirmation-page.component.scss']
})
export class RegistrationConfirmationPageComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

}
