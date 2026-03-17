import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { RestResponse } from "../common/restResponse";
import { getDomainResponse } from "../dto/user/response/getDomainResponse";
import { HttpMethodString } from "../common/httpMethodString";
import { createDomainRequest } from "../dto/user/request/createDomainRequest";
import { createDomainResponse } from "../dto/user/response/createDomainResponse";
import { getAuthHeaders } from "../common/getAuthHeaders";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})

export class domainServices {
  private api: string = `${environment.url}domain`;
  constructor(private cookieService: CookieService) { }

  get$(code?: string, state?: string, page: number = 1, size: number = 10): Promise<RestResponse<getDomainResponse>> {
    let url = `${this.api}?page=${page}&size=${size}`;
    if (code) url += `&search=${encodeURIComponent(code)}`;
    if (state) url += `&state=${encodeURIComponent(state)}`;
    return fetch(url, {
      method: HttpMethodString.get,
      headers: getAuthHeaders(this.cookieService)
    }).then(response => response.json() as Promise<RestResponse<getDomainResponse>>);
  }

  delete$(id: string): Promise<RestResponse<boolean>> {
    return fetch(`${this.api}/${id}`, {
      method: HttpMethodString.delete,
      headers: getAuthHeaders(this.cookieService)
    }).then(response => response.json() as Promise<RestResponse<boolean>>);
  }

  create$(domain: createDomainRequest): Promise<RestResponse<createDomainResponse>> {
    return fetch(`${this.api}`, {
      method: HttpMethodString.post,
      headers: getAuthHeaders(this.cookieService),
      body: JSON.stringify(domain)
    }).then(response => response.json() as Promise<RestResponse<createDomainResponse>>);
  }

  assignUser$(domainCode: string, userId: number, roleId: number): Promise<RestResponse<boolean>> {
    return fetch(`${this.api}/${domainCode}/users`, {
      method: HttpMethodString.post,
      headers: getAuthHeaders(this.cookieService),
      body: JSON.stringify({ userId, roleId })
    }).then(response => response.json() as Promise<RestResponse<boolean>>);
  }

  removeUser$(domainCode: string, userId: number): Promise<RestResponse<boolean>> {
    return fetch(`${this.api}/${domainCode}/users/${userId}`, {
      method: HttpMethodString.delete,
      headers: getAuthHeaders(this.cookieService)
    }).then(response => response.json() as Promise<RestResponse<boolean>>);
  }
}
