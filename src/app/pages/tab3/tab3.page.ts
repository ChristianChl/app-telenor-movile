import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private authService: AuthService,
              private navCtrl: NavController) {}

  logout(){

    this.navCtrl.navigateRoot('/login', {animated: true});
    this.authService.logout();

  }

}
