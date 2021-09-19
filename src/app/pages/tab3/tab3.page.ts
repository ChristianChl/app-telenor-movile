import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Usuario } from 'src/app/interfaces/Auth';
import { UsuarioService } from '../../services/usuario.service';
import { FromUsuariosPage } from '../from-usuarios/from-usuarios.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  usuario: Usuario = {};
  dataUsuario: any = [];
  collUsuario: any =[];
  perfil: any = "";
  tipoDocumento: any = "";

  reorderDisable: boolean = true;
  reorderDisable1: boolean = true;

  icono: boolean = false;
  icono1: boolean = false;



  constructor(private authService: AuthService,
              private navCtrl: NavController,
              private usuarioService: UsuarioService,
              private modalCtrl: ModalController) {}

  ngOnInit(){
    this.getUsuario();

  }

  getUsuario(){
    this.usuario = this.authService.getUsuario();
    this.usuarioService.getUsuario(this.usuario.uid)
    .subscribe(resp =>{
      this.collUsuario = resp;
      this.dataUsuario = this.collUsuario;

      // console.log(this.dataUsuario);
      // console.log(this.dataUsuario.Perfils.perf_nombre);
      this.perfil = this.dataUsuario.Perfils.perf_nombre;
      this.tipoDocumento = this.dataUsuario.TipoDocumentos.tipodoc_descripcion;
    },
    err=> console.log(err)
    );

  }

  logout(){

    this.navCtrl.navigateRoot('/login', {animated: true});
    this.authService.logout();

  }

  doReorder(event: any){
    // console.log(event);
    event.detail.complete();
  }

  onClick(){
    this.icono = !this.icono;
  }

  onClick1(){
    this.icono1 = !this.icono1;
  }

  async actualizarPerfil(idUsuario: string){

    const modal = await this.modalCtrl.create({
      component: FromUsuariosPage,
      componentProps: {
        idUsuario: idUsuario
      }
    });
   await modal.present();
  }

  recargar(event){
    this.dataUsuario = [];
    this.collUsuario =[];
    this.getUsuario()
    event.target.complete();
  }

}
