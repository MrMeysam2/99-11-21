import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HoghoghiService {
  constructor(
    private http: HttpClient
  ) { }
  
  // let header = new HttpHeaders();
  // header = header.append('content-type', 'application/json');
  // header = header.append('Accept', 'application/json');
  // header = header.append('Authorization', 'Bearer ' + localStorage.getItem('token'));

  //-------------------------- شخص حقوقی ----------------------------------- //
  getShakhsHoghooghiAllData() {
    return this.http.get<any>(environment.apiUrl + 'ShakhsHoghooghi/Shakhshoghooghigetalldata');
  }

  postHoghoghiPerson(hoghoghiperson: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'ShakhsHoghooghi/ShakhsHoghooghiSave', hoghoghiperson);
  }

  putHoghoghiPerson(hoghoghiperson: any, PersonId: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'ShakhsHoghooghi/ShakhsHoghooghiUpdate?Id=' + PersonId, hoghoghiperson);
  }

  deleteHoghoghiPerson(Id: string) {
    return this.http.post<any>(environment.apiUrl + 'ShakhsHoghooghi/ShakhsHoghooghiDelete', Id);
  }

  getShakhsHoghooghiTypeId() {
    return this.http.get<any>(environment.apiUrl + 'ShakhsHoghooghiType/ShakhsHoghooghiTypeGetAllData');
  }

  GetDataByShenasehMeli(shenasehMeli: any) {
    let params = new HttpParams()
      .set('ShenasehMeli', shenasehMeli);

    return this.http.post<any>(environment.apiUrl + 'ShakhsHoghooghi/GetDataByShenasehMeli?ShenasehMeli=' + shenasehMeli, { params });
  }

  //-------------------------- آدرس شخص حقوقی -------------------------------- //
  getShakhsHoghooghiAddressGetByPersonId(PersonId: any) {
    let params = new HttpParams()
      .set('hoghooghiPersonId', PersonId);

    return this.http.post<any>(environment.apiUrl + 'ShakhsHoghooghiAddress/ShakhsHoghooghiAddressGetByPersonId?hoghooghiPersonId=' + PersonId, { params });
  }

  deleteShakhsHoghooghiAddress(Id: string) {
    return this.http.post<any>(environment.apiUrl + 'ShakhsHoghooghiAddress/ShakhsHoghooghiAddressDelete', Id);
  }

  postShakhsHoghooghiAddress(hoghooghiaddress: any) {
    return this.http.post<any>(environment.apiUrl + 'ShakhsHoghooghiAddress/ShakhsHoghooghiAddressSave', hoghooghiaddress);
  }

  putShakhsHoghooghiAddress(hoghooghiaddress: any, PersonId: any) {
    return this.http.post<any>(environment.apiUrl + 'ShakhsHoghooghiAddress/ShakhsHoghooghiAddressUpdate?Id=' + PersonId, hoghooghiaddress);
  }

  getShakhsHoghooghiTypeIdById(typeId: any) {
    let params = new HttpParams()
      .set('typeid', typeId);

    return this.http.post<any>(environment.apiUrl + 'ShakhsHoghooghiType/ShakhsHoghooghiTypeById?typeid=' + typeId, { params });

  }

  //-------------------------- آدرس شخص حقوقی -------------------------------- //
  getmodirShakhsHoghooghiGetDataByHoghooghiId(PersonId: any) {
    let params = new HttpParams()
      .set('HoghooghiId', PersonId);

    return this.http.post<any>(environment.apiUrl + 'ModirShakhsHoghooghi/modirShakhsHoghooghiGetDataByHoghooghiId?HoghooghiId=' + PersonId, { params });
  }

  deleteModirShakhsHoghooghi(Id: any) {
    return this.http.post<any>(environment.apiUrl + 'ModirShakhsHoghooghi/ModirShakhsHoghooghiDelete', Id);
  }

  postModirShakhsHoghooghi(Modirhoghooghi: any) {
    return this.http.post<any>(environment.apiUrl + 'ModirShakhsHoghooghi/ModirShakhsHoghooghiSave', Modirhoghooghi);
  }

  putModirShakhsHoghooghi(Modirhoghooghi: any, PersonId: any) {
    return this.http.post<any>(environment.apiUrl + 'ModirShakhsHoghooghi/ModirShakhsHoghooghiUpdate?Id=' + PersonId, Modirhoghooghi);
  }

  getSematModirShakhsHoghooghiTypeGetAll() {
    return this.http.get<any>(environment.apiUrl + 'SematModirShakhsHoghooghiType/SematModirShakhsHoghooghiTypeGetAll');
  }

  getHaghighiPersonDataByNationalCode(nationalCode) {
    let params = new HttpParams()
      .set('nationalCode', nationalCode);

    return this.http.post<any>(environment.apiUrl + 'HaghighiPerson/GetShakhseHaghighiByNationalCode?nationalCode=' + nationalCode, { params });
  }


}