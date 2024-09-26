import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { authServices } from '../../Data/services/authServices';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';
import { userNameVerificationRequest } from 'src/app/Data/dto/user/request/userNameVerificationRequest';
import { loginUserRequest } from 'src/app/Data/dto/user/request/loginUserRequest';
import { MessageDefault } from 'src/app/Data/common/messageDefault';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public formGroup!: FormGroup;
  public requestUsernameVerification: userNameVerificationRequest = new userNameVerificationRequest();
  public nuevoUsuario: loginUserRequest = new loginUserRequest();
  public cargando: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: authServices,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.validacionFormaulario();
  }

  private validacionFormaulario = () =>
    this.formGroup = this.formBuilder.group({
      userName: [this.nuevoUsuario.userName, [Validators.required, Validators.min(3)]]
    });

  login(loginUser: loginUserRequest) {
    this.cargando = true;
    this.requestUsernameVerification.userName = loginUser.userName;
    this.requestUsernameVerification.application = '';


    this.authService.userNameVerification$(this.requestUsernameVerification)
      .then(res => {
        if (res.success) {
          this.router.navigate(['pwd']);
          this.cookieService.set('basicData', JSON.stringify(res.data));
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Atención.',
            text: res.message
          })
        }
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Error no controlado',
          text: MessageDefault.errorConexion
        });
      })
      .finally(() => this.cargando = false);
  }

}
