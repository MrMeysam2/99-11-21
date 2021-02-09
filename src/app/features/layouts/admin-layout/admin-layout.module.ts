import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PrimengModule } from 'src/app/shared/primeng.module';
import { MaterialModule } from 'src/app/shared/material.module';

import { JalalidatePipe } from 'src/app/core/Pipe/jalalidate.pipe';
import { JalalidatetimePipe } from 'src/app/core/Pipe/jalalidatetime.pipe';

import { ShakhshaghighiComponent } from '../../pages/Haghighi/shakhshaghighi/shakhshaghighi.component';
import { ShakhshaghighiaddressComponent } from '../../pages/Haghighi/shakhshaghighiaddress/shakhshaghighiaddress.component';

import { ShakhshoghooghiComponent } from '../../pages/Hoghooghi/shakhshoghooghi/shakhshoghooghi.component';
import { ShakhshoghooghiaddressComponent } from '../../pages/Hoghooghi/shakhshoghooghiaddress/shakhshoghooghiaddress.component';
import { ModirshakhshoghooghiComponent } from '../../pages/Hoghooghi/modirshakhshoghooghi/modirshakhshoghooghi.component';

import { ChangetableComponent } from '../../pages/changetable/changetable.component';
import { ChangetablehaghighiComponent } from '../../pages/changetable/changetablehaghighi/changetablehaghighi.component';
import { ChangetablehoghooghiComponent } from '../../pages/changetable/changetablehoghooghi/changetablehoghooghi.component';

import { ParvandehComponent } from '../../pages/parvandeh/parvandeh.component';

import { SanadrahnigheyrmangholComponent } from '../../pages/SanadRahniGheyrManghol/sanadrahnigheyrmanghol/sanadrahnigheyrmanghol.component';
import { SanadrahnigheyrmangholparvandehComponent } from '../../pages/SanadRahniGheyrManghol/sanadrahnigheyrmangholparvandeh/sanadrahnigheyrmangholparvandeh.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    PrimengModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    MaterialModule,
  ],
  declarations: [
    DashboardComponent,

    ShakhshaghighiComponent,
    ShakhshaghighiaddressComponent,

    ShakhshoghooghiComponent,
    ShakhshoghooghiaddressComponent,
    ModirshakhshoghooghiComponent,

    ChangetableComponent,
    ChangetablehaghighiComponent,
    ChangetablehoghooghiComponent,

    ParvandehComponent,

    SanadrahnigheyrmangholComponent,
    SanadrahnigheyrmangholparvandehComponent,

    // Pipe
    JalalidatePipe,
    JalalidatetimePipe
  ]
})

export class AdminLayoutModule { }
