import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParvandehService {

  constructor(
    private http: HttpClient
  ) { }

  getAllparvandeh() {
    let header = new HttpHeaders();
    header = header.append('Authorization', 'Bearer ' + localStorage.getItem('token'));

    return this.http.get<any>(environment.apiUrl + 'Parvandeh/GetAllParvandeh', { headers: header });
  }

  postParvandeh(model): Observable<any> {
    let header = new HttpHeaders();
    header = header.append('content-type', 'application/json');
    header = header.append('Accept', 'application/json');
    header = header.append('Authorization', 'Bearer ' + localStorage.getItem('token'));

    return this.http.post<any>(environment.apiUrl + 'Parvandeh/SaveParvandeh', model, { headers: header });
  }

  putParvandeh(model, id) {
    let header = new HttpHeaders();
    header = header.append('content-type', 'application/json');
    header = header.append('Accept', 'application/json');
    header = header.append('Authorization', 'Bearer ' + localStorage.getItem('token'));

    return this.http.post<any>(environment.apiUrl + '?Id=' + id, model, { headers: header });
  }

  deleteParvandeh(id) {
    let header = new HttpHeaders();
    header = header.append('content-type', 'application/json');
    header = header.append('Accept', 'application/json');
    header = header.append('Authorization', 'Bearer ' + localStorage.getItem('token'));

    return this.http.post<any>(environment.apiUrl + '', id, { headers: header });
  }

  getAllMalekParvandehZone() {
    let header = new HttpHeaders();
    header = header.append('Authorization', 'Bearer ' + localStorage.getItem('token'));

    return this.http.get<any>(environment.apiUrl + 'Parvandeh/GetAllZones', { headers: header });
  }
}
