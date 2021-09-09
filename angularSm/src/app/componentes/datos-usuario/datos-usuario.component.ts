import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styleUrls: ['./datos-usuario.component.scss'],
  providers: [UsuarioService],
})
export class DatosUsuarioComponent implements OnInit {
  public identidad;
  public token;
  constructor(
    public _usuarioService: UsuarioService
  ) {
    this.token = this._usuarioService.getToken();
    this.identidad = this._usuarioService.getIdentidad();
  }

  ngOnInit(): void {
  }

}
