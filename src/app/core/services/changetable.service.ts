import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChangetableService {

  constructor(
    private http: HttpClient
  ) { }

  getchangeTable() {
    return this.http.get<any>(environment.apiUrl + '');
  }

  ChangeTableGetAllBySabetId(id) {
    let params = new HttpParams()
      .set('sabetId', id);

    let header = new HttpHeaders();
    header = header.append('content-type', 'application/json');
    header = header.append('Accept', 'application/json');
    header = header.append('Authorization', 'Bearer ' + localStorage.getItem('token'));

    return this.http.post<any>(environment.apiUrl + 'ChangeTable/ChangeTableGetAllBySabetId?sabetId=' + id, { params });
  }
}
