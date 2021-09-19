import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController, AlertController } from '@ionic/angular';
import { PersonaService } from 'src/app/services/persona.service';
import { FormClienProveePage } from '../form-clien-provee/form-clien-provee.page';

@Component({
  selector: 'app-list-clien-prove',
  templateUrl: './list-clien-prove.page.html',
  styleUrls: ['./list-clien-prove.page.scss'],
})
export class ListClienProvePage implements OnInit {

  constructor(private personaService:PersonaService,
    private modalController: ModalController,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,) { }

  ngOnInit() {
    this.getCliente();
  }

  async presentActionSheet(idPersonas:any) {
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
          this.deletePersona(idPersonas)
        }
      }, 
      {
        text: 'Editar',
        icon: 'pencil-outline',
        handler: () => {
          console.log('Share clicked');
          this.abrirModalPersonas(idPersonas);
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

  async deletePersona(idPersonas:any){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmación',
      message: 'Esta seguro de eliminar la persona?',
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

            this.personaService.deletePersona(idPersonas).subscribe(
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
  
  persona:any = [];
  clientes:any = [];
  proveedores:any = [];
  getCliente(){
    this.personaService.getPersonas().subscribe(
      res => {
        this.persona = res;
        this.persona = this.persona.persona;
        
         this.clientes = this.persona.filter(function(ele: any){

          return ele.TipoPersonas.tipoper_descripcion == 'Cliente';

        });

        this.proveedores = this.persona.filter(function(ele: any){

          return ele.TipoPersonas.tipoper_descripcion == 'Proveedor';

        });
        console.log(this.clientes)
        console.log(this.persona)

      },
      err => console.error(err)
    );
  }


  async abrirModalPersonas(idPersonas:any){
    const modalPersonas = await this.modalController.create({
      component: FormClienProveePage,
      cssClass: 'my-custom-class',
      componentProps: {
        idPersona: idPersonas
      }
    });
    await modalPersonas.present();

    const { data } = await modalPersonas.onWillDismiss();
    console.log(data);
    if(data == "Guardado"){
      console.log("entro a guardado")
      this.getCliente();
    }
  }

  
}
