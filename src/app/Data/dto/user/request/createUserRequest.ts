export class createUserRequest {
  userName!: string;
  email!: string;
  password!: string;
  name!: string;
  lastName!: string;
  motherLastName!: string;
}

export class createUserValidationRequest extends createUserRequest {
  passwordConfirmation!: string;
}
