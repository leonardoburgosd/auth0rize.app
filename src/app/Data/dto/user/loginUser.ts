export class loginUser {
    public userName!:string
    public password!:string
    public application!: string
}

export class responseLogin{
    public isSuccess!:boolean;
    public data!:loginResponse;
    public message!:string;
    public errors!:any;
}

export class loginResponse{
    public doubleFactorCode!:number;
    public token!:string;
}