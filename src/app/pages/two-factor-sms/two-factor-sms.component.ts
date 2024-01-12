import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-two-factor-sms',
  templateUrl: './two-factor-sms.component.html',
  styleUrls: ['./two-factor-sms.component.scss']
})
export class TwoFactorSmsComponent implements OnInit {
  databasic: any;

  password: string = '';
  message: string = '';
  redirecturl!: any;
  secretkey!: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  validar() {
    this.router.navigate(['dashboard']);
  }
}
