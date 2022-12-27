export class loginUser {
    public email!:string
    public password!:string
    public domain!: string
}

export class responseLogin{
    public isSuccess!:boolean;
    public data!:any;
    public message!:string;
    public errors!:any;
}