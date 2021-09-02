import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { Sala } from '../modelos/sala.modelo';

@Injectable({
  providedIn: 'root'
})

export class SalaService {
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

  obtenerSalas(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(this.url + '/obtenerSalas', {
      headers: headersToken,
    });
  }

  crearSala(sala: Sala, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    let params = JSON.stringify(sala);

    return this._http.post(this.url + '/crearSala', params, {
      headers: headersToken,
    });
  }

  obtenerSala(id:String): Observable<any>{
    return this._http.get(this.url + '/obtenerSala/'+ id, {headers: this.headersVariable})
  }

  editarSala(sala: Sala):Observable<any>{
    let params = JSON.stringify(sala);
    let headersToken = this.headersVariable.set('Authorization', this.getToken())

    return this._http.put(this.url + '/editarSala/' + sala._id, params, {headers: headersToken})
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
