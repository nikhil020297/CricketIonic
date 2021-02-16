import { HttpService } from '../../service/http.service';
import { Component, OnInit } from '@angular/core';
import { PlayerData } from '../../model/player-data';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Utility } from '../../utils/utility';

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss'],
})

export class PlayerStatsComponent implements OnInit {
  listPlayer: Array<PlayerData> = new Array();
  utility: Utility;

  constructor(private httpService : HttpService, private router: Router, private altertCtrl: AlertController, private loadingCtrl: LoadingController) { }

  ngOnInit() {

    this.utility = new Utility(this.router, this.altertCtrl, this.loadingCtrl);
    this.getPlayerStats();
  }

  getPlayerStats() {
    this.utility.showAlert();

    this.httpService.getPlayerStats().then(
      response => {
        let playerList: Array<PlayerData> = new Array();
        let i = 1;
        response['player_list'].forEach(element => {
          let playerData: PlayerData = new PlayerData(i, element["player_role"] != null ? element["player_name"] + " (" + element["player_role"] + ")" : element["player_name"],
          element["bat_data"] != null ? element["bat_data"].is_batting : false,
            element["bowl_data"] != null ? element["bowl_data"].is_bowl : false,
            element["wk_data"] != null ? element["wk_data"].is_wk : false);

          i++;
          console.log(playerData);

          playerList.push(playerData);


        });

        this.listPlayer = playerList;
        this.utility.dimissloading();
      },

      error => {
        console.log("Login error : " + error);
        console.log(error);
        this.utility.showError(error.message, 'home');
        this.utility.dimissloading();
      });
  }

}
