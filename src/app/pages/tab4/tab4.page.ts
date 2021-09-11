import { Component, OnInit } from '@angular/core';

interface Modulos {
  icon: string;
  name: string;
  redirecto: string;
  subIcon: string;
  subName: string;
  subRedirecto: string;
}

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  isShow: boolean = false;
  isShow1: boolean = false;

  modulos : Modulos[] = [
    {
      icon: 'american-football-outline',
      name: 'Modulo1',
      redirecto: '/main/tabs/tab1',
      subIcon: 'logo-apple-appstore',
      subName: 'Alert',
      subRedirecto: '/main/tabs/tab1'
    },
    {
      icon: 'american-football-outline',
      name: 'Modulo2',
      redirecto: '/main/tabs/tab1',
      subIcon: 'logo-apple-appstore',
      subName: 'Alert',
      subRedirecto: '/main/tabs/tab1'
    },

  ]

  constructor() { }

  ngOnInit() {
  }

  abrir1(){
    this.isShow = !this.isShow;
  }
  abrir2(){
    this.isShow1 = !this.isShow1;
  }

}
