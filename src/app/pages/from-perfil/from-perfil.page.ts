import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PerfilService } from '../../services/perfil.service';
import { Perfil } from 'src/app/interfaces/Perfil';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-from-perfil',
  templateUrl: './from-perfil.page.html',
  styleUrls: ['./from-perfil.page.scss'],
})
export class FromPerfilPage implements OnInit {


  perfil: Perfil = {
    id_perfil: 0,
    perf_nombre: "",
    perf_descripcion: ""
  };


  formPerfil: FormGroup = this.fb.group({
    perf_nombre: [this.perfil.perf_nombre, [Validators.required]],
    perf_descripcion: [this.perfil.perf_descripcion, [Validators.required]],
  });

  constructor(private modalCtrl: ModalController,
              private fb: FormBuilder,
              private perfilService: PerfilService,
              private uiService: UiServiceService) { }

  ngOnInit() {
  }

  cancelar(){
    const data = "Guardado";
    this.modalCtrl.dismiss(data);

  }
  guardar(){
    this.perfil = this.formPerfil.value;
    this.perfilService.savePerfil(this.perfil)
    .subscribe(ok =>{
      
      if( ok == true && this.formPerfil.valid) {
        this.uiService.presentToastWithOptions('Perfil Creado Exitosamente!');
        this.formPerfil.reset();
        this.cancelar();

      }else{
        this.uiService.presentToastWithOptions(ok);
      }
      
    });

  }

}
