import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'process';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SanadrahnigheyrmangholService {

  constructor(
    private http: HttpClient
  ) { }

  getSanadrahnigheyrmanghol() {
    return this.http.get<any>(environment.apiUrl + '');
  }
  deleteSanadrahnigheyrmanghol(Id) {
    return this.http.post<any>(environment.apiUrl + '', Id);
  }
  postSanadrahnigheyrmanghol(val) {
    return this.http.post<any>(environment.apiUrl + '', val);
  }
  putSanadrahnigheyrmanghol(val, Id) {
    return this.http.post<any>(environment.apiUrl + '' + Id, val);
  }
}
