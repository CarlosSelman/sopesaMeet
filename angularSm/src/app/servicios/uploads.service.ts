import { Injectable } from '@angular/core';
import { TipoSala } from '../modelos/tipoSala.modelo';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from "./global.service";

@Injectable({
  providedIn: 'root'
})

export class UploadsService {
  public url: String;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public http: HttpClient) {
    this.url = GLOBAL.url;
  }


  getImages(): Observable<any> {
    return this.http.get(this.url + '/download' , {headers: this.headersVariable});
  }

  uploadImage(name: string, file: File): Observable<any>{

    const form = new FormData()
    form.append('name',name);
    form.append('file',file, 'form-data');
    let params = JSON.stringify(form);

    return this.http.post(this.url + '/uploads',params ,{headers: this.headersVariable})
  }



}
