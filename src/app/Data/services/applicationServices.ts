import { Injectable } from "@angular/core";
import { createApplicationRequest } from "../dto/user/request/createApplicationRequest";
import { RestResponse } from "../common/restResponse";
import { createApplicationResponse } from "../dto/user/response/createApplicationResponse";
import { getApplicationResponse } from "../dto/user/response/getApplicationResponse";
import { CookieService } from "ngx-cookie-service";
import { HttpMethodString } from "../common/httpMethodString";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})

export class applicationServices {
  private api: string = `${environment.url}Application`;

  private get headers(): Record<string, string> {
    return {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `Bearer ${this.cookieService.get('token')}`,
    };
  }

  constructor(private cookieService: CookieService) { }

  // POST /api/v1/Application
  create$(application: createApplicationRequest): Promise<RestResponse<createApplicationResponse>> {
    return fetch(this.api, {
      method: HttpMethodString.post,
      body: JSON.stringify(application),
      headers: this.headers
    }).then(response => response.json() as Promise<RestResponse<createApplicationResponse>>);
  }

  // GET /api/v1/Application
  get$(search: string = '', page: number = 1, size: number = 10): Promise<RestResponse<getApplicationResponse>> {
    const url = new URL(this.api);
    if (search) url.searchParams.append('search', search);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('size', size.toString());

    return fetch(url.toString(), {
      method: HttpMethodString.get,
      headers: this.headers
    }).then(response => response.json() as Promise<RestResponse<getApplicationResponse>>);
  }

  // PUT /api/v1/Application/{id}
  update$(id: number, application: createApplicationRequest): Promise<RestResponse<boolean>> {
    return fetch(`${this.api}/${id}`, {
      method: HttpMethodString.put,
      body: JSON.stringify(application),
      headers: this.headers
    }).then(response => response.json() as Promise<RestResponse<boolean>>);
  }

  // DELETE /api/v1/Application/{id}
  deleted$(id: number): Promise<RestResponse<boolean>> {
    return fetch(`${this.api}/${id}`, {
      method: HttpMethodString.delete,
      headers: this.headers
    }).then(response => response.json() as Promise<RestResponse<boolean>>);
  }
}
