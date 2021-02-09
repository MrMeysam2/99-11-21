import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ShakhsHoghooghiAddress } from 'src/app/core/models/Hoghoghi/ShakhsHoghooghiAddress';
import { HoghoghiService } from 'src/app/core/services/hoghoghi.service';
import { PublicService } from 'src/app/core/services/public.service';
import { CheckValidation } from 'src/app/shared/variables/validation';

@Component({
  selector: 'app-shakhshoghooghiaddress',
  templateUrl: './shakhshoghooghiaddress.component.html',
  styleUrls: ['./shakhshoghooghiaddress.component.scss']
})


export class ShakhshoghooghiaddressComponent implements OnInit {

  checkoutForm: FormGroup;
  checkoutFormDel: FormGroup;

  hideFilter = true;

  haghighiDialogDelete: boolean;
  haghighiAddressDialog: boolean;

  btnUpdate: boolean = false;
  cityProvinces;
  shakhshoghooghiaddresss: ShakhsHoghooghiAddress[];
  shakhshoghooghiaddress: ShakhsHoghooghiAddress;
  selectshakhshoghooghiaddress: ShakhsHoghooghiAddress[];
  GetAllCity;
  AllProvince;

  ShenasehMeli;
  ShakhsHoghooghiName;
  ShakhsHoghooghiTypeId;

  disabled = true;
  PersonId;
  submitted: boolean;
  validationObj = new CheckValidation();

  StatusColeMeli: boolean = true;

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
      ShakhsHaghighiId: [''],
      PostalCode: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      // Validators.pattern(/^-?(0|[1-9]\d*)?$/)
      address: ['', [Validators.required, Validators.maxLength(300)]],
      CityName: [''],
      CityId: ['', [Validators.required]],
      ProvinceName: [''],
      ProvinceId: [''],
      ProvinceCode: ['', [Validators.required]],
      ShomarehTelephoneSabet: ['', [Validators.maxLength(50)]]
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
    this.hoghoghiService.getShakhsHoghooghiAddressGetByPersonId(this.PersonId).subscribe(res =>
      this.shakhshoghooghiaddresss = res.Result,
    );

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

  openNew() {
    this.shakhshoghooghiaddress = {};
    this.submitted = false;
    this.haghighiAddressDialog = true;
  }

  editProduct(shakhsHoghooghiAddress: ShakhsHoghooghiAddress) {
    this.cityProvinces = null;
    this.setCity(shakhsHoghooghiAddress.ProvinceCode);
    this.btnUpdate = true;
    this.shakhshoghooghiaddress = { ...shakhsHoghooghiAddress };
    this.haghighiAddressDialog = true;
  }

  deleteShakhsHaghighi(shakhsHoghooghiAddress: ShakhsHoghooghiAddress) {
    this.shakhshoghooghiaddress = { ...shakhsHoghooghiAddress };
    this.haghighiDialogDelete = true;
  }

  onSubmitDelete(PersonId) {
    this.haghighiDialogDelete = true;
    // this.haghighiPersons = this.haghighiPersons.filter(val => val.PersonId !== PersonId);
    this.checkoutFormDel = this.formBuilder.group({
      Id: PersonId,
    });
    let Id = this.checkoutFormDel.value;
    this.hoghoghiService.deleteShakhsHoghooghiAddress(Id).subscribe((result) => {
      if (result.Result.Status === 100) {
        this.messageService.add({ severity: 'success', summary: 'حذف شد', detail: 'آدرس شخص حقوقی حذف شد', life: 3000 });
        this.hoghoghiService.getShakhsHoghooghiAddressGetByPersonId(this.PersonId).subscribe(res =>
          this.shakhshoghooghiaddresss = res.Result,
        );
        this.shakhshoghooghiaddress = {};
      }
      if (result.Result.Status === -100) {
        this.messageService.add({ severity: 'error', summary: 'انجام نشد', detail: result.ErrorMessage, life: 6000 });
      }
    });
    this.haghighiDialogDelete = false;
  }

  hideDialog() {
    this.cityProvinces = null;
    this.haghighiAddressDialog = false;
    this.haghighiDialogDelete = false;
    this.submitted = false;
    this.btnUpdate = false;
  }

  changeBtn() {
    this.btnUpdate = true;
  }

  setCity(provinceId: any) {
    this.publicService.getCityByProvinceCode(provinceId).subscribe(data => {
      this.cityProvinces = data.Result;
    });
  }

  onSubmit() {
    const user = this.checkoutForm.value;
    if (this.btnUpdate === true)
      this.update_haghighiPerson(user);
    else
      this.add_haghighiPerson(user);
    this.checkoutForm.reset();
  }

  add_haghighiPerson(register: ShakhsHoghooghiAddress) {
    register.ShakhsHoghooghiId = this.PersonId;

    if (this.StatusColeMeli === true) {
      this.hoghoghiService.postShakhsHoghooghiAddress(register).subscribe((result) => {
        if (result.Result.Status === 100) {
          this.messageService.add({ severity: 'success', summary: 'انجام شد', detail: 'آدرس شخص حقوقی ثبت شد', life: 6000 });
          this.hoghoghiService.getShakhsHoghooghiAddressGetByPersonId(this.PersonId).subscribe(res =>
            this.shakhshoghooghiaddresss = res.Result,
          );
        }
        if (result.Result.Status === -100) {
          this.messageService.add({ severity: 'error', summary: 'انجام نشد', detail: result.Result.ErrorMessages, life: 6000 });
        }
      }, (err) => {
        console.log(err);
      });
      this.haghighiAddressDialog = false;
      this.shakhshoghooghiaddress = {};
    }
  }

  update_haghighiPerson(register: ShakhsHoghooghiAddress) {
    // console.log(this.haghighiPerson.PersonId);
    register.Id = this.shakhshoghooghiaddress.Id;

    this.hoghoghiService.putShakhsHoghooghiAddress(register, register.Id).subscribe((result) => {
      if (result.Result.Status === 100) {
        this.messageService.add({ severity: 'success', summary: 'انجام شد', detail: 'آدرس شخص حقوقی ویرایش شد', life: 6000 });
        this.hoghoghiService.getShakhsHoghooghiAddressGetByPersonId(this.PersonId).subscribe(res =>
          this.shakhshoghooghiaddresss = res.Result,
        );
      }
      if (result.Result.Status === -100) {
        this.messageService.add({ severity: 'error', summary: 'انجام نشد', detail: result.Result.ErrorMessages, life: 6000 });
      }
    }, (err) => {
      console.log(err);
    });
    this.haghighiAddressDialog = false;
    this.shakhshoghooghiaddress = {};
    this.btnUpdate = false;
  }

}
