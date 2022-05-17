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
import { ERROR_RES_STATUS } from "./shared/const/const";

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: this.getHeaders(
        environment.apiId,
        req.url.includes("login") ? this.getBasicToken() : this.getBearerToken()
      ),
    });

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === ERROR_RES_STATUS && !req.url.includes("login")) {
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
