import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { loginUser } from '../Data/dto/user/loginUser';
import { tokenUser } from '../Data/dto/user/tokenLogin';
import { userServices } from '../Data/services/userServices';

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
    private userService: userServices
  ) {}
  
  private validacionFormaulario() {
    this.formGroup = this.formBuilder.group({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.validacionFormaulario();
  }

  login() {
    let login: loginUser = new loginUser();
    this.userService.login(login).subscribe(
      (res: tokenUser) => {},
      (err: any) => {}
    );
  }
  
}
