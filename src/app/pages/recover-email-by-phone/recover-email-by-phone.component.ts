import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recover-email-by-phone',
  templateUrl: './recover-email-by-phone.component.html',
  styleUrls: ['./recover-email-by-phone.component.scss']
})
export class RecoverEmailByPhoneComponent implements OnInit {
  databasic: any;
  message: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
