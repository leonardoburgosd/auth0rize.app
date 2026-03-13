import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { RestResponse } from "../common/restResponse";
import { getNegocioResponse, NegocioItemResponse } from "../dto/negocio/response/getNegocioResponse";
import { HttpMethodString } from "../common/httpMethodString";
import { createNegocioRequest } from "../dto/negocio/request/createNegocioRequest";
import { getAuthHeaders } from "../common/getAuthHeaders";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class negocioServices {
  private api: string = `${environment.url}Company`;

  constructor(private cookieService: CookieService) { }

  get$(search?: string, domainId?: number, page: number = 1, size: number = 10): Promise<RestResponse<getNegocioResponse>> {
    let url = `${this.api}?page=${page}&size=${size}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    if (domainId) url += `&domainId=${domainId}`;

    return fetch(url, {
        method: HttpMethodString.get,
        headers: getAuthHeaders(this.cookieService)
    }).then(response => response.json() as Promise<RestResponse<getNegocioResponse>>);
  }

  create$(request: createNegocioRequest): Promise<RestResponse<NegocioItemResponse>> {
    return fetch(`${this.api}`, {
        method: HttpMethodString.post,
        headers: getAuthHeaders(this.cookieService),
        body: JSON.stringify(request)
    }).then(response => response.json() as Promise<RestResponse<NegocioItemResponse>>);
  }

  update$(id: number, request: createNegocioRequest): Promise<RestResponse<NegocioItemResponse>> {
    return fetch(`${this.api}/${id}`, {
        method: HttpMethodString.put,
        headers: getAuthHeaders(this.cookieService),
        body: JSON.stringify(request)
    }).then(response => response.json() as Promise<RestResponse<NegocioItemResponse>>);
  }

  deleted$(id: number): Promise<RestResponse<boolean>> {
    return fetch(`${this.api}/${id}`, {
        method: HttpMethodString.delete,
        headers: getAuthHeaders(this.cookieService)
    }).then(response => response.json() as Promise<RestResponse<boolean>>);
  }
}
