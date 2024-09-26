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
        'Content-Type': 'application/json;charset=UTF-8',
    }),
    Authorization: 'Bearer ',
};

@Injectable({
    providedIn: 'root'
})

export class authServices {
    private api: string = new parametersConfig().url + 'auth';

    constructor() { }

    userNameVerification$(verificationUserName: userNameVerificationRequest): Promise<RestResponse<userNameVerificationResponse>> {
        return fetch(`${this.api}/user`, {
            method: 'POST',
            body: JSON.stringify(verificationUserName),
            headers: {
                'Content-type': 'application/json;charset=UTF-8'
            }
        }).then(response => response.json() as Promise<RestResponse<userNameVerificationResponse>>);
    }

    login$(user: loginUserRequest): Promise<RestResponse<loginResponse>> {
        return fetch(`${this.api}`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-type': 'application/json;charset=UTF-8'
            }
        }).then(response => response.json() as Promise<RestResponse<loginResponse>>);
    }

    recoveryByEmail$(email: string): Promise<RestResponse<boolean>> {
        const recovery: recoveryByEmailRequest = new recoveryByEmailRequest();
        recovery.email = email;
        return fetch(
            `${this.api}/recovery-by-email`,
            {
                method: 'POST',
                body: JSON.stringify(recovery),
                headers: {
                    'Content-type': 'application/json;charset=UTF-8'
                }
            }
        ).then(response => response.json() as Promise<RestResponse<boolean>>);
    }
} 
