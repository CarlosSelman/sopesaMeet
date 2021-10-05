import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { EventCalendar } from '../modelos/event.modelo';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})

export class EventService {
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

  obtenerEvents(): Observable<any>{
    return this._http.get(this.url + '/obtenerEvents', {headers: this.headersVariable});
  }

  crearEvent(eventCalendar: EventCalendar, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    let params = JSON.stringify(eventCalendar);

    return this._http.post(this.url + '/crearEvent', params, {
      headers: headersToken,
    });
  }

  obtenerEvent(id:String): Observable<any>{
    return this._http.get(this.url + '/obtenerEvent/'+ id, {headers: this.headersVariable})
  }

  obtenerEventsT(): Observable<any>{
    return this._http.get(this.url + '/obtenerEventsT', {headers: this.headersVariable});
  }

  obtenerReunionesG(): Observable<any>{
    return this._http.get(this.url + '/obtenerReunionesT', {headers: this.headersVariable});
  }

  obtenerEventsC(): Observable<any>{
    return this._http.get(this.url + '/obtenerEventsC', {headers: this.headersVariable});
  }

  obtenerEventsR(): Observable<any>{
    return this._http.get(this.url + '/obtenerEventsR', {headers: this.headersVariable});
  }

  obtenerEventsP(): Observable<any>{
    return this._http.get(this.url + '/obtenerEventsP', {headers: this.headersVariable});
  }

  obtenerEventsSala(id:String):Observable<any>{
    return this._http.get(this.url + '/obtenerEventsSala/' + id, {headers:  this.headersVariable})
  }

  obtenerEventsUsuario(id:String):Observable<any>{
    return this._http.get(this.url + '/obtenerEventsUsuario/' + id, {headers:  this.headersVariable})
  }

  editarSolicitudEvent(eventCalendar: EventCalendar):Observable<any>{
    let params = JSON.stringify(eventCalendar);
    let headersToken = this.headersVariable.set('Authorization', this.getToken())

    return this._http.put(this.url + '/editarSolicitudEvent/' + eventCalendar._id, params, {headers: headersToken})
  }

  confirmarSolicitudEvent(id:String):Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.getToken())
    return this._http.put(this.url + '/confirmarSolicitudEvent/' + id, {headers: headersToken})
  }

  asistenciaEvent(id:String): Observable<any>{
    return this._http.put(this.url + '/asistenciaEvent/'+ id, {headers: this.headersVariable})
  }

  cancelarSolicitudEvent(id:String):Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.getToken())
    return this._http.put(this.url + '/cancelarSolicitudEvent/' + id, {headers: headersToken})
  }

  pendienteSolicitudEvent(id:String):Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.getToken())
    return this._http.put(this.url + '/pendienteSolicitudEvent/' + id, {headers: headersToken})
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
