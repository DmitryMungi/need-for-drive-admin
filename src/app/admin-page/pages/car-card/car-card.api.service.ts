import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, tap, throwError } from "rxjs";
import { AlertService } from "src/app/shared/components/alert/alert.service";
import { environment } from "src/environments/environment";
import { ICar, ICarRes } from "./car-card.interface";
import {
  ERROR,
  SUCCESS,
  SAVE_NEW_CAR_TEXT_SUCCESS,
  SAVE_CAR_ERROR_TEXT,
  DELETE_NEW_CAR_TEXT,
  CHANGE_NEW_CAR_TEXT,
} from "src/app/shared/const/const";

import { ICategory, IRes, IResponce } from "src/app/shared/shared.interface";

@Injectable({ providedIn: "root" })
export class CardApiService {
  constructor(private http: HttpClient, private alertService: AlertService) {}

  setNewCar(car: ICar): Observable<any> {
    return this.http.post(`${environment.apiUrl}/db/car/`, car).pipe(
      tap(() =>
        this.alertService.showAlert(SAVE_NEW_CAR_TEXT_SUCCESS, SUCCESS)
      ),
      catchError((err) => {
        this.alertService.showAlert(SAVE_CAR_ERROR_TEXT, ERROR);
        return throwError(err);
      })
    );
  }

  getCategory(): Observable<ICategory[]> {
    return this.http
      .get<IRes<ICategory>>(`${environment.apiUrl}/db/category`)
      .pipe(map((res) => res.data));
  }

  deleteNewCar(id: string): Observable<any> {
    return this.http
      .delete(`${environment.apiUrl}/db/car/${id}`)
      .pipe(
        tap(() => this.alertService.showAlert(DELETE_NEW_CAR_TEXT, SUCCESS))
      );
  }

  changeNewCar(id: string, car: ICar): Observable<IResponce<ICarRes>> {
    return this.http
      .put<IResponce<ICarRes>>(`${environment.apiUrl}/db/car/${id}`, car)
      .pipe(
        tap(() => this.alertService.showAlert(CHANGE_NEW_CAR_TEXT, SUCCESS))
      );
  }
}
