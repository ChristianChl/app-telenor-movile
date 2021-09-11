import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
              private navCtrl: NavController){

  }


  canActivate(): Observable<boolean> | boolean {
    return this.authService.validarToken()
    .pipe(
      tap(valid =>{
        if(!valid){
          this.navCtrl.navigateRoot('/login', {animated: true});
        }
      })
    );
  }
  canLoad(): Observable<boolean> | boolean{
    return this.authService.validarToken()
    .pipe(
      tap(valid =>{
        if(!valid){
          this.navCtrl.navigateRoot('/login', {animated: true});
        }
      })
    );
  }
}
