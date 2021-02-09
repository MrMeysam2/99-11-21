import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'jalali-moment';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/core/auth/auth.service';
import { HaghighiPersonModel } from 'src/app/core/models/Haghighi/HaghighiPerson';
import { HaghighiService } from 'src/app/core/services/haghighi.service';
import { PublicService } from 'src/app/core/services/public.service';
import { CheckValidation } from 'src/app/shared/variables/validation';

@Component({
  selector: 'app-shakhshaghighi',
  templateUrl: './shakhshaghighi.component.html',
  styleUrls: ['./shakhshaghighi.component.scss']
})
export class ShakhshaghighiComponent implements OnInit {

  checkoutForm: FormGroup;
  checkoutFormDel: FormGroup;
  haghighiDialog: boolean;

  hideFilter = true;

  haghighiDialogDelete: boolean;

  btnUpdate: boolean = false;

  haghighiPersons: HaghighiPersonModel[];
  haghighiPerson: HaghighiPersonModel;
  selecthaghighiPersons: HaghighiPersonModel[];
  AllProvince;
  cityProvinces;
  GetAllCity;
  disabled = true;
  submitted: boolean;
  validationObj = new CheckValidation();
  StatusColeMeli: boolean = true;
  StatusColeMeliRepeat: boolean = true;

  fakeCode = ["0000000000", "1111111111", "2222222222", "3333333333", "4444444444", "5555555555", "6666666666", "7777777777", "8888888888", "9999999999", "0123456789"];

  constructor(
    private haghighiService: HaghighiService,
    private publicService: PublicService,
    private authService: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.checkoutForm = this.formBuilder.group({
      NationalCode: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      // Validators.pattern(/^-?(0|[1-9]\d*)?$/)]
      FirstName: ['', [Validators.required, Validators.maxLength(40)]],
      FamilyName: ['', [Validators.required, Validators.maxLength(40)]],
      BirthDate: ['', [Validators.required]],
      FatherName: ['', [Validators.required, Validators.maxLength(40)]],
      ShomarehShenasnameh: ['', [Validators.required, Validators.maxLength(20)]],
      MahalSodoorShenasnamehId: ['', [Validators.required]],
      SeriShenasnameh: ['', [Validators.required, Validators.maxLength(15)]],
      SerialShenasnameh: ['', [Validators.required, Validators.maxLength(20)]],
      ShomarehMobile: ['', Validators.maxLength(50)],

      CityId: [''],
      ProvinceId: [''],
      ProvinceCode: ['', [Validators.required]]

    });
    this.checkoutFormDel = this.formBuilder.group({
      PersonId: ['']
    })
  }

  ngOnInit() {

    // HaghighiPersonGetAll
    this.haghighiService.gethaghighiPersonGetAll().subscribe(res => {
      this.haghighiPersons = res.Result;
    });

    // HaghighiPersonGetAllCity
    this.publicService.getAllCity().subscribe(data => {
      this.GetAllCity = data.Result;
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

  redirectLogin() {
    this.router.navigate(['login']);
  }

  filter() {
    if (this.hideFilter === true)
      this.hideFilter = false;
    else
      this.hideFilter = true;
  }

  setCity(provinceId: any) {
    this.checkoutForm.patchValue({
      CityId: ''
    });
    this.publicService.getCityByProvinceCode(provinceId).subscribe(data => {
      this.cityProvinces = data.Result;
    },
      (err) => {
        if (err.status === 401)
          this.router.navigate(['login']);
      }
    );
  }

  addaddress(haghighiPerson: any) {
    this.router.navigate(['/shakhshaghighiaddress', {
      PersonId: haghighiPerson.PersonId,
      NationalCode: haghighiPerson.NationalCode,
      FirstName: haghighiPerson.FirstName,
      FamilyName: haghighiPerson.FamilyName
    }]);
  }

  openNew() {
    this.haghighiPerson = {};
    this.submitted = false;
    this.haghighiDialog = true;
  }

  editProduct(haghighiPerson: HaghighiPersonModel) {
    this.cityProvinces = null;
    this.setCity(haghighiPerson.ProvinceCode);
    this.btnUpdate = true;
    this.haghighiPerson = { ...haghighiPerson };
    this.haghighiDialog = true;
  }

  deleteHaghighiPersons(PersonId) {
    this.confirmationService.confirm({
      message: 'در صورت حذف، شخص حقیقی به طور کامل از سامانه حقوقی حذف می گردد و قابل بازیابی نمی باشد.',
      // message: 'Are you sure you want to delete ' + haghighiPersonModel.name + '?',
      header: 'حذف',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.haghighiPersons = this.haghighiPersons.filter(val => val.PersonId !== PersonId.PersonId);
        this.checkoutFormDel = this.formBuilder.group({
          Id: PersonId.PersonId,
        });
        let Id = this.checkoutFormDel.value;
        this.haghighiService.deleteHaghighiPerson(Id).subscribe(res => res);
        this.haghighiPerson = {};
        this.messageService.add({ severity: 'success', summary: 'حذف شد', detail: 'شخص حقیقی حذف شد', life: 3000 });
      }
    });
  }
  deleteShakhsHaghighi(haghighiPerson: HaghighiPersonModel) {
    this.haghighiPerson = { ...haghighiPerson };
    this.haghighiDialogDelete = true;
  }

  onSubmitDelete(PersonId) {
    this.haghighiDialogDelete = true;
    // this.haghighiPersons = this.haghighiPersons.filter(val => val.PersonId !== PersonId);
    this.checkoutFormDel = this.formBuilder.group({
      Id: PersonId,
    });
    let Id = this.checkoutFormDel.value;
    this.haghighiService.deleteHaghighiPerson(Id).subscribe((result) => {
      if (result.Result.Status === 100) {
        this.messageService.add({ severity: 'success', summary: 'حذف شد', detail: 'شخص حقیقی حذف شد', life: 55000 });
        this.haghighiService.gethaghighiPersonGetAll().subscribe(res =>
          this.haghighiPersons = res.Result,
        );
        this.haghighiPerson = {};
      }
      if (result.Result.Status === -100) {
        this.messageService.add({ severity: 'error', summary: 'انجام نشد', detail: result.ErrorMessage, life: 55000 });
      }
    });
    this.haghighiDialogDelete = false;
  }

  hideDialog() {
    this.cityProvinces = null;
    this.haghighiDialog = false;
    this.haghighiDialogDelete = false;
    this.submitted = false;
    this.btnUpdate = false;
  }

  changeBtn() {
    this.btnUpdate = true;
  }

  IsExistNationalCode(nationalCode) {
    this.StatusColeMeli = true;
    this.StatusColeMeliRepeat = true;

    this.StatusColeMeli = this.check(nationalCode);
    if (this.StatusColeMeli == true) {
      this.haghighiService.IsExistNationalCode(nationalCode).subscribe(
        (res) => {
          if (res === false)
            this.StatusColeMeliRepeat = true;
          else if (res === true)
            this.StatusColeMeliRepeat = false;
        },
        (err) => {
          this.StatusColeMeliRepeat = err;
        }
      )
    }
  }

  onSubmit(event: Event) {
    const user = this.checkoutForm.value;
    this.StatusColeMeli = this.check(user.NationalCode);

    if (this.btnUpdate === true)
      this.update_haghighiPerson(user);
    else
      this.add_haghighiPerson(user);
    this.checkoutForm.reset();
  }

  add_haghighiPerson(register: HaghighiPersonModel) {
    register.BirthDate = moment(register.BirthDate, 'YYYY-MM-DD').locale('cs').format('YYYY-MM-DD');
    if (this.StatusColeMeli === true) {
      this.haghighiService.postHaghighiPerson(register).subscribe((result) => {
        if (result.Result.Status === 100) {
          this.messageService.add({ severity: 'success', summary: 'انجام شد', detail: 'شخص حقیقی ثبت شد', life: 6000 });
          this.haghighiService.gethaghighiPersonGetAll().subscribe(res =>
            this.haghighiPersons = res.Result,
          );
        }
        if (result.Result.Status === -100) {
          this.messageService.add({ severity: 'error', summary: 'انجام نشد', detail: result.ErrorMessages, life: 6000 });
        }
      });
      this.haghighiDialog = false;
      this.haghighiPerson = {};
    }
  }

  update_haghighiPerson(register: HaghighiPersonModel) {
    register.PersonId = this.haghighiPerson.PersonId;
    register.BirthDate = moment(register.BirthDate, 'YYYY-MM-DD').locale('cs').format('YYYY-MM-DD');

    if (this.StatusColeMeli === true) {
      this.haghighiService.putHaghighiPerson(register, register.PersonId).subscribe((result) => {
        if (result.Result.Status === 100) {
          this.messageService.add({ severity: 'success', summary: 'انجام شد', detail: 'شخص حقیقی ویرایش شد', life: 6000 });
          this.haghighiService.gethaghighiPersonGetAll().subscribe(res =>
            this.haghighiPersons = res.Result,
          );
        }
        if (result.Result.Status === -100) {
          this.messageService.add({ severity: 'error', summary: 'انجام نشد', detail: result.ErrorMessages, life: 6000 });
        }
      });
    }
    this.haghighiDialog = false;
    this.haghighiPerson = {};
    this.btnUpdate = false;
  }

  check(codeMeli) {
    let Arr = Array.from(codeMeli)
    if (this.fakeCode.some(e => e == codeMeli)) {
      return false
    } else if (Arr.length != 10) {
      return false
    } else {
      let Sum = 0;
      let Last;

      for (let i = 0; i < 9; i++) {
        Sum += +Arr[i] * (10 - i)
      }
      let divideRemaining = Sum % 11;
      if (divideRemaining < 2) {
        Last = divideRemaining;
      } else {
        Last = 11 - (divideRemaining);
      }
      let n = Arr[9];
      return Last == n
    }
  }
}