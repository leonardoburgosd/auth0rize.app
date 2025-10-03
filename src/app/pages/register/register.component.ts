import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userServices } from 'src/app/Data/services/userServices';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { createUserRequest, createUserValidationRequest } from 'src/app/Data/dto/user/request/createUserRequest';
import { CustomValidations } from 'src/app/Data/common/validations';
import { MessageDefault } from 'src/app/Data/common/messageDefault';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public newUser: createUserValidationRequest = new createUserValidationRequest();
  public formGroup!: FormGroup;
  public cargando: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: userServices,
    private router: Router
  ) { }

  ngOnInit(): void {


    this.validationForm();
  }

  private validationForm = () => {
    this.formGroup = this.formBuilder.group({
      userName: [this.newUser.userName, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: [this.newUser.email, [Validators.required, Validators.email, Validators.minLength(5)]],
      password: [this.newUser.password, [Validators.required, Validators.minLength(9), Validators.maxLength(100)]],
      passwordVerification: [this.newUser.passwordConfirmation, [Validators.required, Validators.minLength(9), Validators.maxLength(100)]],
      name: [this.newUser.name, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      lastName: [this.newUser.lastName, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      motherLastName: [this.newUser.motherLastName, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
    }, {
      validators: [CustomValidations.unambiguousRoleValidator]
    });
  }

  registerUser(user: createUserValidationRequest) {
    this.cargando = true;
    const newUser: createUserRequest = {
      email: user.email,
      lastName: user.lastName,
      motherLastName: user.motherLastName,
      name: user.name,
      password: user.password,
      userName: user.userName
    };

    this.userService.createFirst$(newUser)
      .then(res => {
        if (res.success) {
          this.loginUserReload;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al registrar usuario.',
            text: res.message
          });
        }
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Error no controlado',
          text: MessageDefault.errorConexion
        })
      })
      .finally(() => this.cargando = false);
  }

  loginUserReload = () => this.router.navigate(['/']);
}
