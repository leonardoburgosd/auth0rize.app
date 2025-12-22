import { Injectable } from "@angular/core";
import { RestResponse } from "../common/restResponse";
import { registerSuperadminResponse } from "../dto/user/response/registerSuperadminResponse";
import { createFirstUserRequest } from "../dto/user/request/createFirstUserRequest";
import { HttpMethodString } from "../common/httpMethodString";
import { getUserResponse } from "../dto/user/response/getUserResponse";
import { CookieService } from "ngx-cookie-service";
import { getAuthHeaders } from "../common/getAuthHeaders";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})

export class userServices {
  private api: string = `${environment.url}user`;

  constructor(private cookieService: CookieService) { }

  crearPrimero$(user: createFirstUserRequest): Promise<RestResponse<registerSuperadminResponse>> {
    return fetch(this.api + "/first-register", {
      method: HttpMethodString.post,
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json;charset=UTF-8'
      }
    }).then(response => response.json() as Promise<RestResponse<registerSuperadminResponse>>);
  }

  crear$() {
    return fetch(this.api, {
      method: HttpMethodString.post,
      headers: getAuthHeaders(this.cookieService)
    })
      .then(response => response.json() as Promise<RestResponse<boolean>>);
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

  verificacionUserName$(userName: string): Promise<RestResponse<boolean>> {
    return fetch(`${this.api}/username/${userName}`, {
      method: HttpMethodString.get,
    })
      .then(response => response.json() as Promise<RestResponse<boolean>>);
  }

  obtenerPorId$(id: string): Promise<RestResponse<getUserResponse>> {
    return fetch(`${this.api}/${id}`, {
      method: HttpMethodString.get,
      headers: getAuthHeaders(this.cookieService)
    })
      .then(response => response.json() as Promise<RestResponse<getUserResponse>>);
  }
}
