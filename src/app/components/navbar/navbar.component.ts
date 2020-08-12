import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  constructor(location: Location,  private element: ElementRef, private router: Router, private http: HttpClient) {
    this.location = location;
  }

  url;
  fname;
  lname;

  logout(){
    localStorage.clear();
    window.location.reload();
  }

  ngOnInit() {

    if(!localStorage.getItem('token')){
      alert('You are not currently logged in! please login to continue.')
      this.router.navigate(['/login'])
    }


    this.url = 'https://www.ecell.in/ca/dash/assets/img/person_holder.jpg';
    if(localStorage.getItem('image_url')){
      this.url = localStorage.getItem('image_url');
    }
    var access_token = localStorage.getItem('token');

    var header = new HttpHeaders({
      'Authorization': "Bearer " + access_token 
    });

    this.http.get<any>("https://django.ecell.in/vsm/me/", {headers: header}).subscribe(
      data => {
        // console.log(data)
        this.fname = data['fname'];
        this.lname = data['lname'];
      },
      error => {
        console.log(error);
        
      }
    )
    
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

}
