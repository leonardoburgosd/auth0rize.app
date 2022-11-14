import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { defaultData } from 'src/app/Data/common/defaultData';
import { userServices } from 'src/app/Data/services/userServices';
import { createUser } from '../../../Data/dto/user/createUser';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent implements OnInit {
  @Input('isSuperUser')
  public isSuperUser: boolean = false;

  @Output() isAddNewUser: EventEmitter<boolean> = new EventEmitter();

  public formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userServices: userServices
  ) {}

  private validacionFormulario() {
    let fechaPorDefecto: string = defaultData.lowestBirthday();
    this.formGroup = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      passwordConfirm: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      birthday: new FormControl(fechaPorDefecto, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.validacionFormulario();
  }

  submit() {
    let isCreateNewUser: boolean = this.registerSuperUser();
    this.isAddNewUser.emit(isCreateNewUser);
  }

  registerSuperUser(): boolean {
    let isAdd: boolean = false;
    let newUser: createUser = new createUser();
    newUser.email = this.formGroup.controls['email'].value;
    newUser.password = this.formGroup.controls['password'].value;
    newUser.passwordConfirmation = this.formGroup.controls['passwordConfirm'].value;
    newUser.name = this.formGroup.controls['name'].value;
    newUser.lastName = this.formGroup.controls['lastName'].value;
    newUser.birthday = this.formGroup.controls['birthday'].value;
    this.userServices.crear$(newUser).subscribe(
      (resp: any) => {
        isAdd = true;
      },
      (err: any) => {
        console.log(JSON.stringify(newUser));
        console.log(err)
      }
    );
    return isAdd;
  }
}
