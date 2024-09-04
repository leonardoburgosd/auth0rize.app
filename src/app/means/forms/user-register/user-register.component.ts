import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomValidations, isAdult } from 'src/app/Data/common/validations';
import { createUserRequest } from 'src/app/Data/dto/user/request/createUserRequest';
import { userServices } from 'src/app/Data/services/userServices';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent implements OnInit {
  @Input('isSuperUser')
  public isSuperUser: boolean = false;
  newUser: createUserRequest = new createUserRequest();

  @Output() isAddNewUser: EventEmitter<boolean> = new EventEmitter();

  public formGroup!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userServices: userServices
  ) { }

  ngOnInit(): void {
    this.validacionFormulario();
  }

  private validacionFormulario() {
    this.formGroup = this.formBuilder.group(
      {
        email: new FormControl(this.newUser.email, [
          Validators.required,
          Validators.email,
        ]),
        password: new FormControl(this.newUser.password, [
          Validators.required,
          Validators.minLength(8),
        ]),
        passwordConfirm: new FormControl(this.newUser.passwordConfirmation, [
          Validators.required,
          Validators.minLength(8),
        ]),
        name: new FormControl(this.newUser.name, [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern("^[a-zA-Z ]+$")
        ]),
        lastName: new FormControl(this.newUser.lastName, [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern("^[a-zA-Z ]+$")
        ]),
        birthday: new FormControl('', [
          Validators.required

        ]),
      },
      {
        validators: [CustomValidations.passwordConfirm('password','passwordConfirm'), isAdult()]
      }
    );
  }



  submit() {
    let isCreateNewUser: boolean = this.registerSuperUser();
    this.isAddNewUser.emit(isCreateNewUser);
  }

  registerSuperUser(): boolean {
    let isAdd: boolean = false;
    this.userServices.crear$(this.newUser).subscribe(
      (resp: any) => {
        isAdd = true;
      },
      (err: any) => {
        console.log(JSON.stringify(this.newUser));
        console.log(err);
      }
    );
    return isAdd;
  }

}

