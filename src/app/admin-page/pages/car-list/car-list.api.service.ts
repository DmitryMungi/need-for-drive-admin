import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { ICarRes } from "../car-card/car-card.interface";
import { IRes } from "src/app/shared/shared.interface";
import { environment } from "src/environments/environment";
import { CarListService } from "./car-list.service";

@Injectable({ providedIn: "root" })
export class CarListApiService {
  constructor(
    private http: HttpClient,
    private carListService: CarListService
  ) {}

  getCars(queryParams: {
    [key: string]: string | number;
  }): Observable<ICarRes[]> {
    const params = new HttpParams({ fromObject: queryParams });
    return this.http
      .get<IRes<ICarRes>>(`${environment.apiUrl}/db/car`, {
        params,
      })
      .pipe(
        tap((res) => this.carListService.setTotalCars(res.count)),
        map((res) => res.data)
      );
  }
}
