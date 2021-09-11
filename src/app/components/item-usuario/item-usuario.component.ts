import { Component, Input, OnInit } from '@angular/core';
import { Usuarios } from '../../interfaces/Usuario';

@Component({
  selector: 'app-item-usuario',
  templateUrl: './item-usuario.component.html',
  styleUrls: ['./item-usuario.component.scss'],
})
export class ItemUsuarioComponent implements OnInit {
  
  @Input() usuario: Usuarios = {};

  constructor() { }

  ngOnInit() {}

}
