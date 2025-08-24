import { Injectable } from "@angular/core";
import { loginUserRequest } from "../dto/user/request/loginUserRequest";
import { userNameVerificationRequest } from "../dto/user/request/userNameVerificationRequest";
import { RestResponse } from "../common/restResponse";
import { loginResponse } from "../dto/user/response/loginResponse";
import { userNameVerificationResponse } from "../dto/user/response/userNameVerificationResponse";
import { recoveryByEmailRequest } from "../dto/user/request/recoveryByEmailRequest";
import { HttpMethodString } from "../common/httpMethodString";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})

export class authServices {
  private api: string = `${environment.url}auth`;

  constructor() { }

  userNameVerification$(verificationUserName: userNameVerificationRequest): Promise<RestResponse<userNameVerificationResponse>> {
    return fetch(`${this.api}/user`, {
      method: HttpMethodString.post,
      body: JSON.stringify(verificationUserName),
      headers: {
        'Content-type': 'application/json;charset=UTF-8'
      }
    }).then(response => response.json() as Promise<RestResponse<userNameVerificationResponse>>);
  }

  login$(user: loginUserRequest): Promise<RestResponse<loginResponse>> {
    return fetch(`${this.api}`, {
      method: HttpMethodString.post,
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
        method: HttpMethodString.post,
        body: JSON.stringify(recovery),
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        }
      }
    ).then(response => response.json() as Promise<RestResponse<boolean>>);
  }
}
