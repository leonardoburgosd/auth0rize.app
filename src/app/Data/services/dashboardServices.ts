import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RestResponse } from '../common/restResponse';
import { getDashboardResponse } from '../dto/user/response/getDashboardResponse';
import { getAuthHeaders } from '../common/getAuthHeaders';
import { HttpMethodString } from '../common/httpMethodString';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class dashboardServices {
  private api: string = `${environment.url}dashboard`;
  constructor(private cookieService: CookieService) { }

  get$(): Promise<RestResponse<getDashboardResponse>> {
    return fetch(this.api+"/counter", {
      method: HttpMethodString.get,
      headers: getAuthHeaders(this.cookieService)
    }).then(response => response.json() as Promise<RestResponse<getDashboardResponse>>);
  }
}
