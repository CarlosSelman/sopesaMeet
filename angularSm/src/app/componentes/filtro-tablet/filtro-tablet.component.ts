import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sala } from 'src/app/modelos/sala.modelo';
import { SalaService } from 'src/app/servicios/sala.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { TipoSalaService } from 'src/app/servicios/tipoSala.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-filtro-tablet',
  templateUrl: './filtro-tablet.component.html',
  styleUrls: ['./filtro-tablet.component.scss']
})
export class FiltroTabletComponent implements OnInit {

  form: FormGroup;
  public identidad;
  public token;
  public tipos;
  public salasModelGet;
  public salasModelAdd: Sala;
  public salasModelGetId: Sala;
  public idSalaModel: Sala;

  constructor(
    private fb: FormBuilder,
    public _salaService: SalaService,
    public _usuarioService: UsuarioService,
    public _tipoSalaService:TipoSalaService,
    private _router: Router

  ) {

    this.token = this._usuarioService.getToken();
    this.identidad = this._usuarioService.getIdentidad();
    this.salasModelGetId = new Sala("","","","","","","","","");
    this.salasModelAdd = new Sala("","","","","","","","","");
    this.idSalaModel = new Sala("","","","","","","","","");

    /*
    this.form=this.fb.group({
      tipoDeSala: ['',Validators.required]
      })
    */
   }

  ngOnInit(): void {
    this.obtenerSalasT();
    this.obtenerTipoSalas();
  }

  obtenerSalasT() {
    this._salaService.obtenerSalasT().subscribe(
      (response) => {
        this.salasModelGet = response.salasEncontradas;
        console.log(response);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  obtenerTipoSalas() {
    this._tipoSalaService.obtenerTipoSalas().subscribe(
      (response) => {
        this.tipos = response.tipoSalasEncontrados;
        console.log(response);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  obtenerSala(idSala){
    this._salaService.obtenerSala(idSala).subscribe(
      response => {
        this.idSalaModel =response.salaEncontrada;
        console.log(response);
      }
    )
  }
}

