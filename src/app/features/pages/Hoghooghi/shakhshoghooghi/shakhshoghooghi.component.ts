import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'jalali-moment';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ShakhsHoghooghi } from 'src/app/core/models/Hoghoghi/ShakhsHoghooghi';
import { HoghoghiService } from 'src/app/core/services/hoghoghi.service';
import { PublicService } from 'src/app/core/services/public.service';

@Component({
  selector: 'app-shakhshoghooghi',
  templateUrl: './shakhshoghooghi.component.html',
  styles: [`
  :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`],
  styleUrls: ['./shakhshoghooghi.component.scss']
})
export class ShakhshoghooghiComponent implements OnInit {

  checkoutForm: FormGroup;
  checkoutFormDel: FormGroup;
  ShakhsHoghooghiDialog: boolean;

  ShakhsHoghooghiDialogDelete: boolean;

  btnUpdate: boolean = false;

  shakhsHoghooghis: ShakhsHoghooghi[];
  shakhsHoghooghi: ShakhsHoghooghi;
  selectshakhsHoghooghis: ShakhsHoghooghi[];

  AllShakhsHoghooghiType;
  disabled = true;
  AllProvince;
  cityProvinces;
  GetAllCity;
  hideFilter = true;
  StatusShenasehMeliRepeat: boolean = true;
  submitted: boolean;
  constructor(
    private hoghoghiService: HoghoghiService,
    private publicService: PublicService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.checkoutForm = this.formBuilder.group({
      ShenasehMeli: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      // Validators.pattern(/^-?(0|[1-9]\d*)?$/)
      ShakhsHoghooghiName: ['', [Validators.required]],
      ShakhsHoghooghiTypeId: ['', [Validators.required]],
      SabtDate: [''],
      ShomarehSabt: ['', [Validators.required, Validators.maxLength(20)]],
      MahalSabtCityId: ['', [Validators.required]],
      EghtesadiGhadimCode: ['', [Validators.minLength(12), Validators.maxLength(12)]],
      // Validators.pattern(/^-?(0|[1-9]\d*)?$/)]
      EghtesadiJadidCode: ['', [Validators.minLength(16), Validators.maxLength(16)]],
      // Validators.pattern(/^-?(0|[1-9]\d*)?$/)
      AkharinRooznamehRasmiDate: [''],
      ShomarehMobile: [''],
      CityName: [''],
      ProvinceCode: ['', [Validators.required]],
      CityId: [''],
      // ProvinceName: [''],
    });
    this.checkoutFormDel = this.formBuilder.group({
      Id: ['']
    });
  }

  ngOnInit() {
    // hoghoghiPersonsGetAll
    this.hoghoghiService.getShakhsHoghooghiAllData().subscribe(res =>
      this.shakhsHoghooghis = res.Result,
    );

    // getShakhsHoghooghiType
    this.hoghoghiService.getShakhsHoghooghiTypeId().subscribe(data => {
      this.AllShakhsHoghooghiType = data.Result.sort((a, b) => a.Id - b.Id);
    });

    // getAllProvince
    this.publicService.getAllProvince().subscribe(data => {
      this.AllProvince = data.Result;
    });
    // getAllCity
    this.publicService.getAllCity().subscribe(data => {
      this.GetAllCity = data.Result;
    });
  }

  filter() {
    if (this.hideFilter === true)
      this.hideFilter = false;
    else
      this.hideFilter = true;
  }

  setCity(provinceId: any) {
    this.checkoutForm.patchValue({
      MahalSabtCityId: ''
    });
    this.publicService.getCityByProvinceCode(provinceId).subscribe(data => {
      this.cityProvinces = data.Result;
    });
  }

  openNew() {
    this.checkoutForm.reset({
      MahalSabtCityId: ''
    });
    this.shakhsHoghooghi = {};
    this.submitted = false;
    this.ShakhsHoghooghiDialog = true;
  }

  GetDataByShenasehMeli(shenasehMeli) {

    this.hoghoghiService.GetDataByShenasehMeli(shenasehMeli).subscribe(
      (res) => {
        if (res === false)
          this.StatusShenasehMeliRepeat = true;
        else if (res === true)
          this.StatusShenasehMeliRepeat = false;
      },
      (err) => {
        this.StatusShenasehMeliRepeat = err;
      }
    )
  }

  addmodiran(shakhsHoghooghi: any) {
    this.router.navigate(['/modirshakhshoghooghi', {
      PersonId: shakhsHoghooghi.Id,
      ShenasehMeli: shakhsHoghooghi.ShenasehMeli,
      ShakhsHoghooghiName: shakhsHoghooghi.ShakhsHoghooghiName,
      ShakhsHoghooghiTypeId: shakhsHoghooghi.ShakhsHoghooghiTypeId
    }]);
  }

  addaddress(shakhsHoghooghi: any) {
    this.router.navigate(['/shakhshoghooghiaddress', {
      PersonId: shakhsHoghooghi.Id,
      ShenasehMeli: shakhsHoghooghi.ShenasehMeli,
      ShakhsHoghooghiName: shakhsHoghooghi.ShakhsHoghooghiName,
      ShakhsHoghooghiTypeId: shakhsHoghooghi.ShakhsHoghooghiTypeId
    }]);
  }

  editHoghoghiPersons(shakhsHoghooghi: ShakhsHoghooghi) {
    this.cityProvinces = null;
    this.setCity(shakhsHoghooghi.ProvinceCode);
    this.btnUpdate = true;
    this.shakhsHoghooghi = { ...shakhsHoghooghi };
    this.ShakhsHoghooghiDialog = true;
  }

  deleteShakhsHoghooghi(shakhsHoghooghi: ShakhsHoghooghi) {
    this.shakhsHoghooghi = { ...shakhsHoghooghi };
    this.ShakhsHoghooghiDialogDelete = true;
  }

  onSubmitDelete(hoghoghi) {
    this.ShakhsHoghooghiDialogDelete = true;
    // this.haghighiPersons = this.haghighiPersons.filter(val => val.PersonId !== PersonId);
    this.checkoutFormDel = this.formBuilder.group({
      Id: hoghoghi,
    });
    let Id = this.checkoutFormDel.value;
    this.hoghoghiService.deleteHoghoghiPerson(Id).subscribe((result) => {
      if (result.Result.Status === 100) {
        this.messageService.add({ severity: 'success', summary: 'حذف شد', detail: 'شخص حقوقی حذف شد', life: 3000 });
        this.hoghoghiService.getShakhsHoghooghiAllData().subscribe(res =>
          this.shakhsHoghooghis = res.Result,
        );
        this.shakhsHoghooghi = {};
      }
      if (result.Result.Status === -100) {
        this.messageService.add({ severity: 'error', summary: 'انجام نشد', detail: result.ErrorMessage, life: 6000 });
      }
    });
    this.ShakhsHoghooghiDialogDelete = false;
  }


  hideDialog() {
    this.cityProvinces = null;
    this.ShakhsHoghooghiDialog = false;
    this.ShakhsHoghooghiDialogDelete = false;
    this.submitted = false;
    this.btnUpdate = false;
  }

  changeBtn() {
    this.btnUpdate = true;
  }

  onSubmit() {
    const personForm = this.checkoutForm.value;
    if (this.btnUpdate === true)
      this.update_hoghoghiPerson(personForm);
    else
      this.add_hoghoghiPerson(personForm);
    this.checkoutForm.reset();

  }

  add_hoghoghiPerson(register: ShakhsHoghooghi) {
    register.SabtDate = moment(register.SabtDate, 'YYYY-MM-DD').locale('cs').format('YYYY-MM-DD');
    register.AkharinRooznamehRasmiDate = moment(register.AkharinRooznamehRasmiDate, 'YYYY-MM-DD').locale('cs').format('YYYY-MM-DD');

    this.hoghoghiService.postHoghoghiPerson(register).subscribe((result) => {
      if (result.Result.Status === 100) {
        this.messageService.add({ severity: 'success', summary: 'انجام شد', detail: 'شخص حقوقی ثبت شد', life: 6000 });
        this.hoghoghiService.getShakhsHoghooghiAllData().subscribe(res =>
          this.shakhsHoghooghis = res.Result,
        );
      }
      if (result.Result.Status === -100) {
        this.messageService.add({ severity: 'error', summary: 'انجام نشد', detail: result.ErrorMessages, life: 6000 });
      }
    }, (err) => {
      console.log(err);
    });
    this.ShakhsHoghooghiDialog = false;
    this.shakhsHoghooghi = {};
  }

  update_hoghoghiPerson(register: ShakhsHoghooghi) {
    register.Id = this.shakhsHoghooghi.Id;
    register.SabtDate = moment(register.SabtDate, 'YYYY-MM-DD').locale('cs').format('YYYY-MM-DD');
    register.AkharinRooznamehRasmiDate = moment(register.AkharinRooznamehRasmiDate, 'YYYY-MM-DD').locale('cs').format('YYYY-MM-DD');

    this.hoghoghiService.putHoghoghiPerson(register, register.Id).subscribe((result) => {
      if (result.Result.Status === 100) {
        this.messageService.add({ severity: 'success', summary: 'انجام شد', detail: 'شخص حقوقی ویرایش شد', life: 6000 });
        this.hoghoghiService.getShakhsHoghooghiAllData().subscribe(res =>
          this.shakhsHoghooghis = res.Result,
        );
      }
      if (result.Result.Status === -100) {
        this.messageService.add({ severity: 'error', summary: 'انجام نشد', detail: result.ErrorMessages, life: 6000 });
      }
    }, (err) => {
      console.log(err);
    });
    this.ShakhsHoghooghiDialog = false;
    this.shakhsHoghooghi = {};
    this.btnUpdate = false;
  }

}
