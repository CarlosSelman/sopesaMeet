import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sala } from 'src/app/modelos/sala.modelo';
import { SalaService } from 'src/app/servicios/sala.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ActivatedRoute } from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-salas-tipo-super',
  templateUrl: './salas-tipo-super.component.html',
  styleUrls: ['./salas-tipo-super.component.scss'],
  providers: [UsuarioService, SalaService],
})
export class SalasTipoSuperComponent implements OnInit {
  public salasModel;
  public token;
  public idTipoRuta: string;
  public salasModelGet;
  public identidad;

  constructor(
    public _usuarioService: UsuarioService,
    public _salaService: SalaService,
    public _activatedRoute: ActivatedRoute
  ) {
    this.identidad = this._usuarioService.getIdentidad();
    this.token = this._usuarioService.getToken();
    this.salasModel = new Sala("","","","","","","","","");
   }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.idTipoRuta = dataRuta.get('idTipoSala');
    });
    this.obtenerSalasTipoSuper(this.idTipoRuta);
  }

  obtenerSalasTipoSuper(idTipoSala) {
    this._salaService
      .obtenerSalasTipoSuper(idTipoSala)
      .subscribe((response) => {
        this.salasModelGet = response.salasObtenidas;
        console.log(response);
    });
  }

}

