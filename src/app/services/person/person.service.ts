import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { GLOBAL } from "src/app/constants";
import { Person } from "src/app/models/person";
import { PERSON_LIST_URL } from "./constants";

@Injectable({
  providedIn: "root",
})
export class PersonService {
  constructor(private http: HttpClient) {}

  public login(userId: string, password: string): Observable<Person> {
    return this.http
      .post<Person>(PERSON_LIST_URL + "/login", { userId, password })
      .pipe(
        tap((p: Person) => {
          if (p && p.userId) {
            GLOBAL.LOGGED_IN = true;
          }
        })
      );
  }

  public register(userId: string, password: string): Observable<Person> {
    return this.http.post<Person>(PERSON_LIST_URL + "/register", { password, userId }).pipe(
      tap((p: Person) => {
        if (p && p.userId) {
          GLOBAL.LOGGED_IN = true;
        }
      })
    );
  }

  public updateAddress(person: Partial<Person>): Observable<Person> {
    return this.http.put<Person>(PERSON_LIST_URL, person);
  }

  public getPerson(): Observable<Person> {
    return this.http.get<Person>(PERSON_LIST_URL);
  }

  public logout(): Observable<void> {
    return this.http.post<void>(PERSON_LIST_URL + "/logout", {}).pipe(tap(() => GLOBAL.LOGGED_IN = false));
  }
}
