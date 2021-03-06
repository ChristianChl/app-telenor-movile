import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { AuthResponse, Usuario } from '../interfaces/Auth';
import { catchError, map, tap } from "rxjs/operators";
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  get usuario(){
    return { ...this._usuario };
  }
  getUsuario(){
    if(!this.usuario.uid){
      this.validarToken();
    }
    return { ...this._usuario };
  }

  constructor(private http: HttpClient,
              private storage: Storage) { }
  
  login(us_login: string, us_clave: string) {

    const url = `${this.baseUrl}/auth`;
    const body = { us_login, us_clave };
    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            localStorage.setItem('token', resp.token!);
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      );
  }
  validarToken(): Observable<boolean>{
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');
    return this.http.get<AuthResponse>( url, {headers} )
      .pipe(
        map(resp =>{
          localStorage.setItem('token', resp.token!);
            this._usuario={
              uid: resp.uid!,
              name: resp.name!,
              surnames: resp.surnames!,
              avatar: resp.avatar,
              email: resp.email!
            }
          return resp.ok;
        }),
        catchError(err => of(false) )
      );
  }
  logout(){
    localStorage.clear();
  }

  




  


}
