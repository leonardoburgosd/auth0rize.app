import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { parametersConfig } from "../common/param-config";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }),
    Authorization: 'Bearer ',
};

@Injectable({
    providedIn: 'root'
})

export class permissionsServices {
    private api: string = new parametersConfig().url + '/permissions';
    constructor(private httpClient: HttpClient) { }

    crear(permission: any): any {
        return this.httpClient.post(this.api, permission).toPromise();
    }

}
