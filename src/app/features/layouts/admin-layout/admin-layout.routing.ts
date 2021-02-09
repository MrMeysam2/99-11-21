import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';

import { ShakhshaghighiComponent } from '../../pages/Haghighi/shakhshaghighi/shakhshaghighi.component';
import { ShakhshaghighiaddressComponent } from '../../pages/Haghighi/shakhshaghighiaddress/shakhshaghighiaddress.component';

import { ModirshakhshoghooghiComponent } from '../../pages/Hoghooghi/modirshakhshoghooghi/modirshakhshoghooghi.component';
import { ShakhshoghooghiComponent } from '../../pages/Hoghooghi/shakhshoghooghi/shakhshoghooghi.component';
import { ShakhshoghooghiaddressComponent } from '../../pages/Hoghooghi/shakhshoghooghiaddress/shakhshoghooghiaddress.component';
import { ChangetableComponent } from '../../pages/changetable/changetable.component';
import { ChangetablehaghighiComponent } from '../../pages/changetable/changetablehaghighi/changetablehaghighi.component';
import { ChangetablehoghooghiComponent } from '../../pages/changetable/changetablehoghooghi/changetablehoghooghi.component';
import { AuthGuard } from 'src/app/core/auth/auth.guard';
import { ParvandehComponent } from '../../pages/parvandeh/parvandeh.component';
import { SanadrahnigheyrmangholComponent } from '../../pages/SanadRahniGheyrManghol/sanadrahnigheyrmanghol/sanadrahnigheyrmanghol.component';

export const AdminLayoutRoutes: Routes = [
    // { path: 'dashboard', component: DashboardComponent },

    // شخص حقیقی
    { path: 'shakhshaghighi', component: ShakhshaghighiComponent },
    { path: 'shakhshaghighiaddress', component: ShakhshaghighiaddressComponent },

    // شخص حقوقی
    { path: 'shakhshoghooghi', component: ShakhshoghooghiComponent, canActivate: [AuthGuard] },
    { path: 'modirshakhshoghooghi', component: ModirshakhshoghooghiComponent },
    { path: 'shakhshoghooghiaddress', component: ShakhshoghooghiaddressComponent },

    // جدول تغییرها
    {
        path: 'changetable', component: ChangetableComponent, children: [
            { path: 'changetablesabet1', component: ChangetablehaghighiComponent }, // حقیقی
            { path: 'changetablesabet2', component: ChangetablehoghooghiComponent }, // حقوقی
        ]
    },

    // پرونده ها
    { path: 'parvandeh', component: ParvandehComponent },

    // سند های رهنی غیر منقول
    { path: 'sanadrahnigheyrmanghol', component: SanadrahnigheyrmangholComponent },
];
