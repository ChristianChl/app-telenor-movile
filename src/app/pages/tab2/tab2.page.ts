import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuarios } from '../../interfaces/Usuario';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  
  usuarios: Usuarios[] = [];
  collusuario: any = [];

  constructor(private usuariosService: UsuarioService) {}

  ngOnInit(): void{

    this.getUsuarios();

  }
  getUsuarios(){
    this.usuariosService.getUsuarios()
    .subscribe(resp => {
      this.collusuario = resp;
      this.collusuario = this.collusuario.usuarios;
      this.usuarios.push(...this.collusuario);
    });
  }
  recargar(event){
    this.usuarios = [];
    this.collusuario = [];
    this.getUsuarios()
    event.target.complete();
  }

}
