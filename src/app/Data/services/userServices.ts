import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { parametersConfig } from "../common/param-config";
import { RestResponse } from "../common/restResponse";
import { Observable } from "rxjs";
import { registerSuperadminResponse } from "../dto/user/response/registerSuperadminResponse";
import { createUserResponse } from "../dto/user/response/createUserResponse";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }),
    Authorization: 'Bearer ',
};

@Injectable({
    providedIn: 'root'
})

export class userServices {
    private api: string = new parametersConfig().url + 'user';

    constructor() { }

    crear$(user: createUserResponse): Promise<RestResponse<registerSuperadminResponse>> {
        return fetch(this.api,{
            method: 'POST',
            body: JSON.stringify(user),
                headers: {
                    'Content-type': 'application/json;charset=UTF-8'
                }
        }).then(response => response.json() as Promise<RestResponse<registerSuperadminResponse>>);
    }

    listarUsuarios(application: string): any {
        // return this.httpClient.get(`${this.api}/${application}`, httpOptions);
    }

}
