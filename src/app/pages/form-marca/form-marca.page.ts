import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Marca } from '../../interfaces/Marca';
import { MarcaService } from '../../services/marca.service';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-form-marca',
  templateUrl: './form-marca.page.html',
  styleUrls: ['./form-marca.page.scss'],
})
export class FormMarcaPage implements OnInit {
  @Input() idMarca;

  formMarca = new FormGroup({
    nombreMarca: new FormControl(),
    descripcionMarca: new FormControl(),
    pepperoni : new FormControl() 
  });

  inputValue?: string;
  edit: boolean = false;
  switchValue = false;
  checked = true;
  marca: Marca = {
    id_marca: 0,
    mar_nombre: '',
    mar_descripcion: '',
    mar_activo: ''
  };
  toppings: FormGroup;
  constructor(private marcaService: MarcaService,
    private modalCtrl:ModalController,
    public alertController: AlertController) { }

  ngOnInit() {
    console.log("Prubsa"); 
    this.marca.mar_activo = "true";
    if(this.idMarca != ""){
      
      this.marcaService.getMarca(this.idMarca)
      .subscribe(
        res => {
          this.marca = res;
          this.edit = true;
        },
        err => console.log(err)
      )
    }

  }

  dismissModalMarca(mensaje:any){
    this.modalCtrl.dismiss(mensaje);
  }
  

  saveNewMarca(){
    console.log(this.marca);
    const value = this.formMarca.value;
        this.marcaService.saveMarca(this.marca)
      .subscribe(
        async ok=>{
          if (ok== true && this.formMarca.valid) {
            const alert = await this.alertController.create({
              cssClass: 'my-custom-class',
              header: 'Exito',
              message: 'Se guardo la Marca',
              buttons: ['OK']
            });
        
            await alert.present();
        
            const { role } = await alert.onDidDismiss();

            this.dismissModalMarca('Guardado');
            
          }
          else{
            this.formMarca.markAllAsTouched();
            
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

  updateMarca(){
    console.log("prueba")
    this.marcaService.updateMarca(this.idMarca, this.marca)
      .subscribe(
        async ok => {
          if (ok== true && this.formMarca.valid) {
            const alert = await this.alertController.create({
              cssClass: 'my-custom-class',
              header: 'Exito',
              message: 'Se guardo la Marca',
              buttons: ['OK']
            });
        
            await alert.present();
        
            const { role } = await alert.onDidDismiss();

            this.dismissModalMarca('Guardado');
          }
          else{
            this.formMarca.markAllAsTouched();
            const alert = await this.alertController.create({
              cssClass: 'my-custom-class',
              header: 'Exito',
              message: ok,
              buttons: ['OK']
            });
        
            await alert.present();
        
            const { role } = await alert.onDidDismiss();

            this.dismissModalMarca('Guardado');
          }
          
        });
  }
}
