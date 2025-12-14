import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userServices } from 'src/app/Data/services/userServices';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { createUserRequest } from 'src/app/Data/dto/user/request/createUserRequest';
import { createUserResponse } from 'src/app/Data/dto/user/response/createUserResponse';
import { CustomValidations } from 'src/app/Data/common/validations';
import { MessageDefault } from 'src/app/Data/common/messageDefault';
import { userNameGenerate } from 'src/app/Data/common/userNameGenerate';
import { merge } from 'rxjs';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: false
})
export class RegisterComponent implements OnInit {
  public newUser: createUserRequest = new createUserRequest();
  public formGroup!: FormGroup;
  public cargando: boolean = false;
  public userName: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private userService: userServices,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.validationForm();
    this.verificationUsername();
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

  registerUser(user: createUserRequest) {
    this.cargando = true;
    const newUser: createUserResponse = {
      email: user.email,
      lastName: user.lastName,
      motherLastName: user.motherLastName,
      name: user.name,
      password: user.password,
      userName: user.userName
    };

    this.userService.crear$(newUser)
      .then(res => {
        if (res.success) {
          this.router.navigate(['/login']);
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

  verificationUsername() {
    const nameCtrl = this.formGroup.get('name');
    const lastCtrl = this.formGroup.get('lastName');
    const motherCtrl = this.formGroup.get('motherLastName');

    merge(
      nameCtrl!.valueChanges,
      lastCtrl!.valueChanges,
      motherCtrl!.valueChanges
    ).subscribe(() => {
      const name = this.formGroup.get('name')?.value || '';
      const lastName = this.formGroup.get('lastName')?.value || '';
      const motherLastName = this.formGroup.get('motherLastName')?.value || '';

      if (name.length > 1 && lastName.length > 1) {
        const userName = userNameGenerate(name, lastName, motherLastName)
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');

        this.formGroup.get('userName')?.setValue(userName, { emitEvent: false });
      }

    });

  }
}
