import { Country } from './../../service/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {


  countryData: any;

  segmentModel = "stats"


  constructor(private router: Router, private activedRouter : ActivatedRoute) {

   }

  ngOnInit() {
    this.segmentModel = "stats"
    this.activedRouter.queryParams.subscribe(
      parms => {
        console.log(parms);
        this.countryData = parms;
      }
    )
  }

  segmentChanged(event : any){
    console.log(this.segmentModel);

   // console.log(event);
   // this.segmentModel = event;

  }

  getBack() {
    this.router.navigate(['/home'])
  }
}
