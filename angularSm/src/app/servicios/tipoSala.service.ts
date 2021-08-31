import { Injectable } from '@angular/core';
import { TipoSala } from '../modelos/tipoSala.modelo';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from "./global.service";

@Injectable({
  providedIn: 'root'
})

export class TipoSalaService {
  public url: String;
  public identidad: any;
  public token: any;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }


  obtenerTipoSalas(): Observable<any>{
    return this._http.get(this.url + '/obtenerTipoSalas', {headers: this.headersVariable});
  }

  obtenerTipoSalasA(): Observable<any>{
    return this._http.get(this.url + '/obtenerTipoSalasA', {headers: this.headersVariable});
  }

  obtenerTipoSala(id:String): Observable<any>{
    return this._http.get(this.url + '/obtenerTipoSala/'+ id, {headers: this.headersVariable})
  }

  crearTipoSala(tipoSala: TipoSala, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    let params = JSON.stringify(tipoSala);

    return this._http.post(this.url + '/crearTipoSala', params, {
      headers: headersToken,
    });
  }

  activarTipo(id:String):Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.getToken())
    return this._http.put(this.url + '/activarTipo/' + id, {headers: headersToken})
  }

  desactivarTipo(id:String):Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.getToken())
    return this._http.put(this.url + '/desactivarTipo/' + id, {headers: headersToken})
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
