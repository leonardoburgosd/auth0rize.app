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

    constructor(private httpClient: HttpClient) { }

    crear$(user: createUserResponse): Observable<RestResponse<registerSuperadminResponse>> {
        return this.httpClient.post<RestResponse<registerSuperadminResponse>>(this.api, user);
    }

    listarUsuarios(application: string): any {
        // return this.httpClient.get(`${this.api}/${application}`, httpOptions);
    }

}
