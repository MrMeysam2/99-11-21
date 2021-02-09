import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'jalali-moment';
import { MessageService, ConfirmationService } from 'primeng/api';
import { SanadRahniGheyrManghol } from 'src/app/core/models/SanadRahniGheyrManghol/SanadRahniGheyrManghol';
import { PublicService } from 'src/app/core/services/public.service';
import { SanadrahnigheyrmangholService } from 'src/app/core/services/sanadrahnigheyrmanghol.service';

@Component({
  selector: 'app-sanadrahnigheyrmanghol',
  templateUrl: './sanadrahnigheyrmanghol.component.html',
  styleUrls: ['./sanadrahnigheyrmanghol.component.scss']
})
export class SanadrahnigheyrmangholComponent implements OnInit {

  checkoutForm: FormGroup;
  checkoutFormDel: FormGroup;

  SanadRahniGheyrMangholDialog: boolean;
  SanadRahniGheyrMangholDialogDelete: boolean;
  SanadRahniGheyrMangholDialogTakhsis: boolean = true;

  btnUpdate: boolean = false;
  btnUpdateTakhsis: boolean = false;

  sanadRahniGheyrManghols: SanadRahniGheyrManghol[];
  sanadRahniGheyrManghol: SanadRahniGheyrManghol;
  selectSanadRahniGheyrManghols: SanadRahniGheyrManghol[];

  disabled = false;
  AllProvince;
  cityProvinces;
  GetAllCity;

  hideFilter = true;
  submitted: boolean;

  shomarehParvandehDarVahedHoghooghi;
  nameParvandeh;

  constructor(
    private sanadrahnigheyrmanghol: SanadrahnigheyrmangholService,
    private publicService: PublicService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.checkoutForm = this.formBuilder.group({
      ShomarehSanadRahni: [''],
      HozehSabtiDaftarkhanehTanzimkonandehId: [''],
      ShomarehDaftarkhanehTanzimkonandeh: [''],
      SanadRahniDate: [''],
      SanadRahniGheyrMangholTypeId: [''],

      MizanArzyabiAvaliyeh: [''],
      MizanAkharinArzyabi: [''],
      MablaghSanadRahni: [''],
      ProvinceCode: [''],
    });
    this.checkoutFormDel = this.formBuilder.group({
      Id: ['']
    });
    
  }

  ngOnInit() {
    // hoghoghiPersonsGetAll
    this.sanadrahnigheyrmanghol.getSanadrahnigheyrmanghol().subscribe(res =>
      this.sanadRahniGheyrManghols = res.Result,
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
    this.sanadRahniGheyrManghol = {};
    this.submitted = false;
    this.SanadRahniGheyrMangholDialog = true;
  }

  // addmodiran(SanadRahniGheyrManghol: any) {
  //   this.router.navigate(['/modirshakhshoghooghi', {
  //     PersonId: SanadRahniGheyrManghol.Id,
  //   }]);
  // }


  takhsis(sanadRahniGheyrManghol: SanadRahniGheyrManghol) {
    console.log(sanadRahniGheyrManghol);
  }

  taghir(sanadRahniGheyrManghol: SanadRahniGheyrManghol) {
    console.log(sanadRahniGheyrManghol);
  }

  edit(sanadRahniGheyrManghol: SanadRahniGheyrManghol) {
    this.cityProvinces = null;
    this.setCity(sanadRahniGheyrManghol.ProvinceCode);
    this.btnUpdate = true;
    this.sanadRahniGheyrManghol = { ...sanadRahniGheyrManghol };
    this.SanadRahniGheyrMangholDialog = true;
  }

  delete(sanadRahniGheyrManghol: SanadRahniGheyrManghol) {
    this.sanadRahniGheyrManghol = { ...sanadRahniGheyrManghol };
    this.SanadRahniGheyrMangholDialogDelete = true;
  }


  onSubmitDelete(sanadRahniGheyrMangholId) {
    this.SanadRahniGheyrMangholDialogDelete = true;
    // this.haghighiPersons = this.haghighiPersons.filter(val => val.PersonId !== PersonId);
    this.checkoutFormDel = this.formBuilder.group({
      Id: sanadRahniGheyrMangholId,
    });
    let Id = this.checkoutFormDel.value;
    this.sanadrahnigheyrmanghol.deleteSanadrahnigheyrmanghol(Id).subscribe((result) => {
      if (result.Result.Status === 100) {
        this.messageService.add({ severity: 'success', summary: 'حذف شد', detail: 'سند رهنی غیر منقول حذف شد', life: 3000 });
        this.sanadrahnigheyrmanghol.getSanadrahnigheyrmanghol().subscribe(res =>
          this.sanadRahniGheyrManghols = res.Result,
        );
        this.sanadRahniGheyrManghol = {};
      }
      if (result.Result.Status === -100) {
        this.messageService.add({ severity: 'error', summary: 'انجام نشد', detail: result.ErrorMessage, life: 6000 });
      }
    });
    this.SanadRahniGheyrMangholDialogDelete = false;
  }

  hideDialog() {
    this.cityProvinces = null;
    this.SanadRahniGheyrMangholDialog = false;
    this.SanadRahniGheyrMangholDialogDelete = false;
    this.submitted = false;
    this.btnUpdate = false;
  }

  changeBtn() {
    this.btnUpdate = true;
  }

  onSubmit() {
    const personForm = this.checkoutForm.value;
    if (this.btnUpdate === true)
      this.update_Sanadrahnigheyrmanghol(personForm);
    else
      this.add_Sanadrahnigheyrmanghol(personForm);
    this.checkoutForm.reset();
  }

  add_Sanadrahnigheyrmanghol(register: SanadRahniGheyrManghol) {
    register.SanadRahniDate = moment(register.SanadRahniDate, 'YYYY-MM-DD').locale('cs').format('YYYY-MM-DD');

    this.sanadrahnigheyrmanghol.postSanadrahnigheyrmanghol(register).subscribe((result) => {
      if (result.Result.Status === 100) {
        this.messageService.add({ severity: 'success', summary: 'انجام شد', detail: 'سند رهنی غیر منقول ثبت شد', life: 6000 });
        this.sanadrahnigheyrmanghol.getSanadrahnigheyrmanghol().subscribe(res =>
          this.sanadRahniGheyrManghols = res.Result,
        );
      }
      if (result.Result.Status === -100) {
        this.messageService.add({ severity: 'error', summary: 'انجام نشد', detail: result.ErrorMessages, life: 6000 });
      }
    }, (err) => {
      console.log(err);
    });
    this.SanadRahniGheyrMangholDialog = false;
    this.sanadRahniGheyrManghol = {};
  }

  update_Sanadrahnigheyrmanghol(register: SanadRahniGheyrManghol) {
    register.Id = this.sanadRahniGheyrManghol.Id;
    register.SanadRahniDate = moment(register.SanadRahniDate, 'YYYY-MM-DD').locale('cs').format('YYYY-MM-DD');

    this.sanadrahnigheyrmanghol.putSanadrahnigheyrmanghol(register, register.Id).subscribe((result) => {
      if (result.Result.Status === 100) {
        this.messageService.add({ severity: 'success', summary: 'انجام شد', detail: 'شخص حقوقی ویرایش شد', life: 6000 });
        this.sanadrahnigheyrmanghol.getSanadrahnigheyrmanghol().subscribe(res =>
          this.sanadRahniGheyrManghols = res.Result,
        );
      }
      if (result.Result.Status === -100) {
        this.messageService.add({ severity: 'error', summary: 'انجام نشد', detail: result.ErrorMessages, life: 6000 });
      }
    }, (err) => {
      console.log(err);
    });
    this.SanadRahniGheyrMangholDialog = false;
    this.sanadRahniGheyrManghol = {};
    this.btnUpdate = false;
  }

}