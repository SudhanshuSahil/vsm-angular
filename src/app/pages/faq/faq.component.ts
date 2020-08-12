import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  faqs: {};

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>("https://django.ecell.in/vsm/faq/").subscribe(
      data => {
        this.faqs = data;
      }
    )
  }

}
