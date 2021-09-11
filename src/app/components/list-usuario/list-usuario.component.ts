import { Component, Input, OnInit } from '@angular/core';
import { Usuarios } from '../../interfaces/Usuario';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrls: ['./list-usuario.component.scss'],
})
export class ListUsuarioComponent implements OnInit {
  
  @Input() usuarios: Usuarios[] = [];

  constructor() { }

  ngOnInit() {
    // console.log(this.usuarios);
  }

}
