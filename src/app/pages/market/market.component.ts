import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { interval } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MarketdialogComponent } from 'src/app/components/marketdialog/marketdialog.component';
import { SpinnerService } from 'src/app/spinner/spinner.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit, OnDestroy {

  companies;
  news = [];
  all_news = [];
  game_time: Boolean = false;
  a = false;
  b = false;
  subs: any;
  sub: any;
  cash;
  rec_count = 0;

  constructor(private http: HttpClient, private dialog: MatDialog, private spinner: SpinnerService) { }
  
  ngOnDestroy(): void {
    if(this.subs){
      this.subs.unsubscribe()
    }
    if(this.sub){
      this.sub.unsubscribe()
    }
    
  }

  bid(company){
    console.log(company['code']);

    if(!this.game_time){
      alert('market is closed')
      return;
    }
    
    let dialogRef = this.dialog.open(MarketdialogComponent, {
      height: '500px',
      width: '600px',
      data: { mode: 'Buy', company: company },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      var access_token = localStorage.getItem('token');

      var header = new HttpHeaders({
        'Authorization': "Bearer " + access_token 
      });
      var body = new FormData();
      body.append('code', company['code'])
      body.append('transac_type', 'buy')
      body.append('quantity', result)

      var price = result * company['current_market_price'];
      if (this.cash < price){
        alert('Not enough Cash availible')
        return;
      }


      if (result <= 0 ){
        alert ('Invalid Number of Shares (less than 0)')
        return;
      }
      else if (result > 10000){
        alert ('Invalid Number of Shares (more than 10,000)')
        return;
      }



      this.spinner.requestStarted();

      this.http.post<any>("https://api.ecell.in/vsm/trans/", body, {headers: header}).subscribe(
        data => {
          this.spinner.requestEnded();
          this.updateCompanies()
          console.log(data)
          alert('you have transacted for '+ result + ' shares of ' + data['company_name'] + ' at ' + data['bid_price'] )
        },
        error => {
          this.spinner.requestEnded();
          console.log(error);
        }
      )
    });
    
    
  }

  ngOnInit(): void {
    this.spinner.requestStarted();

    this.http.get<any>('https://api.ecell.in/vsm/companies/').subscribe(
      data => {
        this.companies = data
        this.a = true;
        if(this.b){
          this.spinner.requestEnded();
        }
      },
      error => {
        console.error('error');
        
      }
    )
    var base_min = 0
    var now = new Date();
    console.log(now.getMonth(), now.getDate(), now.getHours())
    if(now.getDate() == 21 && now.getHours() < 18) {
      console.log('day 1 testing');      
      var start_time = new Date('2020-08-21 16:30:00')
      var end_time = new Date('2020-08-21 17:30:00')
    }
    else if(now.getDate() == 21){
      console.log('day 1');      
      var start_time = new Date('2020-08-21 21:00:00')
      var end_time = new Date('2020-08-21 22:00:00')
    }
    else if(now.getDate() == 22){
      console.log('day 2');
      var start_time = new Date('2020-08-22 21:00:00')
      var end_time = new Date('2020-08-22 22:00:00')
      base_min = 60
    }
    else if(now.getDate() == 23){
      console.log('day 3');
      var start_time = new Date('2020-08-23 21:00:00')
      var end_time = new Date('2020-08-23 22:00:00')
      base_min = 120
    }
    else if(now.getDate() == 24){
      console.log('day 1');
      var start_time = new Date('2020-08-24 21:00:00')
      var end_time = new Date('2020-08-24 22:00:00')
      base_min = 0
    }
    else if(now.getDate() == 25){
      console.log('day 1');
      var start_time = new Date('2020-08-25 22:00:00')
      var end_time = new Date('2020-08-25 23:00:00')
      base_min = 15
    }
    else if(now.getDate() == 26){
      console.log('day 1');
      var start_time = new Date('2020-08-26 22:00:00')
      var end_time = new Date('2020-08-26 23:00:00')
      base_min = 190
    }
    else {
      var start_time = new Date('2020-08-21 21:00:00')
      var end_time = new Date('2020-08-21 22:00:00')
    }


    if (now.getTime() > start_time.getTime() && now.getTime() < end_time.getTime()){
      this.game_time = true;
    }
    else {
      this.game_time = false;
    }
    const check = interval(15000)
    this.sub = check.subscribe(val => {
      this.updateCompanies();
      now = new Date()
      if (now.getTime() > start_time.getTime() && now.getTime() < end_time.getTime()){
        this.game_time = true;
      }
      else {
        this.game_time = false;
      }
    })

    var header = new HttpHeaders({
      'Authorization': "Bearer " + localStorage.getItem('token')
    });

    this.http.get<any>("https://api.ecell.in/vsm/me/", {headers: header}).subscribe(
            data => {
              // console.log('cashhhhh')
              this.cash = data['cash'];
              this.cash = Math.floor(this.cash)           
            },
            error => {
              console.log(error);
              
            }
        )

    this.http.get<any>('https://django.ecell.in/vsm/news/').subscribe(
      data => {      
        this.b = true;
        if(this.a){
          this.spinner.requestEnded();
        }  
        this.all_news = data
        var current_time = new Date();
        
        var diff = current_time.getTime() - start_time.getTime()
        
        var minutes = base_min + Math.floor(diff / (60 * 1000)) ;
        // console.log('minutes into game', minutes);

        if ( current_time.getTime() > end_time.getTime()){
          minutes = base_min + 60
        }
        var l = minutes+1;
        
        this.all_news.forEach(element => {
          // console.log(element)
          if( element['show_id'] < minutes){
            var n = {content: element['content'], title: element['title'], show_id: element['show_id']}
            var m = this.news.length            
            this.news.splice(m, 0 , n)
          }
        });

        if ( current_time.getTime() > end_time.getTime()){
          minutes = base_min + 60
          return;
        }


        var i = 0
        
        const source = interval(1000);
        this.subs = source.subscribe(val => {
          var current_time = new Date();
          
          var diff = current_time.getTime() - start_time.getTime()
        
          var minutes = base_min + Math.floor(diff / (60 * 1000)) ;
          // console.log('inside loop market', minutes);



          if ( current_time.getTime() > end_time.getTime()){
            minutes = base_min + 60;
            return;
          }
          
          this.all_news.forEach(element => {
            if( element['show_id'] == minutes && minutes != l){
              console.log('market', element['show_id'])
              l = minutes;
              var n = {content: element['content'], title: element['title'], show_id: element['show_id']}
              this.news.splice(0,0,n)
            }
          });

        })
        
      },
      error => {
        console.error('error'); 
      }
    )


  }

  updateCompanies(){
    // console.log('upadating ...');
    this.http.get<any>('https://api.ecell.in/vsm/companies/').subscribe(
      data => {   
        // console.log('accepted');            
        this.companies = data
      },
      error => {
        console.error('error');
        
      }
    )
  }

}
