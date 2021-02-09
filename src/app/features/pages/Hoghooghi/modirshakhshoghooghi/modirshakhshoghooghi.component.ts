import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ModirShakhsHoghooghi } from 'src/app/core/models/Hoghoghi/ModirShakhsHoghooghi';
import { HoghoghiService } from 'src/app/core/services/hoghoghi.service';
import { PublicService } from 'src/app/core/services/public.service';
import { CheckValidation } from 'src/app/shared/variables/validation';

@Component({
  selector: 'app-modirshakhshoghooghi',
  templateUrl: './modirshakhshoghooghi.component.html',
  styleUrls: ['./modirshakhshoghooghi.component.scss']
})
export class ModirshakhshoghooghiComponent implements OnInit {

  checkoutForm: FormGroup;
  checkoutFormDel: FormGroup;

  hideFilter = true;

  modirshakhshoghooghiDialogDelete: boolean;
  hoghooghiAddressDialog: boolean;

  btnUpdate: boolean = false;
  cityProvinces;
  modirShakhsHoghooghis: ModirShakhsHoghooghi[];
  modirShakhsHoghooghi: ModirShakhsHoghooghi;
  selectModirShakhsHoghooghi: ModirShakhsHoghooghi[];
  GetAllCity;
  AllProvince;

  ShenasehMeli;
  ShakhsHoghooghiName;
  ShakhsHoghooghiTypeId;

  ShakhsHaghighiId;
  FirstName;
  FamilyName;

  disabled = true;
  PersonId;
  submitted: boolean;
  validationObj = new CheckValidation();

  StatusNationalCode = true;
  StatusColeMeli: boolean = true;
  fakeCode = ["0000000000", "1111111111", "2222222222", "3333333333", "4444444444", "5555555555", "6666666666", "7777777777", "8888888888", "9999999999"];
  SematModirShakhsHoghooghiType;

  constructor(
    private hoghoghiService: HoghoghiService,
    private publicService: PublicService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.checkoutForm = this.formBuilder.group({

      SematModirShakhsHoghooghiTypeName: [''],
      ShenasehMeli: [''],
      ShakhsHoghooghiName: [''],
      FirstName: [''],
      FamilyName: [''],
      ShakhsHoghooghiTypeId: [''],
      NationalCode: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],

      ShakhsHoghooghiId: [''],
      ShakhsHaghighiId: [''],
      SematModirShakhsHoghooghiTypeId: ['', [Validators.required]],
      DarandehEmzaTahodavarShakhsHoghooghi: [''],
    });
    this.checkoutFormDel = this.formBuilder.group({
      PersonId: ['']
    })
  }

  ngOnInit() {
    this.PersonId = this.route.snapshot.params['PersonId'];
    this.ShenasehMeli = this.route.snapshot.params['ShenasehMeli'];
    this.ShakhsHoghooghiName = this.route.snapshot.params['ShakhsHoghooghiName'];

    const TypeId = this.route.snapshot.params['ShakhsHoghooghiTypeId'];

    // res.Result is null
    this.hoghoghiService.getShakhsHoghooghiTypeIdById(TypeId).subscribe(res =>
      this.ShakhsHoghooghiTypeId = res.Result[0].ShakhsHoghooghiTypeName,
    );

    // GetHaghighiPersonAddress
    this.hoghoghiService.getmodirShakhsHoghooghiGetDataByHoghooghiId(this.PersonId).subscribe(res =>
      this.modirShakhsHoghooghis = res.Result,
    );

    // SemetModirType
    this.hoghoghiService.getSematModirShakhsHoghooghiTypeGetAll().subscribe(res =>
      this.SematModirShakhsHoghooghiType = res.Result,
    );
  }

  getHaghighiPersonData(nationalCode: any) {
    this.ShakhsHaghighiId = null;
    this.FirstName = null;
    this.FamilyName = null;

    this.StatusColeMeli = this.check(nationalCode);
    if (this.StatusColeMeli === true) {
      this.hoghoghiService.getHaghighiPersonDataByNationalCode(nationalCode).subscribe(
        out => {
          if (out.Result.length !== 0) {
            this.ShakhsHaghighiId = out.Result[0].Id;
            this.FirstName = out.Result[0].FirstName;
            this.FamilyName = out.Result[0].FamilyName;
          }
          else {
            this.StatusNationalCode == false;
          }
        }
      );
    }
  }

  filter() {
    if (this.hideFilter === true)
      this.hideFilter = false;
    else
      this.hideFilter = true;
  }

  openNew() {
    this.modirShakhsHoghooghi = {};
    this.submitted = false;
    this.hoghooghiAddressDialog = true;
  }

  editProduct(modirShakhsHoghooghi: ModirShakhsHoghooghi) {
    this.btnUpdate = true;
    this.modirShakhsHoghooghi = { ...modirShakhsHoghooghi };
    this.hoghooghiAddressDialog = true;
  }

  deleteShakhsHaghighi(modirShakhsHoghooghi: ModirShakhsHoghooghi) {
    this.modirShakhsHoghooghi = { ...modirShakhsHoghooghi };
    this.modirshakhshoghooghiDialogDelete = true;
  }

  onSubmitDelete(PersonId) {
    this.modirshakhshoghooghiDialogDelete = true;
    // this.haghighiPersons = this.haghighiPersons.filter(val => val.PersonId !== PersonId);
    this.checkoutFormDel = this.formBuilder.group({
      Id: PersonId,
    });
    let Id = this.checkoutFormDel.value;
    this.hoghoghiService.deleteModirShakhsHoghooghi(Id).subscribe((result) => {
      if (result.Result.Status === 100) {
        this.messageService.add({ severity: 'success', summary: 'حذف شد', detail: 'مدیر شخص حقوقی حذف شد', life: 3000 });
        this.hoghoghiService.getmodirShakhsHoghooghiGetDataByHoghooghiId(this.PersonId).subscribe(res =>
          this.modirShakhsHoghooghis = res.Result,
        );
        this.modirShakhsHoghooghi = {};
      }
      if (result.Result.Status === -100) {
        this.messageService.add({ severity: 'error', summary: 'انجام نشد', detail: result.ErrorMessage, life: 6000 });
      }
    });
    this.modirshakhshoghooghiDialogDelete = false;
  }

  hideDialog() {
    this.hoghooghiAddressDialog = false;
    this.modirshakhshoghooghiDialogDelete = false;
    this.submitted = false;
    this.btnUpdate = false;
  }

  changeBtn() {
    this.btnUpdate = true;
  }

  onSubmit() {
    const user = this.checkoutForm.value;
    if (this.btnUpdate === true)
      this.update_haghighiPerson(user);
    else
      this.add_haghighiPerson(user);
    this.checkoutForm.reset();
  }

  add_haghighiPerson(register: ModirShakhsHoghooghi) {
    register.ShakhsHoghooghiId = this.PersonId;
    register.ShakhsHaghighiId = this.ShakhsHaghighiId;
    this.hoghoghiService.postModirShakhsHoghooghi(register).subscribe((result) => {
      if (result.Result.Status === 100) {
        this.messageService.add({ severity: 'success', summary: 'انجام شد', detail: 'مدیر شخص حقوقی ثبت شد', life: 6000 });
        this.hoghoghiService.getmodirShakhsHoghooghiGetDataByHoghooghiId(this.PersonId).subscribe(res =>
          this.modirShakhsHoghooghis = res.Result,
        );
      }
      if (result.Result.Status === -100) {
        this.messageService.add({ severity: 'error', summary: 'انجام نشد', detail: result.ErrorMessages, life: 6000 });
      }
    }, (err) => {
      console.log(err);
    });
    this.hoghooghiAddressDialog = false;
    this.modirShakhsHoghooghi = {};
  }

  update_haghighiPerson(register: ModirShakhsHoghooghi) {
    register.Id = this.modirShakhsHoghooghi.Id;
    register.ShakhsHoghooghiId = this.modirShakhsHoghooghi.ShakhsHoghooghiId;
    register.ShakhsHaghighiId = this.modirShakhsHoghooghi.ShakhsHaghighiId;
    this.hoghoghiService.putModirShakhsHoghooghi(register, register.Id).subscribe((result) => {
      if (result.Result.Status === 100) {
        this.messageService.add({ severity: 'success', summary: 'انجام شد', detail: 'مدیر شخص حقوقی ویرایش شد', life: 6000 });
        this.hoghoghiService.getmodirShakhsHoghooghiGetDataByHoghooghiId(this.PersonId).subscribe(res =>
          this.modirShakhsHoghooghis = res.Result,
        );
      }
      if (result.Result.Status === -100) {
        this.messageService.add({ severity: 'error', summary: 'انجام نشد', detail: result.ErrorMessages, life: 6000 });
      }
    }, (err) => {
      console.log(err);
    });
    this.hoghooghiAddressDialog = false;
    this.modirShakhsHoghooghi = {};
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
