import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { Evento } from '../modelos/evento.modelo';

@Injectable({
  providedIn: 'root'
})

export class EventoService {
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

  obtenerEventos(): Observable<any>{
    return this._http.get(this.url + '/obtenerEventos', {headers: this.headersVariable});
  }

  crearEvento(evento: Evento, token): Observable<any> {
      let headersToken = this.headersVariable.set('Authorization', token);
      let params = JSON.stringify(evento);

      return this._http.post(this.url + '/crearEvento', params, {
        headers: headersToken,
      });
    }

  obtenerEvento(id:String): Observable<any>{
    return this._http.get(this.url + '/obtenerEvento/'+ id, {headers: this.headersVariable})
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
