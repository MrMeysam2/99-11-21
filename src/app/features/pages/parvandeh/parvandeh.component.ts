import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ParvandehModel } from 'src/app/core/models/Parvandeh/Parvandeh';
import { ParvandehService } from 'src/app/core/services/parvandeh.service';
import { PublicService } from 'src/app/core/services/public.service';

@Component({
  selector: 'app-parvandeh',
  templateUrl: './parvandeh.component.html',
  styleUrls: ['./parvandeh.component.scss']
})
export class ParvandehComponent implements OnInit {

  checkoutForm: FormGroup;
  checkoutFormDel: FormGroup;
  parvandehDialog: boolean;

  hideFilter = true;
  parvandehDialogDelete: boolean;
  btnUpdate: boolean = false;



  parvandehs: ParvandehModel[];
  parvandeh: ParvandehModel;
  selectparvandehs: ParvandehModel[];

  getMalekParvandehZone;

  edarehDaaviMalekParvandehAst;
  parvandehLahYaAlayhMoasesehNoor;
  getmanshaParvandehType;
  tashilatiYaGheyrTashilati;

  ZoneCode;
  disabled = true;
  submitted: boolean;

  constructor(
    private parvandehService: ParvandehService,
    private publicService: PublicService,
    private authService: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.checkoutForm = this.formBuilder.group({
      ShomarehParvandehDarVahedHoghooghi: [''],
      ShomarehRadifParvandehDarVahedHoghooghi: [''],
      TashkilParvandehDarVahedHoghooghiDate: [''],
      EdarehDaaviMalekParvandehAstId: [''],
      MalekParvandehZoneId: [''],
      ParvandehName: [''],
      ParvandehLahYaAlayhMoasesehNoorId: [''],
      ManshaParvandehTypeId: [''],
      TashilatiYaGheyrTashilatiId: [''],
      TashkilParvandehTashilatiDate: [''],
      Tozihat: [''],
      ZoneCode: [''],
    });

    this.checkoutFormDel = this.formBuilder.group({
      Id: ['']
    })
  }

  ngOnInit() {

    // GetAllParvandeh
    this.parvandehService.getAllparvandeh().subscribe(res => {
      this.parvandehs = res.Result;
    });

    // EdarehDaaviMalekParvandehAst
    this.publicService.getBySabetTypeId(9).subscribe(res => {
      this.edarehDaaviMalekParvandehAst = res.Result;
    });

    // ParvandehLahYaAlayhMoasesehNoor
    this.publicService.getBySabetTypeId(10).subscribe(res => {
      this.parvandehLahYaAlayhMoasesehNoor = res.Result;
    });

    // TashilatiYaGheyrTashilati
    this.publicService.getBySabetTypeId(11).subscribe(res => {
      this.getmanshaParvandehType = res.Result;
    });

    // TashilatiYaGheyrTashilati
    this.publicService.getBySabetTypeId(12).subscribe(res => {
      this.tashilatiYaGheyrTashilati = res.Result;
    });

    this.parvandehService.getAllMalekParvandehZone().subscribe(res => {
      this.getMalekParvandehZone = res.Result;
    },
      (err) => {
        if (err.status === 401)
          this.redirectLogin();
      }
    );

  }
  
  setCodeMalek(val) {
    this.ZoneCode = null;
    const c = this.getMalekParvandehZone.find(x => x.Id == val);
    this.ZoneCode = c.Code;
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

  openNew() {
    this.parvandeh = {};
    this.submitted = false;
    this.parvandehDialog = true;
  }

  editProduct(parvandeh: ParvandehModel) {
    this.btnUpdate = true;
    this.parvandeh = { ...parvandeh };
    this.parvandehDialog = true;
  }

  deleteParvandeh(parvandeh: ParvandehModel) {
    this.parvandeh = { ...parvandeh };
    this.parvandehDialogDelete = true;
  }

  onSubmitDelete(val) {
    this.parvandehDialogDelete = true;

    this.checkoutFormDel = this.formBuilder.group({
      Id: val,
    });
    let Id = this.checkoutFormDel.value;
    this.parvandehService.deleteParvandeh(Id).subscribe((result) => {
      if (result.Result.Status === 100) {
        this.messageService.add({ severity: 'success', summary: 'حذف شد', detail: 'شخص حقیقی حذف شد', life: 55000 });
        this.parvandehService.getAllparvandeh().subscribe(res =>
          this.parvandehs = res.Result,
        );
        this.parvandeh = {};
      }
      if (result.Result.Status === -100) {
        this.messageService.add({ severity: 'error', summary: 'انجام نشد', detail: result.ErrorMessage, life: 55000 });
      }
    });
    this.parvandehDialogDelete = false;
  }


  hideDialog() {
    this.parvandehDialog = false;
    this.parvandehDialogDelete = false;
    this.submitted = false;
    this.btnUpdate = false;
  }

  changeBtn() {
    this.btnUpdate = true;
  }

  onSubmit(event: Event) {
    const user = this.checkoutForm.value;
    if (this.btnUpdate === true)
      this.update_Parvandeh(user);
    else
      this.add_Parvandeh(user);
    this.checkoutForm.reset();
  }

  add_Parvandeh(parvandeh: ParvandehModel) {
    this.parvandehService.postParvandeh(parvandeh).subscribe((result) => {
      if (result.Result.Status === 100) {
        this.messageService.add({ severity: 'success', summary: 'انجام شد', detail: 'شخص حقیقی ثبت شد', life: 6000 });
        this.parvandehService.getAllparvandeh().subscribe(res =>
          this.parvandehs = res.Result,
        );
      }
      if (result.Result.Status === -100) {
        this.messageService.add({ severity: 'error', summary: 'انجام نشد', detail: result.ErrorMessages, life: 6000 });
      }
    }, (err) => {
      console.log(err);
    });
    this.parvandehDialog = false;
    this.parvandeh = {};
  }

  update_Parvandeh(parvandeh: ParvandehModel) {
    parvandeh.Id = this.parvandeh.Id;
    this.parvandehService.putParvandeh(parvandeh, parvandeh.Id).subscribe((result) => {
      if (result.Result.Status === 100) {
        this.messageService.add({ severity: 'success', summary: 'انجام شد', detail: 'شخص حقیقی ویرایش شد', life: 6000 });
        this.parvandehService.getAllparvandeh().subscribe(res =>
          this.parvandehs = res.Result,
        );
      }
      if (result.Result.Status === -100) {
        this.messageService.add({ severity: 'error', summary: 'انجام نشد', detail: result.ErrorMessages, life: 6000 });
      }
    }, (err) => {
      console.log(err);
    });
    this.parvandehDialog = false;
    this.parvandeh = {};
    this.btnUpdate = false;
  }

}
