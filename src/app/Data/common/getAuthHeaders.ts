import { CookieService } from "ngx-cookie-service";

export function getAuthHeaders(cookieService: CookieService): Headers {
  return new Headers({
    'Content-Type': 'application/json;charset=UTF-8',
    'Authorization': `Bearer ${cookieService.get('token')}`,
  });
}
