import { Injectable } from "@angular/core";
import { parametersConfig } from "../common/param-config";
import { CookieService } from "ngx-cookie-service";
import { RestResponse } from "../common/restResponse";
import { getDomainResponse } from "../dto/user/response/getDomainResponse";
import { HttpMethodString } from "../common/httpMethodString";
import { createDomainRequest } from "../dto/user/request/createDomainRequest";
import { createDomainResponse } from "../dto/user/response/createDomainResponse";

@Injectable({
  providedIn: 'root'
})

export class domainServices {
  private api: string = new parametersConfig().url + 'domain';
  private httpOptions(): any {
    const token = this.cookieService.get('token')
    return {
      'Content-type': 'application/json;charset=UTF-8',
      'Authorization': `Bearer ${token}`,
    };
  }
  constructor(private cookieService: CookieService) { }

  get$(): Promise<RestResponse<getDomainResponse[]>> {
    return fetch(`${this.api}`, {
      method: HttpMethodString.get,
      headers: this.httpOptions()
    }).then(response => response.json() as Promise<RestResponse<getDomainResponse[]>>);
  }

  delete$(id: number): Promise<RestResponse<boolean>> {
    return fetch(`${this.api}/${id}`, {
      method: HttpMethodString.delete,
      headers: this.httpOptions()
    }).then(response => response.json() as Promise<RestResponse<boolean>>);
  }

  create$(domain: createDomainRequest): Promise<RestResponse<createDomainResponse>> {
    return fetch(`${this.api}`, {
      method: HttpMethodString.post,
      headers: this.httpOptions(),
      body: JSON.stringify(domain)
    }).then(response => response.json() as Promise<RestResponse<createDomainResponse>>);
  }
}
