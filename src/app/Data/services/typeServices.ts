import { Injectable } from "@angular/core";
import { RestResponse } from "../common/restResponse";
import { HttpMethodString } from "../common/httpMethodString";
import { getTypeResponse } from "../dto/user/response/getTypeResponse";
import { CookieService } from "ngx-cookie-service";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class typeServices {
    private api: string = `${environment.url}type`;
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
