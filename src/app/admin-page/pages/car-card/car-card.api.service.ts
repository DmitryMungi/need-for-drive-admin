import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, tap, throwError } from "rxjs";
import { AlertService } from "src/app/shared/components/alert/alert.service";
import { environment } from "src/environments/environment";
import { ICar } from "./car-card.interface";
import {
  ERROR,
  SUCCESS,
  SAVE_NEW_CAR_TEXT_SUCCESS,
  SAVE_CAR_ERROR_TEXT,
} from "src/app/shared/const/const";

export interface ICategory {
  description: string;
  id: string;
  name: string;
}

export interface IRes<T> {
  data: Array<T>;
}

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
}
