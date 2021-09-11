import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UiServiceService } from '../../services/ui-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, AfterViewInit {

  @ViewChild('slidePrincipal') slides: IonSlides;

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

miFormulario: FormGroup = this.fb.group({
  us_login: ['', [Validators.required]],
  us_clave: ['', [Validators.required, Validators.minLength(6)]],
});





  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private navCtrl: NavController,
              private uiServices: UiServiceService) { }

  ngOnInit() : void {
    // this.slides.lockSwipes(true);
  }
  ngAfterViewInit(): void {
    this.slides.lockSwipes(true);
  }

  login(){

    const {us_login, us_clave} = this.miFormulario.value;
    this.authService.login(us_login, us_clave)
    .subscribe(ok =>{

      if( ok == true ) {
      
        this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});

      }else{
        localStorage.clear();
        this.uiServices.alertaInformativa(ok);
      }
      
    });
  }

  regresar() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);

  }
  iniciar(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);

  }



}
