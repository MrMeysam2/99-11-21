import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  // { path: '/dashboard', title: 'dashboard', icon: 'ni-tv-2 text-primary', class: '' },
  // { path: '/login', title: 'ورود', icon: 'ni-key-25 text-info', class: '' },

  { path: '/shakhshaghighi', title: 'اشخاص حقیقی', icon: 'ni ni-laptop text-primary', class: '' },
  { path: '/shakhshoghooghi', title: 'اشخاص حقوقی', icon: 'ni ni-laptop text-primary', class: '' },
  { path: '/changetable', title: 'جدول تغییرها', icon: 'ni ni-archive-2 text-primary', class: '' },
  { path: '/parvandeh', title: 'پرونده ها', icon: 'ni ni-bag-17 text-primary', class: '' },
  { path: '/sanadrahnigheyrmanghol', title: 'سند های رهنی غیر منقول', icon: 'ni ni-bag-17 text-primary', class: '' },
  // { path: '/sanadrahnigheyrmangholparvandeh', title: 'سندهای رهنی غیر منقول پرونده ها', icon: 'ni ni-bag-17 text-primary', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
}
