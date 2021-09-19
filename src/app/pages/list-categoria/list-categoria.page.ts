import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { CategoriasService } from '../../services/categoria.service';
import { FormCategoriaPage } from '../form-categoria/form-categoria.page';

@Component({
  selector: 'app-list-categoria',
  templateUrl: './list-categoria.page.html',
  styleUrls: ['./list-categoria.page.scss'],
})
export class ListCategoriaPage implements OnInit {
  categorias:any = [];

  constructor(private categoriaService:CategoriasService,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController ,
    private modalController: ModalController,) { }

  ngOnInit() {
    this.getCategorias();
  }

  getCategorias(){
    this.categoriaService.getCategorias().subscribe(
      res => {
        this.categorias = res;
        this.categorias = this.categorias.categoria;
      },
      err => console.error(err)
    );
  }

  async presentActionSheet(idCategoria:any) {
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
          this.deleteCategoria(idCategoria)
        }
      }, 
      {
        text: 'Editar',
        icon: 'pencil-outline',
        handler: () => {
          console.log('Share clicked');
          this.abrirModalCategoria(idCategoria);
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
  
  async deleteCategoria(idCategoria:any){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmación',
      message: 'Esta seguro de eliminar la Categoria?',
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

            this.categoriaService.deleteCategoria(idCategoria).subscribe(
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

  async abrirModalCategoria(idCategoria:any){
    const modalMarca = await this.modalController.create({
      component: FormCategoriaPage,
      cssClass: 'my-custom-class',
      componentProps: {
        idCategoria: idCategoria
      }
    });
    await modalMarca.present();

    const { data } = await modalMarca.onWillDismiss();
    console.log(data);
    if(data == "Guardado"){
      console.log("entro a guardado")
      this.getCategorias();
    }
  }
  

}
