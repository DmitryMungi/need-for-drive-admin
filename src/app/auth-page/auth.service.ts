import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { catchError, Observable, Subject, tap, throwError } from "rxjs";
import { TokenService } from "../shared/services/token.service";
import { IAuth, IAuthRes } from "./auth.interface";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public error = new Subject<string>();

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  public login(item: IAuth): Observable<IAuthRes> {
    return this.http
      .post<IAuthRes>(`${environment.apiUrl}auth/login`, item)
      .pipe(
        tap((res) => this.tokenService.setToken(res)),
        catchError((error) => this.handleError(error))
      );
  }

  public logout(): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}auth/logout`, "");
  }

  public isAuthenticated(): boolean {
    return this.tokenService.hasToken() && !this.tokenService.isTokenExpired();
  }

  public refresh(): Observable<IAuthRes> {
    return this.http
      .post<IAuthRes>(`${environment.apiUrl}auth/refresh`, {
        refresh_token: this.tokenService.getRefreshToken(),
      })
      .pipe(
        tap((res) => this.tokenService.setToken(res)),
        catchError((error) => throwError(error))
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const status = error.status;

    if (status === 401) {
      this.error.next("Пользователь не найден");
    }

    return throwError(error);
  }
}
