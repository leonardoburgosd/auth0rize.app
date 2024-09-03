import { parametersConfig } from "../common/param-config";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { loginUserRequest } from "../dto/user/request/loginUserRequest";
import { userNameVerificationRequest } from "../dto/user/request/userNameVerificationRequest";
import { RestResponse } from "../common/restResponse";
import { loginResponse } from "../dto/user/response/loginResponse";
import { userNameVerificationResponse } from "../dto/user/response/userNameVerificationResponse";
import { recoveryByEmailRequest } from "../dto/user/request/recoveryByEmailRequest";
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }),
    Authorization: 'Bearer ',
};

@Injectable({
    providedIn: 'root'
})

export class authServices {
    private api: string = new parametersConfig().url + 'auth';

    constructor(private httpClient: HttpClient) { }

    userNameVerification$(verificationUserName: userNameVerificationRequest): Observable<RestResponse<userNameVerificationResponse>> {
        return this.httpClient.post<RestResponse<userNameVerificationResponse>>(this.api + '/user', verificationUserName);
    }

    login$(user: loginUserRequest): Observable<RestResponse<loginResponse>> {
        return this.httpClient.post<RestResponse<loginResponse>>(this.api, user);
    }

    recoveryByEmail$(email: string): Observable<RestResponse<boolean>> {
        const recovery: recoveryByEmailRequest = new recoveryByEmailRequest();
        recovery.email = email;
        return this.httpClient.post<RestResponse<boolean>>(this.api + '/recovery-by-email', recovery);
    }
} 