import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sala } from 'src/app/modelos/sala.modelo';
import { SalaService } from 'src/app/servicios/sala.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { TipoSalaService } from 'src/app/servicios/tipoSala.service';

@Component({
  selector: 'app-detalle-sala',
  templateUrl: './detalle-sala.component.html',
  styleUrls: ['./detalle-sala.component.scss'],
  providers: [UsuarioService, SalaService,TipoSalaService]
})
export class DetalleSalaComponent implements OnInit {
  public salaModel;
  public token;
  public idSalaRuta: string;
  constructor(
    public _usuarioService: UsuarioService,
    public _salaService: SalaService,
    public _tipoSalaService: TipoSalaService,
    public _activatedRoute: ActivatedRoute
  ) {
    this.token = this._usuarioService.getToken();
    this.salaModel = new Sala("","","","","","","","","");
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.idSalaRuta = dataRuta.get('idSala');
    });
    this.obtenerSala(this.idSalaRuta);
  }

  obtenerSala(idSala){
    this._salaService.obtenerSala(idSala).subscribe(
      response => {
        this.salaModel =response.salaEncontrada;
        console.log(response);
      }
    )
  }

}
