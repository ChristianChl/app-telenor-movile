import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { Usuarios } from 'src/app/interfaces/Usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioPermiso } from 'src/app/interfaces/UsuarioPermiso';
import { PerfilService } from '../../services/perfil.service';
import { TipoDocumentoService } from '../../services/tipo-documento.service';
import { PermisoService } from '../../services/permiso.service';
import { UsuarioPermisoService } from '../../services/usuario-permiso.service';
import { FromPerfilPage } from '../from-perfil/from-perfil.page';
import { FromTipoDocumentoPage } from '../from-tipo-documento/from-tipo-documento.page';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-from-usuarios',
  templateUrl: './from-usuarios.page.html',
  styleUrls: ['./from-usuarios.page.scss'],
})
export class FromUsuariosPage implements OnInit  {

  // usuario = {
  //   avatar: 'av-1.png'
  // }

  

  @Input() idUsuario: any;

  perfil: any = [];
  tipoDocumentos: any = [];
  permiso: any = [];
  usuarioPermiso: any = [];

  permisosSeleccionados: any = [];

  edit: boolean = false;
  fechaActual: any = "";


  usuarios: Usuarios = {
    id_usuario: 0,
    us_apellidos: "",
    us_nombres: "",
    us_numeroDocumento: "", 
    us_direccion: "",
    us_telefono: "",
    us_email: "",
    us_fechaRegistro: "",
    us_login: "",
    us_clave: "",
    us_activo: "",
    avatar: "",
    fk_id_perfil: "",
    fk_id_tipoDocumento: ""
  }

  usuarioPermisos: UsuarioPermiso = {
    id_UsuarioPermiso: 0,
    fk_id_permiso: "",
    fk_id_usuario: ""
  }

  formUsuarios: FormGroup = this.fb.group({
    us_apellidos: [this.usuarios.us_apellidos, [Validators.required]],
    us_nombres: [this.usuarios.us_nombres, [Validators.required]],
    us_numeroDocumento: [this.usuarios.us_numeroDocumento, [Validators.required]],
    us_direccion: [this.usuarios.us_direccion, []],
    us_telefono: [this.usuarios.us_telefono, []],
    us_email: [this.usuarios.us_email, [Validators.required]],
    us_fechaRegistro: [this.usuarios.us_fechaRegistro, []],
    us_activo: [this.usuarios.us_activo, [Validators.required]],
    avatar: [this.usuarios.avatar, []],
    fk_id_perfil: [this.usuarios.fk_id_perfil, [Validators.required]],
    fk_id_tipoDocumento: [this.usuarios.fk_id_tipoDocumento, [Validators.required]],
    us_login: [this.usuarios.us_login, [Validators.required]],
    us_clave: [this.usuarios.us_clave, [Validators.required, Validators.minLength(6)]],
    us_permiso: ['', []]
  });
  activatedRoute: any;

  constructor(private modalCtrl: ModalController,
              private usuarioService: UsuarioService,
              private uiService: UiServiceService,
              private fb: FormBuilder,
              private perfilService: PerfilService,
              private tipoDocumentoService: TipoDocumentoService,
              private permisoService: PermisoService,
              private usuarioPermisoService: UsuarioPermisoService,
              private datePipe: DatePipe) { }

  ngOnInit() {

    
    
    
    // this.usuarios = this.formUsuarios.value;
    // this.usuarios.us_activo = "true";
    
    // this.formUsuarios.reset({
      //   us_activo: this.usuarios.us_activo
      // })
      
      
      // this.formUsuarios.reset({
        //   us_permiso: this.personajes
        // })
    this.edit = false;
    if (this.idUsuario) {
      
      this.getTipoDocumento();
      this.getPerfil();
      this.getPermiso();

      this.usuarioService.getUsuario(this.idUsuario)
        .subscribe(
          res => {
            this.usuarios = res;
            this.formUsuarios.setValue({
              us_apellidos: this.usuarios.us_apellidos,
              us_nombres: this.usuarios.us_nombres,
              us_numeroDocumento: this.usuarios.us_numeroDocumento,
              us_direccion: this.usuarios.us_direccion,
              us_telefono: this.usuarios.us_telefono,
              us_email: this.usuarios.us_email,
              us_fechaRegistro: this.usuarios.us_fechaRegistro,
              us_activo: this.usuarios.us_activo,
              avatar: this.usuarios.avatar,
              fk_id_perfil: this.usuarios.fk_id_perfil,
              fk_id_tipoDocumento: this.usuarios.fk_id_tipoDocumento,
              us_login: this.usuarios.us_login,
              us_clave: this.usuarios.us_clave,
              us_permiso: '',
            })
            this.edit = true;
          },
          err => console.log(err)
        )
      this.usuarioPermisoService.getUsuarioPermiso(this.idUsuario)
        .subscribe(
          res => {
            this.usuarioPermiso = res;
            for (let i = 0; i < this.usuarioPermiso.length; i++) {

              this.permisosSeleccionados.push(this.usuarioPermiso[i].Permisos.perm_nombre)
                
            }
            this.formUsuarios.controls['us_permiso'].setValue(this.permisosSeleccionados);
  


          },
          err => console.log(err)
        )
    } else {
      this.fechaActual = this.datePipe.transform(new Date().toISOString(), 'yyyy-MM-dd');
      this.formUsuarios.controls['us_fechaRegistro'].setValue(this.fechaActual);
      this.formUsuarios.controls['us_activo'].setValue("true");
      // this.usuarios.us_activo = "true";
    }

    this.getTipoDocumento();
    this.getPerfil();
    this.getPermiso();
  }

  getPerfil(){

    this.perfilService.getPerfiles()
    .subscribe(resp =>{
      this.perfil = resp;
      this.perfil = this.perfil.perfil;
    },
    err => console.error(err)
    );
  }
  getTipoDocumento(){
    this.tipoDocumentoService.getDocumentos()
    .subscribe(resp =>{
      this.tipoDocumentos = resp;
      this.tipoDocumentos = this.tipoDocumentos.tiposDocumentos;
    },
    err => console.error(err)
    );
  }
  getPermiso(){
    this.permisoService.getPermisos()
    .subscribe(resp => {
      this.permiso = resp;
      this.permiso = this.permiso.permiso;
    },
    err => console.log(err)
    );
  }

  cancelar(){
    this.modalCtrl.dismiss();

  }

  async guardar(){

    this.formUsuarios.controls['avatar'].setValue(this.usuarios.avatar);
    const {us_permiso} = this.formUsuarios.value;
    this.permisosSeleccionados = us_permiso;

    this.usuarios = this.formUsuarios.value;

    this.usuarioService.saveUsuario(this.usuarios)
    .subscribe(resp =>{
      
      if( resp.ok == true && this.formUsuarios.valid ) {

        for(let i=0; i<this.permisosSeleccionados.length; i++){

          for(let k=0; k<this.permiso.length; k++){

            if(this.permisosSeleccionados[i] == this.permiso[k].perm_nombre ){
      
              this.usuarioPermisos.fk_id_permiso = this.permiso[k].id_permiso;
              this.usuarioPermisos.fk_id_usuario = resp.usuario.id_usuario;
              this.usuarioPermisoService.saveUsuarioPermiso(this.usuarioPermisos)
              .subscribe(ok =>{
  
              },
              err => console.log(err)
              );
            }

          }

    
        }

        this.uiService.presentToastWithOptions('Usuario Creado Exitosamente!');
        this.formUsuarios.reset();
        this.cancelar();
     

      }else{
        this.uiService.presentToastWithOptions(resp);
      }
      
    });

  }

  async updateUsuario(){
    this.formUsuarios.controls['avatar'].setValue(this.usuarios.avatar);
    const {us_permiso} = this.formUsuarios.value;
    this.permisosSeleccionados = us_permiso;

    this.usuarios = this.formUsuarios.value;
    this.usuarioPermisoService.deleteUsuarioPermisoByUsuario(this.idUsuario).subscribe(
      res => {
        this.usuarioService.updateUsuario(this.idUsuario, this.usuarios)
        .subscribe(resp =>{
        if( resp.ok == true && this.formUsuarios.valid ) {

          for(let i=0; i<this.permisosSeleccionados.length; i++){

            for(let k=0; k<this.permiso.length; k++){
  
              if(this.permisosSeleccionados[i] == this.permiso[k].perm_nombre ){
        
                this.usuarioPermisos.fk_id_permiso = this.permiso[k].id_permiso;
                this.usuarioPermisos.fk_id_usuario = this.idUsuario;
                this.usuarioPermisoService.saveUsuarioPermiso(this.usuarioPermisos)
                .subscribe(ok =>{
    
                },
                err => console.log(err)
                );
              }
  
            }
  
      
          }

          this.uiService.presentToastWithOptions('Usuario Actualizado Exitosamente!');
          this.formUsuarios.reset();
          this.cancelar();

      }else{
        this.uiService.presentToastWithOptions(resp);
      }
    });
  });
}

async showPerfil(){
  const modal = await this.modalCtrl.create({
    component: FromPerfilPage,
  });
 await modal.present();

 const { data } = await modal.onWillDismiss();
    console.log(data);
    if(data == "Guardado"){
      console.log("entro a guardado")
      this.getPerfil();
    }
}

async showDocumento(){
  const modal = await this.modalCtrl.create({
    component: FromTipoDocumentoPage,
  });
 await modal.present();

 const { data } = await modal.onWillDismiss();
    console.log(data);
    if(data == "Guardado"){
      console.log("entro a guardado")
      this.getTipoDocumento();
    }
}




}
