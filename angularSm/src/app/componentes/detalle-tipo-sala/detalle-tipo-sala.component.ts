import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TipoSala } from 'src/app/modelos/tipoSala.modelo';
import { TipoSalaService } from 'src/app/servicios/tipoSala.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-detalle-tipo-sala',
  templateUrl: './detalle-tipo-sala.component.html',
  styleUrls: ['./detalle-tipo-sala.component.scss'],
  providers: [UsuarioService, TipoSalaService],
})
export class DetalleTipoSalaComponent implements OnInit {
  public tipoSalaModel;
  public token;
  public idTipoSalaRuta: string;
  constructor(
    public _usuarioService: UsuarioService,
    public _tipoSalaService: TipoSalaService,
    public _activatedRoute: ActivatedRoute
  ) {
    this.token = this._usuarioService.getToken();
    this.tipoSalaModel = new TipoSala("","","",0,"");
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
    this.idTipoSalaRuta = dataRuta.get('idTipoSala');
  });
  this.obtenerTipoSala(this.idTipoSalaRuta);
}

obtenerTipoSala(idTipoSala){
  this._tipoSalaService.obtenerTipoSala(this.token, idTipoSala).subscribe(
    response => {
      this.tipoSalaModel =response.tipoSalaEncontrado;
      console.log(response);
    }
  )
}

}
