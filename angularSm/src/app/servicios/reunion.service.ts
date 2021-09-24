import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { Reunion } from '../modelos/reunion.modelo';

@Injectable({
  providedIn: 'root'
})

export class ReunionService {
  public url: String;
  public identidad: any;
  public token: any;
  public headersVariable = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  obtenerReunionesT(): Observable<any>{
    return this._http.get(this.url + '/obtenerReunionesT', {headers: this.headersVariable});
  }

  obtenerReunionesG(): Observable<any>{
    return this._http.get(this.url + '/obtenerReunionesT', {headers: this.headersVariable});
  }

  obtenerReunionesC(): Observable<any>{
    return this._http.get(this.url + '/obtenerReunionesC', {headers: this.headersVariable});
  }

  obtenerReunionesR(): Observable<any>{
    return this._http.get(this.url + '/obtenerReunionesR', {headers: this.headersVariable});
  }

  obtenerReunionesP(): Observable<any>{
    return this._http.get(this.url + '/obtenerReunionesP', {headers: this.headersVariable});
  }

  obtenerReuniones(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(this.url + '/obtenerReuniones', {
      headers: headersToken,
    });
  }

  obtenerReunionesSala(id:String):Observable<any>{
    return this._http.get(this.url + '/obtenerReunionesSala/' + id, {headers:  this.headersVariable})
  }

  obtenerReunionesUsuario(id:String):Observable<any>{
    return this._http.get(this.url + '/obtenerReunionesUsuario/' + id, {headers:  this.headersVariable})
  }

  crearReunion(reunion: Reunion, token): Observable<any> {
      let headersToken = this.headersVariable.set('Authorization', token);
      let params = JSON.stringify(reunion);

      return this._http.post(this.url + '/crearReunion', params, {
        headers: headersToken,
      });
    }

  obtenerReunion(id:String): Observable<any>{
    return this._http.get(this.url + '/obtenerReunion/'+ id, {headers: this.headersVariable})
  }

  editarSolicitud(reunion: Reunion):Observable<any>{
    let params = JSON.stringify(reunion);
    let headersToken = this.headersVariable.set('Authorization', this.getToken())

    return this._http.put(this.url + '/editarSolicitud/' + reunion._id, params, {headers: headersToken})
  }

  confirmarSolicitud(id:String):Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.getToken())
    return this._http.put(this.url + '/confirmarSolicitud/' + id, {headers: headersToken})
  }

  cancelarSolicitud(id:String):Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.getToken())
    return this._http.put(this.url + '/cancelarSolicitud/' + id, {headers: headersToken})
  }

  pendienteSolicitud(id:String):Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.getToken())
    return this._http.put(this.url + '/pendienteSolicitud/' + id, {headers: headersToken})
  }

  getIdentidad(){
    var identidad2:string = JSON.parse(localStorage.getItem('identidad') || '{}');
    if(identidad2 != 'undefined'){
      this.identidad = identidad2
    }else{
      this.identidad = null;
    }

    return this.identidad;
  }

  getToken(){
    var token2 = localStorage.getItem('token');
    if(token2 != 'undefined'){
      this.token = token2;
    }else{
      this.token = null;
    }

    return this.token;
  }

}
