import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/market', title: 'Market',  icon:'ni-delivery-fast text-info', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    // { path: '/maps', title: 'My Holdings',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    // { path: '/tables', title: 'Leader board',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/faq', title: 'F.A.Q.',  icon:'ni-bullet-list-67 text-red', class: '' },
    // { path: '/sponser', title: 'Genral Instructions',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/bonus', title: 'Claim Bonus',  icon:'ni-money-coins text-primary', class: '' },
    // { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    // { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  url;


  constructor(private router: Router) { }

  logout(){
    localStorage.clear();
    window.location.reload();
  }

  ngOnInit() {
    this.url = 'https://www.ecell.in/ca/dash/assets/img/person_holder.jpg';
    if(localStorage.getItem('image_url')){
      this.url = localStorage.getItem('image_url');
    }
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
