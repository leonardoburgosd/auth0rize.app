import { Injectable } from "@angular/core";
import { parametersConfig } from "../common/param-config";
import { CookieService } from "ngx-cookie-service";
import { RestResponse } from "../common/restResponse";
import { getDomainResponse } from "../dto/user/response/getDomainResponse";

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
            method: 'GET',
            headers: this.httpOptions()
        }).then(response => response.json() as Promise<RestResponse<getDomainResponse[]>>);
    }
}