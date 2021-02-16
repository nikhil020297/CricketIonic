import { PlayerStatsComponent } from './component/player-stats/player-stats.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { NgModule } from "@angular/core";
import { TeamStatsComponent } from "./component/team-stats/team-stats.component"
import { CommonModule } from '@angular/common'

@NgModule(
  {
    declarations: [TeamStatsComponent, PlayerStatsComponent],
    imports:[IonicModule, HttpClientModule, CommonModule],
    exports: [TeamStatsComponent, PlayerStatsComponent]
  }
)

export class ComponentModule {

}
