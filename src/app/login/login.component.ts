import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { loginUser } from '../Data/dto/user/loginUser';
import { tokenUser } from '../Data/dto/user/tokenLogin';
import { authServices } from '../Data/services/authServices';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public formGroup!: FormGroup;
  public nuevoUsuario: loginUser = new loginUser();

  constructor(
    private formBuilder: FormBuilder,
    private authService: authServices
  ) {}

  private validacionFormaulario() {
    this.formGroup = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email],
      ],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    this.validacionFormaulario();
  }

  login() {
    let login: loginUser = new loginUser();
    login.email = this.formGroup.controls['email'].value;
    login.password = this.formGroup.controls['password'].value;
    login.domain = 'default';
    this.authService.login$(login).subscribe(
      (res: tokenUser) => {},
      (err: any) => {
        console.log(err);
      }
    );
  }

}
