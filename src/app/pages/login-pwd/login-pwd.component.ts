import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
    this.databasic.email = 'leonardoburgos@site.pe';
  }

  login() {
    let dataResponse: any;

    
  }
}
