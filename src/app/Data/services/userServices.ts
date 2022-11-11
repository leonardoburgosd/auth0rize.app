import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { createUser } from '../dto/user/createUser';
import { parametersConfig } from "../common/param-config";
import { loginUser } from "../dto/user/loginUser";

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

    crear(createUser: createUser): any {
        return this.httpClient.post(this.api, createUser).toPromise();
    }

    listarUsuarios(application: string): any {
        return this.httpClient.get(`${this.api}/${application}`, httpOptions).toPromise();
    }

    login(user: loginUser):any{
        return this.httpClient.post(this.api, user).toPromise();
    }
}
