import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ICar } from "./card.service";

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
  constructor(private http: HttpClient) {}

  setNewCar(car: ICar): Observable<any> {
    return this.http.post(`${environment.apiUrl}/db/car/`, car);
  }

  getCategory(): Observable<ICategory[]> {
    return this.http
      .get<IRes<ICategory>>(`${environment.apiUrl}/db/category`)
      .pipe(map((res) => res.data));
  }
}
