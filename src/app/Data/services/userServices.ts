import { Injectable } from "@angular/core";
import { RestResponse } from "../common/restResponse";
import { registerSuperadminResponse } from "../dto/user/response/registerSuperadminResponse";
import { HttpMethodString } from "../common/httpMethodString";
import { getUserResponse } from "../dto/user/response/getUserResponse";
import { CookieService } from "ngx-cookie-service";
import { getAuthHeaders } from "../common/getAuthHeaders";
import { environment } from "src/environments/environment";
import { createInteranUserRequest } from "../dto/user/request/createInteralUserRequest";
import { createUserRequest } from "../dto/user/request/createUserRequest";
import { userCreateResponse } from "../dto/user/response/userCreateResponse";
@Injectable({
  providedIn: 'root'
})

export class userServices {
  private api: string = `${environment.url}user`;

  constructor(private cookieService: CookieService) { }

  createFirst$(user: createUserRequest): Promise<RestResponse<registerSuperadminResponse>> {
    return fetch(this.api + "/first-register", {
      method: HttpMethodString.post,
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json;charset=UTF-8'
      }
    }).then(response => response.json() as Promise<RestResponse<registerSuperadminResponse>>);
  }

  create$(user: createInteranUserRequest): Promise<RestResponse<userCreateResponse>> {
    return fetch(this.api, {
      method: HttpMethodString.post,
      body: JSON.stringify(user),
      headers: getAuthHeaders(this.cookieService)
    }).then(response => response.json() as Promise<RestResponse<userCreateResponse>>);
  }

  lista$(): Promise<RestResponse<getUserResponse>> {
    console.log(getAuthHeaders(this.cookieService));
    return fetch(this.api, {
      method: HttpMethodString.get,
      headers: getAuthHeaders(this.cookieService)
    })
      .then(response => response.json() as Promise<RestResponse<getUserResponse>>);
  }

  verification$(): Promise<RestResponse<boolean>> {
    return fetch(this.api + "/verification", {
      method: HttpMethodString.get,
    })
      .then(response => response.json() as Promise<RestResponse<boolean>>);
  }
}
