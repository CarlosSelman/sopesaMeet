import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sala } from 'src/app/modelos/sala.modelo';
import { SalaService } from 'src/app/servicios/sala.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ActivatedRoute } from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-salas-tipo',
  templateUrl: './salas-tipo.component.html',
  styleUrls: ['./salas-tipo.component.scss'],
  providers: [UsuarioService, SalaService],
})
export class SalasTipoComponent implements OnInit {
  public identidad;
  public salasModel;
  public token;
  public idTipoRuta: string;
  public salasModelGet;

  constructor(
    public _usuarioService: UsuarioService,
    public _salaService: SalaService,
    public _activatedRoute: ActivatedRoute
  ) {
    this.token = this._usuarioService.getToken();
    this.identidad = this._usuarioService.getIdentidad();
    this.salasModel = new Sala("","","","","","","","","");
   }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.idTipoRuta = dataRuta.get('idTipoSala');
    });
    this.obtenerSalasTipo(this.idTipoRuta);
  }

  obtenerSalasTipo(idTipoSala) {
    this._salaService
      .obtenerSalasTipo(idTipoSala)
      .subscribe((response) => {
        this.salasModelGet = response.salasObtenidas;
        console.log(response);
    });
  }

}
