import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-pwd',
  templateUrl: './login-pwd.component.html',
  styleUrls: ['./login-pwd.component.scss']
})
export class LoginPwdComponent implements OnInit {
  databasic: any;
  
  password: string = '';
  message: string = '';
  redirecturl!: any;
  secretkey!: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    let dataResponse: any;

    this.router.navigate(['two-factor-phone']);
  }
}



