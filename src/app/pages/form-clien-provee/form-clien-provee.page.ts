import { Component, OnInit, Input } from '@angular/core';
import { TipoDocumentoService } from '../../services/tipo-documento.service';
import { CategoriasService } from '../../services/categoria.service';
import { ModalController, AlertController } from '@ionic/angular';
import { PersonaService } from '../../services/persona.service';
import { TipoPersonaService } from '../../services/tipo-persona.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Persona } from 'src/app/interfaces/Persona';
import { element } from 'protractor';

@Component({
  selector: 'app-form-clien-provee',
  templateUrl: './form-clien-provee.page.html',
  styleUrls: ['./form-clien-provee.page.scss'],
})
export class FormClienProveePage implements OnInit {

  @Input() idPersona;

  constructor(private tipoDocumentoService : TipoDocumentoService,
    private categoriaService: CategoriasService,
    private modalCtrl:ModalController,
    private personaService : PersonaService,
    public alertController: AlertController,
    private tipoPersonaService : TipoPersonaService) { }

    tipoPersonas:any=[
      {text:"Cliente", value:"1"},
      {text:"Proveedor", value:"2"},
    ]
  
    persona: Persona = {
      id_Persona: 0,
      per_razonSocial: "",
      per_numeroDocumento: "",
      per_direccion: "",
      per_celular: "",
      per_telefonoFijo: "",
      per_email: "",
      per_activo:"",
      fk_id_tipoDocumento: "",
      fk_id_tipoPersona:  ""
    };
  
    formPersona = new FormGroup({
      categoriaProducto: new FormControl(),
      tipoDoc: new FormControl(),
      tipoPersona: new FormControl(),
      numDocProveedor:new FormControl(),
      razonSocialProveedor:new FormControl(),
      direccionProveedor:new FormControl(),
      correoProveedor:new FormControl(),
      celularProveedor:new FormControl(),
      telefonoFijoProveedor:new FormControl(),
      activoProveedor:new FormControl()
    });
  
  edit:boolean;
  ngOnInit() {
    this.getTipoPersona();
    this.getTipoDocumento();
    this.getCategoria();

    if(this.idPersona!=""){
      
      this.personaService.getPersona(this.idPersona)
      .subscribe(
        res => {
          this.persona = res;
          this.edit = true;
          var b = document.getElementById('tipoPersonas');

          b.setAttribute("disabled", "true");

        },
        err => console.log(err)
      )
    }
    else{
      console.log("vacio");
    }
  }

  dismissModal(mensaje:any) {
    this.modalCtrl.dismiss(mensaje);
    
  }

  async deletePersona(){

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

            this.personaService.deletePersona(this.idPersona).subscribe(
              async res=> {
                const alert = await this.alertController.create({
                  cssClass: 'my-custom-class',
                  header: 'Exito',
                  message: "Se elimino con exito",
                  buttons: ['OK']
                });
                await alert.present();
          
                const { role } = await alert.onDidDismiss();
                
                this.dismissModal('Guardado');
              },
              err => console.log(err)
            );
          }
        }
      ]
    });

    await alert.present();

    
    
  }

  tipoPersona:any = [];
  getTipoPersona(){
    this.tipoPersonaService.getTipoPersonas().subscribe(
      res=>{
        this.tipoPersona = res;
        this.tipoPersona = this.tipoPersona.tipoPersona;
        console.log(this.tipoPersona);
        
      }
    )
  }
  categoria:any = [];
  getCategoria(){
    this.categoriaService.getCategorias().subscribe(
      res=>{
        this.categoria = res;
        console.log(this.categoria);
        this.categoria = this.categoria.categoria;
      }
    )
  }

  tipoDocumento:any=[];
  getTipoDocumento(){
    this.tipoDocumentoService.getDocumentos().subscribe(
      res=>{
        this.tipoDocumento = res;
        
        this.tipoDocumento = this.tipoDocumento.tiposDocumentos;
        console.log(this.tipoDocumento)
      }
    )
  }
  saveNewPersona(){
    console.log(this.persona);
    this.personaService.savePersona(this.persona)
      .subscribe(async ok => {
        if(ok == true && this.formPersona.valid){
            
            this.formPersona.reset();
            const alert = await this.alertController.create({
              cssClass: 'my-custom-class',
              header: 'Exito',
              message: "Se guardo con exito",
              buttons: ['OK']
            });
        
            await alert.present();
        
            const { role } = await alert.onDidDismiss();
            this.dismissModal("Guardado");
        }
        else{
          this.formPersona.markAllAsTouched();
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

  updatePersona(){
    this.personaService.updatePersona( this.idPersona, this.persona)
      .subscribe(async ok => {
        if(ok == true && this.formPersona.valid){
            
            this.formPersona.reset();
            const alert = await this.alertController.create({
              cssClass: 'my-custom-class',
              header: 'Exito',
              message: "Se guardo con exito",
              buttons: ['OK']
            });
        
            await alert.present();
        
            const { role } = await alert.onDidDismiss();
            this.dismissModal("Guardado");
        }
        else{
          this.formPersona.markAllAsTouched();
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

}
