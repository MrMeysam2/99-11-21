import { Component, OnInit } from '@angular/core';
import * as moment from 'jalali-moment';
import { ChangeTableHoghooghi } from 'src/app/core/models/ChangeTable/ChangeTableHoghooghi';
import { ChangetableService } from 'src/app/core/services/changetable.service';

@Component({
  selector: 'app-changetablehoghooghi',
  templateUrl: './changetablehoghooghi.component.html',
  styleUrls: ['./changetablehoghooghi.component.scss']
})
export class ChangetablehoghooghiComponent implements OnInit {

  hideFilter = true;
  changeTableDialog: boolean;
  disabled: boolean = true;
  changeTables: ChangeTableHoghooghi[];
  changeTable: ChangeTableHoghooghi;
  selectchangeTables: ChangeTableHoghooghi[];
  sabetGetAll: any;
  selectedSite = 2;
  hiddenPageLoad = true;
  idsabet = 2;

  RecordChangeDateTime;

  MeghdarRecordBeforeChange;
  MeghdarRecordBeforeChangeSplit;

  MeghdarRecordAfterChange;
  MeghdarRecordAfterChangeSplit;

  ShenasehMeliSplitBefore?: any;
  ShakhsHoghooghiNameSplitBefore?: any;
  ShakhsHoghooghiTypeIdSplitBefore?: any;
  ShakhsHoghooghiTypeSplitBefore?: any;
  EghtesadiJadidCodeSplitBefore?: any;
  SabtDateSplitBefore?: any;
  SabtDateJalaliSplitBefore?: any;
  ShomarehSabtSplitBefore?: any;
  MahalSabtCityIdSplitBefore?: string;
  CityNameSplitBefore?: any;
  ProvinceIdSplitBefore?: string;
  ProvinceNameSplitBefore?: any;
  EghtesadiGhadimCodeSplitBefore?: any;
  AkharinRooznamehRasmiDateSplitBefore?: any;
  AkharinRooznamehRasmiDateJalliSplitBefore?: any;
  ShomarehMobileSplitBefore?: any;

  ShenasehMeliSplitAfter?: any;
  ShakhsHoghooghiNameSplitAfter?: any;
  ShakhsHoghooghiTypeIdSplitAfter?: any;
  ShakhsHoghooghiTypeSplitAfter?: any;
  EghtesadiJadidCodeSplitAfter?: any;
  SabtDateSplitAfter?: any;
  SabtDateJalaliSplitAfter?: any;
  ShomarehSabtSplitAfter?: any;
  MahalSabtCityIdSplitAfter?: string;
  CityNameSplitAfter?: any;
  ProvinceIdSplitAfter?: string;
  ProvinceNameSplitAfter?: any;
  EghtesadiGhadimCodeSplitAfter?: any;
  AkharinRooznamehRasmiDateSplitAfter?: any;
  AkharinRooznamehRasmiDateJalliSplitAfter?: any;
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

  showDialog(changeTable: ChangeTableHoghooghi) {
    this.changeTableDialog = true;
    this.changeTable = { ...changeTable };

    this.RecordChangeDateTime = moment(changeTable.RecordChangeDateTime, 'YYYY-MM-DD HH:mm').locale('fa').format('HH:mm YYYY-MM-DD');

    this.MeghdarRecordBeforeChange = changeTable.MeghdarRecordBeforeChange;
    this.MeghdarRecordBeforeChangeSplit = this.MeghdarRecordBeforeChange.split(',');

    this.MeghdarRecordAfterChange = changeTable.MeghdarRecordAfterChange;
    this.MeghdarRecordAfterChangeSplit = this.MeghdarRecordAfterChange.split(',');

    this.ShenasehMeliSplitBefore = this.MeghdarRecordBeforeChangeSplit[0];
    this.ShakhsHoghooghiNameSplitBefore = this.MeghdarRecordBeforeChangeSplit[1];
    this.ShakhsHoghooghiTypeIdSplitBefore = this.MeghdarRecordBeforeChangeSplit[2];
    this.ShakhsHoghooghiTypeSplitBefore = this.MeghdarRecordBeforeChangeSplit[3];
    this.EghtesadiJadidCodeSplitBefore = this.MeghdarRecordBeforeChangeSplit[4];
    this.SabtDateSplitBefore = this.MeghdarRecordBeforeChangeSplit[5];
    this.SabtDateJalaliSplitBefore = this.MeghdarRecordBeforeChangeSplit[6];
    this.ShomarehSabtSplitBefore = this.MeghdarRecordBeforeChangeSplit[7];
    this.MahalSabtCityIdSplitBefore = this.MeghdarRecordBeforeChangeSplit[8];
    this.CityNameSplitBefore = this.MeghdarRecordBeforeChangeSplit[9];
    this.ProvinceIdSplitBefore = this.MeghdarRecordBeforeChangeSplit[10];
    this.ProvinceNameSplitBefore = this.MeghdarRecordBeforeChangeSplit[11];
    this.EghtesadiGhadimCodeSplitBefore = this.MeghdarRecordBeforeChangeSplit[12];
    this.AkharinRooznamehRasmiDateSplitBefore = this.MeghdarRecordBeforeChangeSplit[13];
    this.AkharinRooznamehRasmiDateJalliSplitBefore = this.MeghdarRecordBeforeChangeSplit[14];
    this.ShomarehMobileSplitBefore = this.MeghdarRecordBeforeChangeSplit[15];

    this.ShenasehMeliSplitAfter = this.MeghdarRecordAfterChangeSplit[0];
    this.ShakhsHoghooghiNameSplitAfter = this.MeghdarRecordAfterChangeSplit[1];
    this.ShakhsHoghooghiTypeIdSplitAfter = this.MeghdarRecordAfterChangeSplit[2];
    this.ShakhsHoghooghiTypeSplitAfter = this.MeghdarRecordAfterChangeSplit[3];
    this.EghtesadiJadidCodeSplitAfter = this.MeghdarRecordAfterChangeSplit[4];
    this.SabtDateSplitAfter = this.MeghdarRecordAfterChangeSplit[5];
    this.SabtDateJalaliSplitAfter = this.MeghdarRecordAfterChangeSplit[6];
    this.ShomarehSabtSplitAfter = this.MeghdarRecordAfterChangeSplit[7];
    this.MahalSabtCityIdSplitAfter = this.MeghdarRecordAfterChangeSplit[8];
    this.CityNameSplitAfter = this.MeghdarRecordAfterChangeSplit[9];
    this.ProvinceIdSplitAfter = this.MeghdarRecordAfterChangeSplit[10];
    this.ProvinceNameSplitAfter = this.MeghdarRecordAfterChangeSplit[11];
    this.EghtesadiGhadimCodeSplitAfter = this.MeghdarRecordAfterChangeSplit[12];
    this.AkharinRooznamehRasmiDateSplitAfter = this.MeghdarRecordAfterChangeSplit[13];
    this.AkharinRooznamehRasmiDateJalliSplitAfter = this.MeghdarRecordAfterChangeSplit[14];
    this.ShomarehMobileSplitAfter = this.MeghdarRecordAfterChangeSplit[15];

  }

  hideDialog() {
    this.changeTableDialog = false;
  }

  changetableValue(siteId) {
    this.selectedSite = siteId;
    console.log(this.selectedSite);
  }
}