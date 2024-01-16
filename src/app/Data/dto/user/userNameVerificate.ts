export class responseUserNameVerification {
    public success!: boolean;
    public data!: userVerificationResponse;
    public message!: string;
    public errors!: any;
}
export class userVerificationResponse {
    public email!:string;
}

export class requestUserNameVerification{
    public userName!:string;
    public application!:string;
}