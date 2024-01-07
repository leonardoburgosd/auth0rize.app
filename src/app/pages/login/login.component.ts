import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { loginUser, responseLogin } from '../../Data/dto/user/loginUser';
import { authServices } from '../../Data/services/authServices';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

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
    private authService: authServices,
    private router: Router
  ) { }

  private validacionFormaulario() {
    this.formGroup = this.formBuilder.group({
      email: [this.nuevoUsuario.email, [Validators.required, Validators.email]],
      password: [this.nuevoUsuario.password, [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    this.validacionFormaulario();
  }

  login() {
    this.router.navigate(['pwd']);
    // this.nuevoUsuario.email = this.formGroup.get('email')?.value;
    // this.nuevoUsuario.password = this.formGroup.get('password')?.value;
    // this.authService.login$(this.nuevoUsuario).subscribe(
    //   (res: responseLogin) => {
    //     if (res.isSuccess) {
    //       this.router.navigate(['/dashboard']);
    //     }else{
    //       Swal.fire({
    //         icon: 'error',
    //         title: 'Login error',
    //         text: res.message
    //       })
    //     }
    //   },
    //   (err: any) => {
    //     console.table(err);
    //   }
    // );
  }

}
