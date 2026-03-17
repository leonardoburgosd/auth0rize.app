export class createUserRequest {
    name!: string;
    lastName!: string;
    motherLastName!: string;
    userName!: string;
    email!: string;
    password!: string;
    passwordConfirmation?: string; // solo validación en vista, no se envía al endpoint
    typeUserId!: number;
    domainId!: number;
}
