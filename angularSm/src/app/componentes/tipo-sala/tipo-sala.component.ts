import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoSala } from 'src/app/modelos/tipoSala.modelo';
import { TipoSalaService } from 'src/app/servicios/tipoSala.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-tipo-sala',
  templateUrl: './tipo-sala.component.html',
  styleUrls: ['./tipo-sala.component.scss'],
  providers: [TipoSalaService, UsuarioService]
})
export class TipoSalaComponent implements OnInit {
  public identidad;
  public token;
  public tiposModelGet;
  public tiposModelAdd: TipoSala;
  public tiposModelGetId: TipoSala;

  constructor(
    private _tipoSalaService: TipoSalaService,
    private _usuarioService: UsuarioService,
    private _router: Router
  ) {
    this.identidad = this._usuarioService.getIdentidad();
    this.token = this._usuarioService.getToken();
    this.tiposModelAdd = new TipoSala("","","",0,"")
   }

  ngOnInit(): void {
    this.obtenerTipoSalas();
  }

  obtenerTipoSalas() {
    this._tipoSalaService.obtenerTipoSalas().subscribe(
      (response) => {
        this.tiposModelGet = response.tipoSalasEncontrados;
        console.log(response);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  crearTipoSala() {
    this._tipoSalaService.crearTipoSala(this.tiposModelAdd, this.token).subscribe(
      response=>{
        this.tiposModelAdd.nombre = '';
        this.tiposModelAdd.descripcion ='';
        this.tiposModelAdd.capacidadMax = null;
        console.log(response);
        this.obtenerTipoSalas()
      }
    );
  }

}
