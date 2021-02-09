import { identifierModuleUrl } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ChangeTableHaghighi } from 'src/app/core/models/ChangeTable/ChangeTableHaghighi';
import { ChangetableService } from 'src/app/core/services/changetable.service';
import * as moment from 'jalali-moment';
@Component({
  selector: 'app-changetablehaghighi',
  templateUrl: './changetablehaghighi.component.html',
  styleUrls: ['./changetablehaghighi.component.scss']
})
export class ChangetablehaghighiComponent implements OnInit {
  hideFilter = true;
  changeTableDialog: boolean;
  disabled: boolean = true;
  changeTables: ChangeTableHaghighi[];
  changeTable: ChangeTableHaghighi;
  selectchangeTables: ChangeTableHaghighi[];
  sabetGetAll: any;
  selectedSite = 1;
  hiddenPageLoad = true;
  idsabet = 1;

  RecordChangeDateTime;

  MeghdarRecordBeforeChange;
  MeghdarRecordBeforeChangeSplit;

  MeghdarRecordAfterChange;
  MeghdarRecordAfterChangeSplit;

  NationalCodeSplitBefore?: any;
  FirstNameSplitBefore?: any;
  FamilyNameSplitBefore?: any;
  BirthDateSplitBefore?: any;
  BirthDateShamsSplitBefore?: any;
  FatherNameSplitBefore?: any;
  ShomarehShenasnamehSplitBefore?: any;
  ProvinceIdSplitBefore?: any;
  ProvinceNameSplitBefore?: string;
  MahalSodoorShenasnamehIdSplitBefore?: any;
  CityNameSplitBefore?: string;
  SeriShenasnamehSplitBefore?: any;
  SerialShenasnamehSplitBefore?: any;
  ShomarehMobileSplitBefore?: any;

  NationalCodeSplitAfter?: any;
  FirstNameSplitAfter?: any;
  FamilyNameSplitAfter?: any;
  BirthDateSplitAfter?: any;
  BirthDateShamsSplitAfter?: any;
  FatherNameSplitAfter?: any;
  ShomarehShenasnamehSplitAfter?: any;
  ProvinceIdSplitAfter?: any;
  ProvinceNameSplitAfter?: string;
  MahalSodoorShenasnamehIdSplitAfter?: any;
  CityNameSplitAfter?: string;
  SeriShenasnamehSplitAfter?: any;
  SerialShenasnamehSplitAfter?: any;
  ShomarehMobileSplitAfter?: any;

  constructor(
    private changeTableService: ChangetableService,
  ) { }

  ngOnInit(): void {

    // SabetGetAll
    this.changeTableService.ChangeTableGetAllBySabetId(this.idsabet).subscribe(res => {
      this.changeTables = res.Result;
    }
    );
  }

  filter() {
    if (this.hideFilter === true)
      this.hideFilter = false;
    else
      this.hideFilter = true;
  }

  showDialog(changeTable: ChangeTableHaghighi) {
    this.changeTableDialog = true;
    this.changeTable = { ...changeTable };

    this.RecordChangeDateTime = moment(changeTable.RecordChangeDateTime, 'YYYY-MM-DD HH:mm').locale('fa').format('HH:mm YYYY-MM-DD');

    this.MeghdarRecordBeforeChange = changeTable.MeghdarRecordBeforeChange;
    this.MeghdarRecordBeforeChangeSplit = this.MeghdarRecordBeforeChange.split(',');

    this.MeghdarRecordAfterChange = changeTable.MeghdarRecordAfterChange;
    this.MeghdarRecordAfterChangeSplit = this.MeghdarRecordAfterChange.split(',');

    this.NationalCodeSplitBefore = this.MeghdarRecordBeforeChangeSplit[0];
    this.FirstNameSplitBefore = this.MeghdarRecordBeforeChangeSplit[1];
    this.FamilyNameSplitBefore = this.MeghdarRecordBeforeChangeSplit[2];
    this.BirthDateSplitBefore = this.MeghdarRecordBeforeChangeSplit[3];
    this.BirthDateShamsSplitBefore = this.MeghdarRecordBeforeChangeSplit[4];
    this.FatherNameSplitBefore = this.MeghdarRecordBeforeChangeSplit[5];
    this.ShomarehShenasnamehSplitBefore = this.MeghdarRecordBeforeChangeSplit[6];
    this.ProvinceIdSplitBefore = this.MeghdarRecordBeforeChangeSplit[7];
    this.ProvinceNameSplitBefore = this.MeghdarRecordBeforeChangeSplit[8];
    this.MahalSodoorShenasnamehIdSplitBefore = this.MeghdarRecordBeforeChangeSplit[9];
    this.CityNameSplitBefore = this.MeghdarRecordBeforeChangeSplit[10];
    this.SeriShenasnamehSplitBefore = this.MeghdarRecordBeforeChangeSplit[11];
    this.SerialShenasnamehSplitBefore = this.MeghdarRecordBeforeChangeSplit[12];
    this.ShomarehMobileSplitBefore = this.MeghdarRecordBeforeChangeSplit[13];

    this.NationalCodeSplitAfter = this.MeghdarRecordAfterChangeSplit[0];
    this.FirstNameSplitAfter = this.MeghdarRecordAfterChangeSplit[1];
    this.FamilyNameSplitAfter = this.MeghdarRecordAfterChangeSplit[2];
    this.BirthDateSplitAfter = this.MeghdarRecordAfterChangeSplit[3];
    this.BirthDateShamsSplitAfter = this.MeghdarRecordAfterChangeSplit[4];
    this.FatherNameSplitAfter = this.MeghdarRecordAfterChangeSplit[5];
    this.ShomarehShenasnamehSplitAfter = this.MeghdarRecordAfterChangeSplit[6];
    this.ProvinceIdSplitAfter = this.MeghdarRecordAfterChangeSplit[7];
    this.ProvinceNameSplitAfter = this.MeghdarRecordAfterChangeSplit[8];
    this.MahalSodoorShenasnamehIdSplitAfter = this.MeghdarRecordAfterChangeSplit[9];
    this.CityNameSplitAfter = this.MeghdarRecordAfterChangeSplit[10];
    this.SeriShenasnamehSplitAfter = this.MeghdarRecordAfterChangeSplit[11];
    this.SerialShenasnamehSplitAfter = this.MeghdarRecordAfterChangeSplit[12];
    this.ShomarehMobileSplitAfter = this.MeghdarRecordAfterChangeSplit[13];

  }

  hideDialog() {
    this.changeTableDialog = false;
  }

  changetableValue(siteId) {
    this.selectedSite = siteId;
    console.log(this.selectedSite);
  }
}
