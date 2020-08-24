import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { interval } from 'rxjs';
import { error } from 'protractor';
import { request } from 'http';

@Component({
  selector: 'app-overload',
  templateUrl: './overload.component.html',
  styleUrls: ['./overload.component.css']
})
export class OverloadComponent implements OnInit {

  rec_count = 0
  success = 0
  fail = 0
  sub;
  sub2;
  authToken= "ya29.a0AfH6SMCnz92IVBA0maySlIQvK3ayW_SK6rFk0fWy89GK1FfqnwATDZ96OvXohfFvMBQkZUvFSu2XrL8blpuSuXszIVwS99qm798op9Rs4v4UE438iC3yP0BK3pBV4lMUomJUeCy-m_qC3d4i3vHig8XFAbLmZLnHmd8";
  reqs :number = 1;
  token = "ss";
  dToken = "qwerty12345";
  code = "test";
  
  constructor(private http: HttpClient) {
  }

  trans(){
    var n = 1000;
    if(this.reqs != 0){
      n = 1000/this.reqs;
    }
    console.log(n);
    
    var source = interval(n);
    this.sub = source.subscribe(val => {
      this.rec_count += 1
      this.recursive_bid()
    })
  }

  login(){ 
    n = 1000;
    if(this.reqs != 0){
      var n = 1000/this.reqs;
    }
    var source = interval(n);
    this.sub2 = source.subscribe(val => {
      this.rec_count += 1
      this.recursive_login()
    })
  }

  new(){
    n = 1000;
    if(this.reqs != 0){
      var n = 1000/this.reqs;
    }
    var source = interval(n);
    this.sub2 = source.subscribe(val => {
      this.rec_count += 1
      this.get_new()
    })
  }


  get_new(){
    this.http.get<any>('https://django.ecell.in/vsm/news/').subscribe(
      data => {    
        this.success += 1 
       }, 
       error => {
        this.fail += 1 
        console.log(error);
        
       }
    )
  }

  stop(){
    if(this.sub){
      this.sub.unsubscribe()
    }
    if(this.sub2){
      this.sub2.unsubscribe()
    }
  }

  reset(){
    this.rec_count = 0
    this.success = 0
    this.fail = 0
    this.token = ""
  }
  
  recursive_login(){
    var body = new FormData();
    body.append('grant_type', 'convert_token');
    body.append('backend', 'google-oauth2');
    body.append('client_id', 'QHC0HHfSYaPcw2wr4ghMGhF4kvW7ul4oxVEUwCrG');
    body.append('client_secret', 'wQSBW56cywhMcHCjfEVh9sMZWzOsKLYKhJeMK1hFRZzp2u0aPVqqhCipuWB83lRuFHl7TUMUmUoN8iLzsxr6xN4rN0ZkpctsnPPPLqps05CItM9KH2Sool1VvCm4G95c');
    body.append('token', this.authToken);

    this.http.post<any>("https://api.ecell.in/django-oauth/convert-token", body).subscribe(
    data => {
      this.token = data['access_token']

      this.success += 1
      console.log(data['access_token']);
    }, error => {
      this.fail += 1
      console.log(error);
    });

  }

  recursive_bid(){

    var header = new HttpHeaders({
      'Authorization': "Bearer " + this.dToken
    });
    var body = new FormData();
    body.append('code', 'test')
    body.append('transac_type', 'buy')
    body.append('quantity', '5')

    console.log('req_started');
    
    this.http.post<any>("https://api.ecell.in/vsm/trans/", body, {headers: header}).subscribe(
        data => {
          console.log(data);
          this.success += 1
          // alert('you have transacted for 10 shares of ' + data['company_name'] + ' at ' + data['bid_price'] )
        },
        error => {
          this.fail += 1 
          if(this.fail < 5){
            console.log(error);
          }
        }
      )
  }

  ngOnInit(): void {
    this.dToken = "qwerty12345";
  }

}

