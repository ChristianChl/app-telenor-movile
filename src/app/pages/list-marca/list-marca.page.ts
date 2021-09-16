import { Component, OnInit } from '@angular/core';
import { MarcaService } from '../../services/marca.service';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { FormMarcaPage } from '../form-marca/form-marca.page';

@Component({
  selector: 'app-list-marca',
  templateUrl: './list-marca.page.html',
  styleUrls: ['./list-marca.page.scss'],
})
export class ListMarcaPage implements OnInit {
  marca:any = [];
  constructor(private marcaService:MarcaService,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    private modalController: ModalController,) { }

  ngOnInit() {
    this.getMarcas();
  }

  getMarcas(){
    this.marcaService.getMarcas().subscribe(
      res => {
        this.marca = res;
        this.marca = this.marca.marca;
        console.log(this.marca);
      },
      err => console.error(err)
    );
  }

  async presentActionSheet(idMarca:any) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      cssClass: 'my-custom-class',
      buttons: [
      {
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
          this.deleteMarca(idMarca)
        }
      }, 
      {
        text: 'Editar',
        icon: 'pencil-outline',
        handler: () => {
          console.log('Share clicked');
          this.abrirModalMarca(idMarca);
        }
      }, 
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async deleteMarca(id: string){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmación',
      message: 'Esta seguro de eliminar la Marca?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: () => {

            this.marcaService.deleteMarca(id).subscribe(
              async res=> {
                const alert = await this.alertController.create({
                  cssClass: 'my-custom-class',
                  header: 'Exito',
                  message: "Se elimino con exito",
                  buttons: ['OK']
                });
                await alert.present();
          
                const { role } = await alert.onDidDismiss();
                
                this.ngOnInit();
              },
              err => console.log(err)
            );
          }
        }
      ]
    });

    await alert.present();
  }

  async abrirModalMarca(idMarca:any){
    const modalMarca = await this.modalController.create({
      component: FormMarcaPage,
      cssClass: 'my-custom-class',
      componentProps: {
        idMarca: idMarca
      }
    });
    await modalMarca.present();

    const { data } = await modalMarca.onWillDismiss();
    console.log(data);
    if(data == "Guardado"){
      console.log("entro a guardado")
      this.getMarcas();
    }
  }
}
