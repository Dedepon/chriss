import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Present } from "src/app/models/present";
import { PRESENT_LIST_URL } from "./constants";

@Injectable({
  providedIn: "root"
})
export class PresentService {
  constructor(private http: HttpClient) {
  }

  public loadPresents(): Observable<Present[]> {
    return this.http.get<Present[]>(PRESENT_LIST_URL);
  }

  public createPresent(present: Present): Observable<Present> {
    return this.http.post<Present>(PRESENT_LIST_URL, present);
  }

  public updatePresent(present: Present): Observable<Present> {
    return this.http.put<Present>(PRESENT_LIST_URL + "/" + present._id, present);
  }

  public deletePresent(present: Present): Observable<Present> {
    return this.http.delete<Present>(PRESENT_LIST_URL + "/" + present._id);
  }
}