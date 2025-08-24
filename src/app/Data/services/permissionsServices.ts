import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

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
    private api: string = `${environment.url}permissions`;
    constructor(private httpClient: HttpClient) { }

    crear(permission: any): any {
        return this.httpClient.post(this.api, permission).toPromise();
    }

}
