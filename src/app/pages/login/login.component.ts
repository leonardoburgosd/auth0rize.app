import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { loginUser } from '../../Data/dto/user/loginUser';
import { authServices } from '../../Data/services/authServices';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { requestUserNameVerification, responseUserNameVerification } from 'src/app/Data/dto/user/userNameVerificate';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public formGroup!: FormGroup;
  public requestUsernameVerification: requestUserNameVerification = new requestUserNameVerification();
  public nuevoUsuario: loginUser = new loginUser();

  constructor(
    private formBuilder: FormBuilder,
    private authService: authServices,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.validacionFormaulario();
  }

  private validacionFormaulario() {
    this.formGroup = this.formBuilder.group({
      username: [this.nuevoUsuario.userName, [Validators.required]]
    });
  }



  login() {

    this.requestUsernameVerification.userName = this.formGroup.get('username')?.value;
    this.requestUsernameVerification.application = '';
    this.authService.userNameVerification$(this.requestUsernameVerification).subscribe(
      (res: responseUserNameVerification) => {
        if (res.success) {
          this.router.navigate(['pwd']);
          this.cookieService.set('basicData', JSON.stringify(res.data));
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Login error',
            text: res.message
          })
        }
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
