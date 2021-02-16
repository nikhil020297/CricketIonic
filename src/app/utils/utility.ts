import { Router } from "@angular/router";
import { AlertController, LoadingController } from "@ionic/angular";

export class Utility {

  constructor(private router: Router, private altertCtrl: AlertController, private loadingCtrl: LoadingController) {
  }

  async showError(message, navigate) {
    var loding = await this.altertCtrl.create(
      {
        header: "Error Logning",
        message: message,
        buttons: [
          {
            text: 'ok',
            handler: () => {
              this.router.navigate([navigate])
            }
          }
        ]
      }
    )

    loding.present().then(res => {
      this.loadingCtrl.dismiss();
    });
  }

  dimissloading() {
    console.log("Loading dissmiss");
    this.loadingCtrl.dismiss();
  }

  async showAlert() {
    var load = await this.loadingCtrl.create({
      message: "Please wait........."
    })

    load.present();
  }
}
