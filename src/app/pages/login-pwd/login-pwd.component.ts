import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { authServices } from '../../Data/services/authServices';
import Swal from 'sweetalert2';
import { loginUserRequest } from 'src/app/Data/dto/user/request/loginUserRequest';
import { loginResponse } from 'src/app/Data/dto/user/response/loginResponse';
import { RestResponse } from 'src/app/Data/common/restResponse';
import { userNameVerificationResponse } from 'src/app/Data/dto/user/response/userNameVerificationResponse';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-pwd',
  templateUrl: './login-pwd.component.html',
  styleUrls: ['./login-pwd.component.scss']
})
export class LoginPwdComponent implements OnInit {
  public formGroup!: FormGroup;
  userVerification: userNameVerificationResponse = new userNameVerificationResponse();
  loginUser: loginUserRequest = new loginUserRequest();
  public cargando: boolean = false;

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
    this.cargando = true;
    this.loginUser.application = '';
    this.loginUser.password = this.formGroup.get('password')?.value;
    this.loginUser.userName = this.userVerification.userName;

    const login: Observable<RestResponse<loginResponse>> = this.authService.login$(this.loginUser);
    login.subscribe({
      next: (res: RestResponse<loginResponse>) => {
        if (res.data.doubleFactorCode == 0)
          this.router.navigate(['dashboard']);
        else
          this.router.navigate(['two-factor-phone']);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error fatal',
          text: err.error.message
        });
      }, complete: () => {
        this.cargando = false;
      }
    });
  }
}