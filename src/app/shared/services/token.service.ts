import { Injectable } from "@angular/core";
import { IAuthRes } from "src/app/auth-page/auth.interface";

@Injectable({
  providedIn: "root",
})
export class tokenService {
  public get token(): string | null {
    return localStorage.getItem("token");
  }

  public setToken(item: IAuthRes | null) {
    if (item) {
      const newToken = {
        expiresIn: new Date(new Date().getTime() + +item.expires_in * 1000),
        token: item.access_token,
        refreshToken: item.refresh_token,
      };

      localStorage.setItem("token", newToken.token);
      localStorage.setItem("refresh-token", newToken.refreshToken);
      localStorage.setItem("expires", newToken.expiresIn.toString());
    } else {
      this.removeToken();
    }
  }

  private get tokenExpiresDate(): Date | null {
    const expires = localStorage.getItem("expires");
    if (expires) {
      return new Date(expires);
    }

    return null;
  }

  public getRefreshToken(): string {
    const refreshToken = localStorage.getItem("refresh-token");
    return refreshToken != null ? refreshToken : "";
  }

  public isTokenExpired(): boolean {
    return this.tokenExpiresDate && new Date() > this.tokenExpiresDate
      ? true
      : false;
  }

  public hasToken(): boolean {
    return this.token != null ? true : false;
  }

  private removeToken() {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh-token");
    localStorage.removeItem("expires");
  }
}
