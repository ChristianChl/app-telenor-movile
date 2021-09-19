import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonList, ModalController } from '@ionic/angular';
import { FromUsuariosPage } from 'src/app/pages/from-usuarios/from-usuarios.page';
import { Usuarios } from '../../interfaces/Usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-item-usuario',
  templateUrl: './item-usuario.component.html',
  styleUrls: ['./item-usuario.component.scss'],
})
export class ItemUsuarioComponent implements OnInit {
  
  @Input() usuario: any = {};

  @ViewChild(IonList) ionList: IonList;

  constructor(private usuarioService: UsuarioService,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController ) { }

  ngOnInit() {
    
  }


  async editar(user: any, idUsuario: string){

    // console.log('Editar', user);

    const modal = await this.modalCtrl.create({
      component: FromUsuariosPage,
      componentProps: {
        idUsuario: idUsuario
      }
    });
   await modal.present();
    this.ionList.closeSlidingItems();

  }

   async eliminar(user: any, id: string){
    
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: '¿Desea Eliminar el Usuario ' + user.us_nombres + '?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
            // console.log('delete', user.us_nombres);
            this.ionList.closeSlidingItems();
          }
        }, {
          text: 'Eliminar',
          handler: () => {
            // console.log('Confirm Okay');
            this.usuarioService.deleteUsuario(id).subscribe(
              res => {
                this.ngOnInit();
              },
              err =>console.log(err)
            )
            this.presentAlert();
            // console.log('delete', user.us_nombres);
            this.ionList.closeSlidingItems();
          }
        }
      ]
    });

    await alert.present();

  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Mensaje',
      message: 'Usuario eliminado con éxito',
      buttons: ['OK']
    });

    await alert.present();
  }

}
