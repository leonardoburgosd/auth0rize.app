import { HttpHeaders } from "@angular/common/http";
import { parametersConfig } from "../common/param-config";
import { Injectable } from "@angular/core";
import { createApplicationRequest } from "../dto/user/request/createApplicationRequest";
import { RestResponse } from "../common/restResponse";
import { createApplicationResponse } from "../dto/user/response/createApplicationResponse";
import { getApplicationResponse } from "../dto/user/response/getApplicationResponse";
import { CookieService } from "ngx-cookie-service";

@Injectable({
    providedIn: 'root'
})

export class applicationServices {
    private api: string = new parametersConfig().url + 'Application';
    private httpOptions(): any {
        const token = this.cookieService.get('token')
        return {
            'Content-type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${token}`,
        };
    }

    constructor(private cookieService: CookieService) { }

    create$(application: createApplicationRequest): Promise<RestResponse<createApplicationResponse>> {
        const token = this.cookieService.get('token')
        return fetch(`${this.api}`, {
            method: 'POST',
            body: JSON.stringify(application),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(response => response.json() as Promise<RestResponse<createApplicationResponse>>);
    }

    get$(): Promise<RestResponse<getApplicationResponse[]>> {
        return fetch(`${this.api}`, {
            method: 'GET',
            headers: this.httpOptions()
        }).then(response => response.json() as Promise<RestResponse<getApplicationResponse[]>>);
    }

    deleted$(id: number): Promise<RestResponse<boolean>> {
        return fetch(`${this.api}/${id}`, {
            method: 'DELETE',
            headers: this.httpOptions()
        }).then(response => response.json() as Promise<RestResponse<boolean>>);
    }
}