import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Categoria } from '../../interfaces/Categoria';
import { ModalController, AlertController } from '@ionic/angular';
import { CategoriasService } from '../../services/categoria.service';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.page.html',
  styleUrls: ['./form-categoria.page.scss'],
})
export class FormCategoriaPage implements OnInit {
  @Input() idCategoria;

  formCategoria = new FormGroup({
    firstName: new FormControl(),
    descripcionCategoria: new FormControl(),
    activoCategoria : new FormControl() 
  });

  inputValue?: string;
  edit: boolean = false;
  switchValue = false;
  checked = true;

  categoria: Categoria = {
    id_categoria: 0,
    cat_nombre: '',
    cat_descripcion: '',
    cat_activo: ''
  };
  toppings: FormGroup;

  constructor(private modalCtrl:ModalController,
    private categoriaService: CategoriasService,
    public alertController: AlertController,
    ) { }

  ngOnInit() {

    console.log("Prubsa"); 
    this.categoria.cat_activo = "true";
    if(this.idCategoria != ""){
      
      this.categoriaService.getCategoria(this.idCategoria)
      .subscribe(
        res => {
          this.categoria = res;
          this.edit = true;
        },
        err => console.log(err)
      )
    }
  }

  dismissModalCategoria(mensaje:any){
    this.modalCtrl.dismiss(mensaje);
  }

  saveNewCategoria(){
    console.log(this.categoria)
    this.categoriaService.saveCategoria(this.categoria)
      .subscribe(
        async ok=>{
          if (ok == true && this.formCategoria.valid) {
            

            this.formCategoria.reset();
            const alert = await this.alertController.create({
              cssClass: 'my-custom-class',
              header: 'Exito',
              message: 'Se guardo la Categoria',
              buttons: ['OK']
            });
        
            await alert.present();
        
            const { role } = await alert.onDidDismiss();

            this.dismissModalCategoria('Guardado');
          }
          else{
            this.formCategoria.markAllAsTouched();
            const alert = await this.alertController.create({
              cssClass: 'my-custom-class',
              header: 'Alerta',
              message: ok,
              buttons: ['OK']
            });
        
            await alert.present();
        
            const { role } = await alert.onDidDismiss();
          }
        });
  }

  submit(){

  }

  updateCategoria(){
    this.categoriaService.updateCategoria(this.idCategoria, this.categoria)
      .subscribe(
        async ok => {
          if (ok== true && this.formCategoria.valid) {
            const alert = await this.alertController.create({
              cssClass: 'my-custom-class',
              header: 'Exito',
              message: 'Se guardo la Categoria',
              buttons: ['OK']
            });
        
            await alert.present();
        
            const { role } = await alert.onDidDismiss();

            this.dismissModalCategoria('Guardado');
          }
          else{
            this.formCategoria.markAllAsTouched();
            const alert = await this.alertController.create({
              cssClass: 'my-custom-class',
              header: 'Error',
              message: ok,
              buttons: ['OK']
            });
        
            await alert.present();
        
            const { role } = await alert.onDidDismiss();

            this.dismissModalCategoria('Guardado');
          }
          
        });
  }

}
