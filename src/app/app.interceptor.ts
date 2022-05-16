import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, switchMap, take, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "./auth-page/auth.service";

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headers;

    if (req.url.includes("logout")) {
      headers = this.getHeaders(environment.apiId, this.getBearerToken());
    } else {
      headers = this.getHeaders(environment.apiId, this.getBasicToken()); // таким образом запрос на создание новой машины не уходил
      // headers = this.getHeaders(environment.apiId, this.getBearerToken()); // таким не срабатывает авторизация
    }

    const authReq = req.clone({ headers });

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !req.url.includes("login")) {
          return this.authService.refresh().pipe(
            take(1),
            switchMap(() => next.handle(authReq))
          );
        }
        return throwError(error);
      })
    );
  }

  private getHeaders(appId: string, token: string): HttpHeaders {
    return new HttpHeaders({
      "X-Api-Factory-Application-Id": appId,
      Authorization: `${token}`,
    });
  }

  private getBearerToken(): string {
    return `Bearer ${localStorage.getItem("token")}`;
  }

  private getBasicToken(): string {
    return `Basic ${btoa(environment.basicToken)}`;
  }
}
