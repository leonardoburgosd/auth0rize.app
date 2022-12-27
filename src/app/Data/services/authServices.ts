import { parametersConfig } from "../common/param-config";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { loginUser, responseLogin } from "../dto/user/loginUser";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }),
    Authorization: 'Bearer ',
};

@Injectable({
    providedIn: 'root'
})

export class authServices {
    private api: string = new parametersConfig().url + 'auth';

    constructor(private httpClient: HttpClient) { }

    login$(user: loginUser): Observable<responseLogin> {
        return this.httpClient.post<responseLogin>(this.api, user);
    }
} 