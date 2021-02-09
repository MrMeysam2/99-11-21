import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './features/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './features/layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './core/components/components.module';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MaterialPersianDateAdapter, PERSIAN_DATE_FORMATS } from './shared/variables/material.persian-date.adapter';

import { HttpconfigInterceptor } from './core/http-interceptors/httpconfig.interceptor';
import { LoaderService } from './core/services/loader.service';
import { LoaderInterceptor } from './core/http-interceptors/loader.interceptor';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ChangetableService } from './core/services/changetable.service';
import { HaghighiService } from './core/services/haghighi.service';
import { HoghoghiService } from './core/services/hoghoghi.service';
import { PublicService } from './core/services/public.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent
  ],
  providers: [
    LoaderService,
    MessageService,
    ConfirmationService,
    HaghighiService,
    HoghoghiService,
    PublicService,
    ChangetableService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpconfigInterceptor, multi: true },
    { provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
