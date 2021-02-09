import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HaghighiAddress } from 'src/app/core/models/Haghighi/HaghighiAddress';
import { HaghighiService } from 'src/app/core/services/haghighi.service';
import { PublicService } from 'src/app/core/services/public.service';
import { CheckValidation } from 'src/app/shared/variables/validation';

@Component({
  selector: 'app-shakhshaghighiaddress',
  templateUrl: './shakhshaghighiaddress.component.html',
  styleUrls: ['./shakhshaghighiaddress.component.scss']
})
export class ShakhshaghighiaddressComponent implements OnInit {

  checkoutForm: FormGroup;
  checkoutFormDel: FormGroup;

  hideFilter = true;

  haghighiDialogDelete: boolean;
  haghighiAddressDialog: boolean;

  btnUpdate: boolean = false;
  cityProvinces;
  haghighiaddresss: HaghighiAddress[];
  haghighiaddress: HaghighiAddress;
  selecthaghighiaddresss: HaghighiAddress[];
  GetAllCity;
  AllProvince;
  disabled = true;
  PersonId;
  NationalCode;
  FirstName;
  FamilyName;
  dsd;
  submitted: boolean;
  validationObj = new CheckValidation();

  StatusColeMeli: boolean = true;

  constructor(
    private haghighiService: HaghighiService,
    private publicService: PublicService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.checkoutForm = this.formBuilder.group({
      ShakhsHaghighiId: [''],
      PostalCode: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      // Validators.pattern(/^-?(0|[1-9]\d*)?$/)]
      Address: ['', [Validators.required, Validators.maxLength(300)]],
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
    this.NationalCode = this.route.snapshot.params['NationalCode'];
    this.FirstName = this.route.snapshot.params['FirstName'];
    this.FamilyName = this.route.snapshot.params['FamilyName'];

    // GetHaghighiPersonAddress
    this.haghighiService.getHaghighiPersonAddress(this.PersonId).subscribe(res =>
      this.haghighiaddresss = res.Result,
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
    this.haghighiaddress = {};
    this.submitted = false;
    this.haghighiAddressDialog = true;
  }

  editProduct(haghighiAddress: HaghighiAddress) {
    this.cityProvinces = null;
    this.setCity(haghighiAddress.ProvinceCode);
    this.btnUpdate = true;
    this.haghighiaddress = { ...haghighiAddress };
    this.haghighiAddressDialog = true;
  }

  // deleteHaghighiPersons(PersonId) {
  //   this.confirmationService.confirm({
  //     message: 'در صورت حذف، شخص حقیقی به طور کامل از سامانه حقوقی حذف می گردد و قابل بازیابی نمی باشد.',
  //     // message: 'Are you sure you want to delete ' + HaghighiAddress.name + '?',
  //     header: 'حذف',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.haghighiPersons = this.haghighiPersons.filter(val => val.PersonId !== PersonId.PersonId);
  //       this.checkoutFormDel = this.formBuilder.group({
  //         Id: PersonId.PersonId,
  //       });
  //       let Id = this.checkoutFormDel.value;
  //       this.haghighiService.deleteHaghighiPerson(Id).subscribe(res => res);
  //       this.haghighiPerson = {};
  //       this.messageService.add({ severity: 'success', summary: 'حذف شد', detail: 'شخص حقیقی حذف شد', life: 3000 });
  //     }
  //   });
  // }

  deleteShakhsHaghighi(haghighiaddress: HaghighiAddress) {
    this.haghighiaddress = { ...haghighiaddress };
    this.haghighiDialogDelete = true;
  }

  onSubmitDelete(PersonId) {
    this.haghighiDialogDelete = true;
    // this.haghighiPersons = this.haghighiPersons.filter(val => val.PersonId !== PersonId);
    this.checkoutFormDel = this.formBuilder.group({
      Id: PersonId,
    });
    let Id = this.checkoutFormDel.value;
    this.haghighiService.deleteHaghighiPersonAddress(Id).subscribe((result) => {
      if (result.Result.Status === 100) {
        this.messageService.add({ severity: 'success', summary: 'حذف شد', detail: 'آدرس شخص حقیقی حذف شد', life: 3000 });
        this.haghighiService.getHaghighiPersonAddress(this.PersonId).subscribe(res =>
          this.haghighiaddresss = res.Result,
        );
        this.haghighiaddress = {};
      }
      if (result.Result.Status === -100) {
        this.messageService.add({ severity: 'error', summary: 'انجام نشد', detail: result.ErrorMessage, life: 6000 });
      }
    });
    this.haghighiDialogDelete = false;
    this.checkoutFormDel.reset();
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
    this.checkoutForm.patchValue({
      CityId: ''
    });
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

  add_haghighiPerson(register: HaghighiAddress) {
    register.ShakhsHaghighiId = this.PersonId;

    if (this.StatusColeMeli === true) {
      this.haghighiService.postHaghighiPersonAddress(register).subscribe((result) => {
        if (result.Result.Status === 100) {
          this.messageService.add({ severity: 'success', summary: 'انجام شد', detail: 'آدرس شخص حقیقی ثبت شد', life: 6000 });
          this.haghighiService.getHaghighiPersonAddress(this.PersonId).subscribe(res =>
            this.haghighiaddresss = res.Result,
          );
        }
        if (result.Result.Status === -100) {
          this.messageService.add({ severity: 'error', summary: 'انجام نشد', detail: result.Result.ErrorMessages, life: 6000 });
        }
      }, (err) => {
        console.log(err);
      });
      this.haghighiAddressDialog = false;
      this.haghighiaddress = {};
    }
  }

  update_haghighiPerson(register: HaghighiAddress) {
    register.Id = this.haghighiaddress.Id;
    // this.publicService.getCityByProvinceCode(102).subscribe(data => {
    //   this.cityProvinces = data.Result;
    // });
    // console.log(this.cityProvinces);
    this.haghighiService.putHaghighiPersonAddress(register, register.Id).subscribe((result) => {
      if (result.Result.Status === 100) {
        this.messageService.add({ severity: 'success', summary: 'انجام شد', detail: 'آدرس شخص حقیقی ویرایش شد', life: 6000 });
        this.haghighiService.getHaghighiPersonAddress(this.PersonId).subscribe(res =>
          this.haghighiaddresss = res.Result,
        );
      }
      if (result.Result.Status === -100) {
        this.messageService.add({ severity: 'error', summary: 'انجام نشد', detail: result.Result.ErrorMessages, life: 6000 });
      }
    }, (err) => {
      console.log(err);
    });
    this.haghighiAddressDialog = false;
    this.haghighiaddress = {};
    this.btnUpdate = false;
  }
}
