import { Component, OnInit } from '@angular/core';
import { AlertType } from 'src/shared/utility';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  show = false;
  type: string;
  message: string;

  constructor() {}

  ngOnInit(): void {}

  showAlert(type: AlertType, message: string) {
    this.show = true;
    this.type = 'alert-' + type;
    this.message = message;
  }

  clearAlert() {
    this.show = false;
  }
}
