import { Component, OnInit } from '@angular/core';
import { createUser } from '../../Data/dto/user/createUser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userServices } from 'src/app/Data/services/userServices';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public newUser: createUser = new createUser();
  public formGroup!: FormGroup;
  public cargando: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: userServices
  ) { }

  ngOnInit(): void {
    this.validationForm();
  }

  private validationForm() {
    this.formGroup = this.formBuilder.group({
      username: [this.newUser.userName, [Validators.required, Validators.min(3), Validators.max(30)]],
      email: [this.newUser.email, [Validators.required, Validators.email, Validators.max(30)]],
      password: [this.newUser.password, [Validators.required, Validators.min(9), Validators.max(100)]],
      passwordVerification: [this.newUser.passwordConfirmation, [Validators.min(9), Validators.max(100)]],
      name: [this.newUser.name, [Validators.required, Validators.min(2), Validators.max(150)]],
      lastName: [this.newUser.lastName, [Validators.required, Validators.min(2), Validators.max(150)]],
      motherLastName: [this.newUser.motherLastName, [Validators.required, Validators.min(2), Validators.max(150)]],
    });
  }

  registerUser() {
    this.cargando = true;
    this.userService.crear$(this.newUser).subscribe(
      (res: any) => {
        if (res.success) {

        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al registrar usuario.',
            text: res.message
          });
          this.cargando = false;
        }
      },
      (err: any) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error fatal al registrar usuario.',
          text: err.error.message
        })
      }
    );
  }

  loginUserReload() { }

  userCreated(isCreatedUser: boolean) {
    isCreatedUser ? this.loginUserReload() : null;
  }
}
