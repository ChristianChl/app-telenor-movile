import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { TipoDocumento } from 'src/app/interfaces/TipoDocumento';
import { TipoDocumentoService } from '../../services/tipo-documento.service';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-from-tipo-documento',
  templateUrl: './from-tipo-documento.page.html',
  styleUrls: ['./from-tipo-documento.page.scss'],
})
export class FromTipoDocumentoPage implements OnInit {

  tipoDocumento: TipoDocumento = {
    id_tipoDocumento: 0,
    tipodoc_descripcion: "",
  }

  formTipoDocumento: FormGroup = this.fb.group({
    tipodoc_descripcion: [this.tipoDocumento.tipodoc_descripcion, [Validators.required]]
  });

  constructor(private modalCtrl: ModalController,
              private fb: FormBuilder,
              private tipoDocumentoService: TipoDocumentoService,
              private uiService: UiServiceService) { }

  ngOnInit() {
  }

  
  cancelar(){
    const data = "Guardado"
    this.modalCtrl.dismiss(data);

  }

  guardar(){
    this.tipoDocumento = this.formTipoDocumento.value;
    this.tipoDocumentoService.saveDocumento(this.tipoDocumento)
    .subscribe(ok =>{
      
      if( ok == true && this.formTipoDocumento.valid ) {

        this.uiService.presentToastWithOptions('Tipo Documento Creado Exitosamente!');
        this.formTipoDocumento.reset();
        this.cancelar();

      }else{
        this.uiService.presentToastWithOptions(ok);
      }
      
    });

  }

}
