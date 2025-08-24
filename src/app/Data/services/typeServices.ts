import { Injectable } from "@angular/core";
import { parametersConfig } from "../common/param-config";
import { RestResponse } from "../common/restResponse";
import { HttpMethodString } from "../common/httpMethodString";
import { getTypeResponse } from "../dto/user/response/getTypeResponse";
import { CookieService } from "ngx-cookie-service";

@Injectable({
    providedIn: 'root'
})

export class typeServices {
    private api: string = new parametersConfig().url + 'type';
    private httpOptions(): any {
        const token = this.cookieService.get('token')
        return {
            'Content-type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${token}`,
        };
    }
    constructor(private cookieService: CookieService) { }

    lista$(): Promise<RestResponse<getTypeResponse[]>> {
        return fetch(this.api, {
            method: HttpMethodString.get,
            headers: this.httpOptions()
        })
            .then(response => response.json() as Promise<RestResponse<getTypeResponse[]>>);
    }
}
