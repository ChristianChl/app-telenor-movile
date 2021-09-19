import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Usuarios } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getUsuario(id: string):Observable<Usuarios>{
    return this.http.get<Usuarios>(`${this.baseUrl}/usuario/${id}`);

  }

  getUsuarios(): Observable<Usuarios[]>{
    return this.http.get<Usuarios[]>(`${this.baseUrl}/usuario`);
  }
  deleteUsuario(id: string): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/usuario/${id}`);
  }
  saveUsuario(usuarios: Usuarios): Observable<any>{
    return this.http.post<Usuarios>(`${this.baseUrl}/usuario`, usuarios)
    .pipe(
      tap(resp =>{
        if(resp.ok){
          console.log('Usuario Guardado')
        }
      }),
      map(resp => resp),
      catchError(err => {
        if(err.error?.msg){
          
          return of(err.error.msg)
        }
        if(err.error.errors.us_nombres?.msg){
          return of(err.error.errors.us_nombres.msg)
        }
        if(err.error.errors.us_apellidos?.msg){
          return of(err.error.errors.us_apellidos.msg)
        }
        if(err.error.errors.us_email?.msg){
          return of(err.error.errors.us_email.msg)
        }
        if(err.error.errors.us_login?.msg){
          return of(err.error.errors.us_login.msg)
        }
        if(err.error.errors.us_clave?.msg){
          return of(err.error.errors.us_clave.msg)
        }
        if(err.error.errors.us_activo?.msg){
          return of(err.error.errors.us_activo.msg)
        }
        if(err.error.errors.fk_id_perfil?.msg){
          return of(err.error.errors.fk_id_perfil.msg)
        }
        if(err.error.errors.fk_id_tipoDocumento?.msg){
          return of(err.error.errors.fk_id_tipoDocumento.msg)
        }
        if(err.error.errors.us_numeroDocumento?.msg){
          return of(err.error.errors.us_numeroDocumento.msg)
        }
        return of('Hable con el Administrador')
        // return of(err.error.msg)
      })
    );

  }

  updateUsuario(id: string|number, updateUsuario: Usuarios):Observable<any>{

    return this.http.put<Usuarios>(`${this.baseUrl}/usuario/${id}`, updateUsuario)
    .pipe(
      tap(resp =>{
        if(resp.ok){
          console.log('Usuario actualizado')
        }
      }),
      map(resp => resp),
      catchError(err => {
        if(err.error?.msg){
          
          return of(err.error.msg)
        }
        if(err.error.errors.us_nombres?.msg){
          return of(err.error.errors.us_nombres.msg)
        }
        if(err.error.errors.us_apellidos?.msg){
          return of(err.error.errors.us_apellidos.msg)
        }
        if(err.error.errors.us_email?.msg){
          return of(err.error.errors.us_email.msg)
        }
        if(err.error.errors.us_login?.msg){
          return of(err.error.errors.us_login.msg)
        }
        if(err.error.errors.us_clave?.msg){
          return of(err.error.errors.us_clave.msg)
        }
        if(err.error.errors.us_activo?.msg){
          return of(err.error.errors.us_activo.msg)
        }
        if(err.error.errors.fk_id_perfil?.msg){
          return of(err.error.errors.fk_id_perfil.msg)
        }
        if(err.error.errors.fk_id_tipoDocumento?.msg){
          return of(err.error.errors.fk_id_tipoDocumento.msg)
        }
        if(err.error.errors.us_numeroDocumento?.msg){
          return of(err.error.errors.us_numeroDocumento.msg)
        }
        return of('Hable con el Administrador') 
      })
    );
  }





}
