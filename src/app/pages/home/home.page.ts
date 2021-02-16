import { Country, HttpService } from '../../service/http.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Utility } from '../../utils/utility';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  countryList: Array<Country> = new Array();
  utility: Utility;

  constructor(private httpService: HttpService, private router: Router, private altertCtrl: AlertController, private loadingCtrl: LoadingController) {
  }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.utility = new Utility(this.router, this.altertCtrl, this.loadingCtrl);

    this.getCountryList();

  }

  getCountryList() {
    this.utility.showAlert();
    try {
      this.httpService.getCountryList().then(
        response => {
          console.log("Country List : ");

          this.countryList = response;

          response.forEach(element => {
            console.log(element);
          });
          this.utility.dimissloading();
        },

        error => {

          console.log("Login error : " + error);
          console.log(error);
          this.utility.showError(error.message, 'home');
          this.utility.dimissloading();
        }
      )
    } catch (error) {
      console.log(error);
    }
  }


  gotoDasahboard(value) {
    this.router.navigate(['dashboard'], {
      queryParams: value
    })
  }
}
