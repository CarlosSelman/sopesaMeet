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

  obtenerTipoSala(token, id: string): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(this.url + '/obtenerTipoSala/' + id, {
      headers: headersToken,
    });
  }

  crearTipoSala(tipoSala: TipoSala, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    let params = JSON.stringify(tipoSala);

    return this._http.post(this.url + '/crearTipoSala', params, {
      headers: headersToken,
    });
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
