import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HaghighiAddress } from '../models/Haghighi/HaghighiAddress';

@Injectable({
  providedIn: 'root'
})
export class HaghighiService {

  constructor(
    private http: HttpClient
  ) { }

  //-------------------------- شخص حقیقی ----------------------------------- //
  // let header = new HttpHeaders();
  // header = header.append('content-type', 'application/json');
  // header = header.append('Accept', 'application/json');
  // header = header.append('Authorization', 'Bearer ' + localStorage.getItem('token'));

  gethaghighiPersonGetAll() {
    return this.http.get<any>(environment.apiUrl + 'HaghighiPerson/HaghighiPersonGetAll');
  }

  postHaghighiPerson(haghighiperson: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'HaghighiPerson/HaghighiPersonSave', haghighiperson);
  }

  putHaghighiPerson(haghighiperson: any, PersonId: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'HaghighiPerson/HaghighiPersonUpdate?Id=' + PersonId, haghighiperson);
  }

  deleteHaghighiPerson(Id: string) {
    return this.http.post<any>(environment.apiUrl + 'HaghighiPerson/HaghighiPersonDelete', Id);
  }

  IsExistNationalCode(nationalCode: any) {
    let params = new HttpParams()
      .set('nationalCode', nationalCode);

    return this.http.post<any>(environment.apiUrl + 'HaghighiPerson/IsExistNationalCode?nationalCode=' + nationalCode, { params });
  }

  //-------------------------- آدرس شخص حقیقی -------------------------------- //
  getHaghighiPersonAddress(PersonId: any) {
    let params = new HttpParams()
      .set('PersonId', PersonId);

    return this.http.post<any>(environment.apiUrl + 'HaghighiPersonAddress/HaghighiPersonAddressGetByPersonId?PersonId=' + PersonId, { params });
  }

  postHaghighiPersonAddress(register: HaghighiAddress) {
    return this.http.post<any>(environment.apiUrl + 'HaghighiPersonAddress/HaghighiPersonAddressSave', register);
  }

  putHaghighiPersonAddress(haghighipersonaddress: any, Idaddress): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'HaghighiPersonAddress/HaghighiPersonAddressUpdate?Id=' + Idaddress, haghighipersonaddress);
  }

  deleteHaghighiPersonAddress(Id: string) {
    return this.http.post<any>(environment.apiUrl + 'HaghighiPersonAddress/HaghighiPersonAddressDelete', Id);
  }
}
