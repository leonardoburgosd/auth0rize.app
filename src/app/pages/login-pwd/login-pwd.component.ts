import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { loginUser, responseLogin } from 'src/app/Data/dto/user/loginUser';
import { userVerificationResponse } from 'src/app/Data/dto/user/userNameVerificate';
import { authServices } from '../../Data/services/authServices';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-pwd',
  templateUrl: './login-pwd.component.html',
  styleUrls: ['./login-pwd.component.scss']
})
export class LoginPwdComponent implements OnInit {
  public formGroup!: FormGroup;
  userVerification: userVerificationResponse = new userVerificationResponse();
  loginUser: loginUser = new loginUser();


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: authServices,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.userVerification = JSON.parse(this.cookieService.get('basicData'));
    this.validacionFormulario();
  }

  private validacionFormulario() {
    this.formGroup = this.formBuilder.group({
      password: [this.loginUser.password, [Validators.required]]
    });
  }

  login() {
    this.loginUser.application = '';
    this.loginUser.password = this.formGroup.get('password')?.value;
    this.loginUser.userName = this.userVerification.userName;

    this.authService.login$(this.loginUser).subscribe(
      (res: responseLogin) => {
        if (res.data.doubleFactorCode == 0)
          this.router.navigate(['dashboard']);
        else
          this.router.navigate(['two-factor-phone']);
      },
      (err: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error fatal',
          text: err.error.message
        })
      }
    );
  }
}



