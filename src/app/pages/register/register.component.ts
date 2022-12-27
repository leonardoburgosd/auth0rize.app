import { Component, OnInit } from '@angular/core';
import { createUser } from '../../Data/dto/user/createUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public newUser: createUser = new createUser();

  constructor() {}

  ngOnInit(): void {}

  loginUserReload() {}

  userCreated(isCreatedUser: boolean) {
    isCreatedUser ? this.loginUserReload() : null;
  }
}
