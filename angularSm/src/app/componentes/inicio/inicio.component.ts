import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelos/usuario.modelo';
import { UsuarioService } from "../../servicios/usuario.service";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  public identidad;

  constructor(public _usuarioService: UsuarioService) {
    this.identidad = this._usuarioService.getIdentidad();
   }

  ngOnInit(): void {
  }

}
