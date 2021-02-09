import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  constructor(
    private http: HttpClient
  ) { }

  getAllProvince() {
    let header = new HttpHeaders();
    header = header.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<any>(environment.apiUrl + 'HaghighiPersonAddress/GetAllProvince', { headers: header });
  }

  getCityByProvinceCode(Id: any) {
    let params = new HttpParams()
      .set('Code', Id);

    let header = new HttpHeaders();
    header = header.append('content-type', 'application/json');
    header = header.append('Accept', 'application/json');
    header = header.append('Authorization', 'Bearer ' + localStorage.getItem('token'));

    return this.http.post<any>(environment.apiUrl + 'HaghighiPersonAddress/GetCityByProvinceCode?Code=' + Id, { params }, { headers: header });
  }

  getAllCity() {
    let header = new HttpHeaders();
    header = header.append('Authorization', 'Bearer ' + localStorage.getItem('token'));

    return this.http.get<any>(environment.apiUrl + 'HaghighiPerson/HaghighiPersonGetAllCity', { headers: header });
  }

  getBySabetTypeId(SabetTypeId: any) {
    let params = new HttpParams()
      .set('sabetTypeId', SabetTypeId);

    let header = new HttpHeaders();
    header = header.append('content-type', 'application/json');
    header = header.append('Accept', 'application/json');
    header = header.append('Authorization', 'Bearer ' + localStorage.getItem('token'));

    return this.http.post<any>(environment.apiUrl + 'Sabet/GetDataBySabetId?sabetTypeId=' + SabetTypeId, { params }, { headers: header });
  }
}
