import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, delay, map, retry, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private timer: Subscription;
  private _user = new BehaviorSubject<any>(null);
  user$: Observable<any> = this._user.asObservable();

  Bearer: string;
  login: boolean;
  constructor(
    private http: HttpClient
  ) { }

  setBearer(value: string) {
    this.Bearer = value;
    this.login = true;
    localStorage.setItem('token', value);

    return true;
  }

  setUsername(Result: string): any {
    localStorage.setItem('usernameSS', Result);
  }

  postLogin(value: any): Observable<any> {
    let header = new HttpHeaders();
    header = header.append('content-type', 'application/json');
    header = header.append('Accept', 'application/json');

    return this.http.post<any>(environment.apiLogin + 'User/LoginTokenBase', value, { headers: header, observe: 'response' });
  }

  private getTokenRemainingTime() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      return 0;
    }
    const jwtToken = JSON.parse(atob(accessToken.split('.')[1]));
    const expires = new Date(jwtToken.exp * 1000);
    return expires.getTime() - Date.now();
  }

  private startTokenTimer() {
    const timeout = this.getTokenRemainingTime();
    this.timer = of(true)
      .pipe(
        delay(timeout),
      )
      .subscribe();
  }

  setLocalStorage(x: any) {
    localStorage.setItem('access_token', x.body.Result.Token);
  }

  clearLocalStorage() {
    localStorage.removeItem('access_token');
  }

}
