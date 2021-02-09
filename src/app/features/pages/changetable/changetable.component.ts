import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ChangeTableHaghighi } from 'src/app/core/models/ChangeTable/ChangeTableHaghighi';
import { SabetGetAll } from 'src/app/core/models/ChangeTable/SabetGetAll';
import { ChangetableService } from 'src/app/core/services/changetable.service';
import { PublicService } from 'src/app/core/services/public.service';

@Component({
  selector: 'app-changetable',
  templateUrl: './changetable.component.html',
  styleUrls: ['./changetable.component.scss']
})

export class ChangetableComponent implements OnInit {
  hideFilter = true;

  sabetGetAll: SabetGetAll;

  changeTableDialog: boolean;
  disabled: boolean = true;

  selectedSite = 1;

  SabetTypeId = 1;

  hiddenPageLoad = true;
  hiddenFilter = true;
  constructor(
    private changeTableService: ChangetableService,
    private publicService: PublicService
  ) {
  }

  ngOnInit(): void {
    
    this.publicService.getBySabetTypeId(this.SabetTypeId).subscribe(res =>
      this.sabetGetAll = res.Result
    );
  }

  enableFilter() {
    this.hiddenFilter = false;
  }

  filter() {
    if (this.hideFilter === true)
      this.hideFilter = false;
    else
      this.hideFilter = true;
  }

  changetableValue(siteId) {
    this.hiddenFilter = false;
    this.selectedSite = siteId;
  }

}
