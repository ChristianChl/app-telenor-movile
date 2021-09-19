import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent implements OnInit, AfterViewInit {

  @Output() avatarSel = new EventEmitter<string>();
  @Input() avatarActual = 'av-1.png';
  @Input() idUsuario: any;
  dataUsuario: any = [];


  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
];

  avatarSlide = {
    slidesPerView: 3.5
  };

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {

    this.avatarSlide = {
      slidesPerView: 3.5
    };

    if(this.idUsuario){
      this.usuarioService.getUsuario(this.idUsuario)
      .subscribe(resp =>{
        this.avatarSlide = {
          slidesPerView: 3.5
        };
        this.dataUsuario = resp;
        this.dataUsuario = this.dataUsuario;
        this.avatarActual = this.dataUsuario.avatar;
        this.avatars.forEach(avatar=> avatar.seleccionado = false);
    
        for(const avatar of this.avatars){
          if(avatar.img == this.avatarActual){
            avatar.seleccionado = true;
            break;
          }
    
        }
      },
      err=> console.log(err)
      );
    }
    this.avatars.forEach(avatar=> avatar.seleccionado = false);
    
    for(const avatar of this.avatars){
      if(avatar.img == this.avatarActual){
        avatar.seleccionado = true;
        break;
      }

    }


  }
  ngAfterViewInit(): void {
    this.avatarSlide = {
      slidesPerView: 3.5
    };

    if(this.idUsuario){
      this.usuarioService.getUsuario(this.idUsuario)
      .subscribe(resp =>{
        this.avatarSlide = {
          slidesPerView: 3.5
        };
        this.dataUsuario = resp;
        this.dataUsuario = this.dataUsuario;
        this.avatarActual = this.dataUsuario.avatar;
        this.avatars.forEach(avatar=> avatar.seleccionado = false);
    
        for(const avatar of this.avatars){
          if(avatar.img == this.avatarActual){
            avatar.seleccionado = true;
            break;
          }
    
        }
      },
      err=> console.log(err)
      );
    }
    this.avatars.forEach(avatar=> avatar.seleccionado = false);
    
    for(const avatar of this.avatars){
      if(avatar.img == this.avatarActual){
        avatar.seleccionado = true;
        break;
      }

    }
  }

  seleccionarAvatar(avatar){

    this.avatars.forEach(av => av.seleccionado = false);
    avatar.seleccionado = true;
    // console.log(avatar.img);
    this.avatarSel.emit(avatar.img);

  }

}
