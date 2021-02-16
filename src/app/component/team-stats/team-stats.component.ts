import { HttpService } from '../../service/http.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Utility } from '../../utils/utility';

@Component({
  selector: 'app-team-stats',
  templateUrl: './team-stats.component.html',
  styleUrls: ['./team-stats.component.scss'],
})
export class TeamStatsComponent implements OnInit {

  matchStats: any;
  wonPercent: any;
  battingPercent: any;
  bowlingPercent: any;
  fielidingPercent: any;
  utility: Utility;


  constructor(private httpService : HttpService, private router: Router, private altertCtrl: AlertController, private loadingCtrl: LoadingController) { }

  ngOnInit() {

    this.utility = new Utility(this.router, this.altertCtrl, this.loadingCtrl);

    this.getMatch();
  }


  getMatch() {
    this.utility.showAlert();

    this.httpService.getTeamStats().then(
      response => {
        this.matchStats = response;
        this.wonPercent = this.getWonPercentage(response["match_stats"].match_played, response["match_stats"].match_won)
        this.battingPercent = response["team_stats"].batting/100;
        this.bowlingPercent = response["team_stats"].bowling/100;
        this.fielidingPercent = response["team_stats"].fielding / 100;

        this.utility.dimissloading();
      },

      error => {

        console.log("Login error : " + error);
        console.log(error);
        this.utility.showError(error.message, 'dashboard');
        this.utility.dimissloading();
      });
  }

  getWonPercentage(totalMatch, wonMatch) {
    return ((wonMatch/totalMatch))
  }


}
